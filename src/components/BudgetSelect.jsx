const BudgetSelect = ({ budgets, value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="">Select a Budget</option>
    {budgets.map((budget) => (
      <option key={budget._id} value={budget._id}>
        {budget.budgetName || budget.name}
      </option>
    ))}
  </select>
);

export default BudgetSelect;
