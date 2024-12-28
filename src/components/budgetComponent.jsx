import React, { useState, useEffect } from "react";
import axios from "axios";
import BudgetForm from "./BudgetForm";
import BudgetTable from "./BudgetTable";

const BudgetComponent = () => {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [budgetRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:3000/budgets"),
          axios.get("http://localhost:3000/categories"),
        ]);

        setBudgets(budgetRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // CREATE Budget
  const createBudget = async (newBudget) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/budgets",
        newBudget
      );
      setBudgets((prev) => [...prev, response.data]);
      alert("Budget created successfully!");
    } catch (error) {
      console.error("Error creating budget:", error);
      alert("Failed to create budget.");
    }
  };

  // UPDATE Budget
  const updateBudget = async (budgetId) => {
    try {
      const budgetToUpdate = budgets.find((budget) => budget._id === budgetId);

      if (!budgetToUpdate) {
        console.error("Budget not found.");
        alert("Budget not found.");
        return;
      }

      console.log("Original budget:", budgetToUpdate);

      const updatedBudgetName = prompt(
        "Enter new Budget Name (leave blank to keep current):",
        budgetToUpdate.budgetName
      );
      const updatedBudgetAmt = prompt(
        "Enter new Budget Amount (leave blank to keep current):",
        budgetToUpdate.budgetAmt
      );
      const updatedCategory = prompt(
        "Enter new Category Name (leave blank to keep current):",
        budgetToUpdate.budgetType[0]?.Name || ""
      );

      const matchingCategory = updatedCategory
        ? categories.find(
            (category) =>
              category.name === updatedCategory ||
              category.Name === updatedCategory
          )
        : null;

      const updatedBudget = {
        budgetName: updatedBudgetName || budgetToUpdate.budgetName,
        budgetAmt: updatedBudgetAmt
          ? parseFloat(updatedBudgetAmt)
          : budgetToUpdate.budgetAmt,
        budgetType: matchingCategory
          ? [matchingCategory._id]
          : budgetToUpdate.budgetType,
      };

      console.log("Payload for update:", updatedBudget);

      const response = await axios.put(
        `http://localhost:3000/budgets/${budgetId}`,
        updatedBudget
      );

      setBudgets((prev) =>
        prev.map((budget) =>
          budget._id === budgetId ? { ...budget, ...response.data } : budget
        )
      );
      alert("Budget updated successfully!");
    } catch (error) {
      console.error("Error updating budget:", error);
      alert("Failed to update budget.");
    }
  };

  // DELETE Budget
  const deleteBudget = async (budgetId) => {
    try {
      await axios.delete(`http://localhost:3000/budgets/${budgetId}`);
      setBudgets((prev) => prev.filter((budget) => budget._id !== budgetId));
      alert("Budget deleted successfully!");
    } catch (error) {
      console.error("Error deleting budget:", error);
      alert("Failed to delete budget.");
    }
  };

  return (
    <div>
      <BudgetForm categories={categories} onCreateBudget={createBudget} />
      <BudgetTable
        budgets={budgets}
        onUpdateBudget={updateBudget}
        onDeleteBudget={deleteBudget}
      />
    </div>
  );
};

export default BudgetComponent;
