//budgetComponent.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import BudgetForm from "./BudgetForm";
import BudgetTable from "./BudgetTable";
import { useAuth0 } from "@auth0/auth0-react";

const BudgetComponent = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!isAuthenticated) {
        loginWithRedirect(); // Redirect to login if not authenticated
        return;
      }

      try {
        const { data } = await axios.get("http://localhost:3000/budgets");
        setBudgets(data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };

    fetchBudgets();
  }, [isAuthenticated, loginWithRedirect]);

  if (!isAuthenticated) {
    return <h2>Please log in to view your budgets</h2>;
  }

  return (
    <div>
      <h2>Budgets</h2>
      <ul>
        {budgets.map((budget) => (
          <li key={budget.id}>
            {budget.name}: ${budget.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetComponent;
