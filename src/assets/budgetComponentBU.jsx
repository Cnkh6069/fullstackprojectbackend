import React, { useState, useEffect } from "react";
import axios from "axios";

const BudgetComponent = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await axios.get("http://localhost:3000/budgets");
        const allBudgets = response.data;
        console.log("Fetched Budget:", allBudgets);
        setBudgets(allBudgets);
      } catch (error) {
        console.error("Error fetching budget:", error);
      }
    };
    fetchBudgets();
  }, []);

  const deleteBudget = async (budgetId) => {
    // takes budgetId as a parameter
    try {
      const response = await axios.delete(
        `http://localhost:3000/expenses/${budgetId}`
      );
      console.log("Expense record deleted successfully:", response.data);
      alert("Expense deleted successfully:", response.data);
      //update expense state to reflect the deletion
      const updatedExpense = expenses.filter(
        (expense) => expense._id !== expenseId
      );
      setExpenses(updatedExpense);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Budget ID</th>
            <th>Budget Name</th>
            <th>Category</th>
            <th>Budget Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {budgets.length > 0 ? (
            budgets.map((budget, index) => (
              <tr key={index}>
                <td>{budget._id}</td>
                <td>{budget.budgetName}</td>
                <td>{budget.budgetType[index].Name}</td>
                <td>${budget.budgetAmt}</td>
                <td>
                  <button>Update</button>
                  <button>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No budget records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetComponent;
