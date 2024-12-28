const CategorySelect = ({ categories, value, onChange }) => (
  <select value={value} onChange={(e) => onChange(e.target.value)}>
    <option value="">Select a Category</option>
    {categories.map((category) => (
      <option key={category._id} value={category._id}>
        {category.Name || category.name}
      </option>
    ))}
  </select>
);

export default CategorySelect;
