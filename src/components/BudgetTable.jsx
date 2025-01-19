//BudgetTable.jsx
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const BudgetTable = ({ budgets, onUpdateBudget, onDeleteBudget }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (!isAuthenticated) {
    return <h2>Please log in to view your budgets.</h2>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Budget ID</th>
          <th>Budget Name</th>
          <th>Category</th>
          <th>Budget Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {budgets.length > 0 ? (
          budgets.map((budget, index) => (
            <tr key={index}>
              <td>{budget._id}</td>
              <td>{budget.budgetName}</td>
              <td>{budget.budgetType[0]?.Name || "N/A"}</td>
              <td>${budget.budgetAmt}</td>
              <td>
                <button
                  className="updatebutton"
                  onClick={() => onUpdateBudget(budget._id)}
                >
                  Update
                </button>
                <button
                  className="deletebutton"
                  onClick={() => onDeleteBudget(budget._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5">No budget records found.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BudgetTable;
