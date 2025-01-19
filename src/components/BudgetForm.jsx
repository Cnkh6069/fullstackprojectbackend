//BudgetForm.jsx

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const BudgetForm = ({ categories, onCreateBudget }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [budgetName, setBudgetName] = useState("");
  const [budgetAmt, setBudgetAmt] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      loginWithRedirect(); // Redirect to Auth0 login page if not authenticated
      return;
    }

    if (!budgetName || !budgetAmt || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const categoryObj = categories.find(
      (cat) => cat.Name === category || cat.name === category
    );

    if (!categoryObj) {
      alert("Invalid category.");
      return;
    }

    const newBudget = {
      budgetName,
      budgetAmt: parseFloat(budgetAmt),
      budgetType: [categoryObj._id],
    };

    onCreateBudget(newBudget);
    window.location.reload();
    setBudgetName("");
    setBudgetAmt("");
    setCategory("");
  };

  if (!isAuthenticated) {
    return <h2>Please log in to create a new budget.</h2>;
  }

  return (
    <form className="top-bar" onSubmit={handleSubmit}>
      <div>
        <label>Budget Name:</label>
        <input
          type="text"
          value={budgetName}
          onChange={(e) => setBudgetName(e.target.value)}
        />
      </div>
      <div>
        <label>Budget Amount:</label>
        <input
          type="number"
          value={budgetAmt}
          onChange={(e) => setBudgetAmt(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat.Name || cat.name}>
              {cat.Name || cat.name}
            </option>
          ))}
        </select>
      </div>
      <button className="createbutton" type="submit">
        Create Budget
      </button>
    </form>
  );
};

export default BudgetForm;
