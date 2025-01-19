//BudgetSelect.jsx
import { useAuth0 } from "@auth0/auth0-react";

const BudgetSelect = ({ budgets, value, onChange }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleChange = (e) => {
    if (!isAuthenticated) {
      loginWithRedirect(); // Redirect to Auth0 login page if not authenticated
      return;
    }
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Select a Budget</option>
      {budgets.map((budget) => (
        <option key={budget._id} value={budget._id}>
          {budget.budgetName || budget.name}
        </option>
      ))}
    </select>
  );
};

export default BudgetSelect;
