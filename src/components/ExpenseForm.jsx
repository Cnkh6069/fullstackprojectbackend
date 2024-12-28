import React, { useState } from "react";
import CategorySelect from "./CategorySelect";
import BudgetSelect from "./BudgetSelect";

const ExpenseForm = ({ categories, budgets, onCreateExpense }) => {
  const [expName, setExpName] = useState("");
  const [expAmt, setExpAmt] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBudget, setSelectedBudget] = useState("");

  const handleSubmit = () => {
    if (!expName || !expAmt || !selectedCategory || !selectedBudget) {
      alert("All fields are required.");
      return;
    }

    const newExpense = {
      expName,
      expAmt: parseFloat(expAmt),
      categoryID: [selectedCategory],
      budgetID: [selectedBudget],
    };

    onCreateExpense(newExpense);
    window.location.reload();
    setExpName("");
    setExpAmt("");
    setSelectedCategory("");
    setSelectedBudget("");
  };

  return (
    <div className="top-bar">
      <label>Expense: </label>
      <input
        type="text"
        placeholder="Expense Name"
        value={expName}
        onChange={(e) => setExpName(e.target.value)}
      />
      <label> Amount: </label>
      <input
        type="number"
        placeholder="Expense Amount"
        value={expAmt}
        onChange={(e) => setExpAmt(e.target.value)}
      />
      <label>Category: </label>
      <CategorySelect
        categories={categories}
        value={selectedCategory}
        onChange={setSelectedCategory}
      />
      <label>Budget Type: </label>
      <BudgetSelect
        budgets={budgets}
        value={selectedBudget}
        onChange={setSelectedBudget}
      />
      <button className="createbutton" onClick={handleSubmit}>
        Create Expense
      </button>
    </div>
  );
};

export default ExpenseForm;
