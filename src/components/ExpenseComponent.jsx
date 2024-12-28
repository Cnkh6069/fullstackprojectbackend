import React, { useState, useEffect } from "react";
import axios from "axios";
import ExpenseTable from "./ExpenseTable";
import ExpenseForm from "./ExpenseForm";

const ExpenseComponent = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expenseRes, categoryRes, budgetRes] = await Promise.all([
          axios.get("http://localhost:3000/expenses"),
          axios.get("http://localhost:3000/categories"),
          axios.get("http://localhost:3000/budgets"),
        ]);
        setExpenses(expenseRes.data);
        setCategories(categoryRes.data);
        setBudgets(budgetRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const createExpense = async (newExpense) => {
    try {
      // Post the new expense
      const response = await axios.post(
        "http://localhost:3000/expenses",
        newExpense
      );

      // Update state with the new expense (including category and budget names)
      setExpenses((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating expense:", error);
    }
  };

  // create a function to update expense record at individual row level
  const updateExpense = async (expenseId) => {
    try {
      const expenseToUpdate = expenses.find(
        (expense) => expense._id === expenseId
      );

      if (!expenseToUpdate) {
        console.error("Expense not found.");
        alert("Expense not found.");
        return;
      }

      console.log("Original expense:", expenseToUpdate);

      // Prompt user for new values
      const updatedExpName = prompt(
        "Enter new Expense Name (leave blank to keep current):",
        expenseToUpdate.expName
      );
      const updatedExpAmt = prompt(
        "Enter new Expense Amount (leave blank to keep current):",
        expenseToUpdate.expAmt
      );
      const updatedCategory = prompt(
        "Enter new Category Name (leave blank to keep current):",
        expenseToUpdate.categoryID[0]?.Name || ""
      );
      const updatedBudget = prompt(
        "Enter new Budget Name (leave blank to keep current):",
        expenseToUpdate.budgetID[0]?.budgetName || ""
      );

      console.log("User inputs:", {
        updatedExpName,
        updatedExpAmt,
        updatedCategory,
        updatedBudget,
      });

      // Find matching category and budget
      const matchingCategory = updatedCategory
        ? categories.find(
            (category) =>
              category.name === updatedCategory ||
              category.Name === updatedCategory
          )
        : null;

      const matchingBudget = updatedBudget
        ? budgets.find(
            (budget) =>
              budget.budgetName === updatedBudget ||
              budget.name === updatedBudget
          )
        : null;

      // Prepare the updated expense object
      const updatedExpense = {
        expName: updatedExpName || expenseToUpdate.expName,
        expAmt: updatedExpAmt
          ? parseFloat(updatedExpAmt)
          : expenseToUpdate.expAmt,
        categoryID: matchingCategory
          ? [matchingCategory._id]
          : expenseToUpdate.categoryID,
        budgetID: matchingBudget
          ? [matchingBudget._id]
          : expenseToUpdate.budgetID,
      };

      console.log("Payload for update:", updatedExpense);

      // Send PUT request
      const response = await axios.put(
        `http://localhost:3000/expenses/${expenseId}`,
        updatedExpense
      );

      console.log("Response from API:", response.data);

      // Update state with the new expense data
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === expenseId ? { ...expense, ...response.data } : expense
        )
      );

      alert("Expense updated successfully.");
    } catch (error) {
      console.error("Error updating expense:", error);
      alert(
        `Failed to update expense. Error: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const deleteExpense = async (expenseId) => {
    try {
      await axios.delete(`http://localhost:3000/expenses/${expenseId}`);
      setExpenses((prev) =>
        prev.filter((expense) => expense._id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <ExpenseForm
        categories={categories}
        budgets={budgets}
        onCreateExpense={createExpense}
      />
      <ExpenseTable
        expenses={expenses}
        onUpdateExpense={updateExpense}
        onDeleteExpense={deleteExpense}
      />
    </div>
  );
};

export default ExpenseComponent;
