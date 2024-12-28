import React from "react";
import ExpenseRow from "./ExpenseRow";

const ExpenseTable = ({ expenses, onUpdateExpense, onDeleteExpense }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Expense ID</th>
          <th>Expense Name</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Budget</th>
          <th>Created On</th>
          <th>Updated On</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <ExpenseRow
            key={expense._id}
            expense={expense}
            onUpdate={onUpdateExpense}
            onDelete={onDeleteExpense}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseTable;
