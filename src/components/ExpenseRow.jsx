import React from "react";

const ExpenseRow = ({ expense, onUpdate, onDelete }) => {
  return (
    <tr>
      <td>{expense._id}</td>
      <td>{expense.expName}</td>
      <td>{expense.categoryID[0].Name}</td>
      <td>{expense.expAmt}</td>
      <td>{expense.budgetID[0].budgetName}</td>
      <td>{new Date(expense.createdAt).toLocaleString()}</td>
      <td>{new Date(expense.updatedAt).toLocaleString()}</td>
      <td>
        <button className="updatebutton" onClick={() => onUpdate(expense._id)}>
          Update
        </button>
        <button className="deletebutton" onClick={() => onDelete(expense._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ExpenseRow;
