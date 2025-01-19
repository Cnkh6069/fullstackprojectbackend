//categorySelect.jsx
import { useAuth0 } from "@auth0/auth0-react";

const CategorySelect = ({ categories, value, onChange }) => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const handleChange = (e) => {
    if (!isAuthenticated) {
      loginWithRedirect(); // Redirect to Auth0 login if not authenticated
      return;
    }
    onChange(e.target.value);
  };

  return (
    <select value={value} onChange={handleChange}>
      <option value="">Select a Category</option>
      {categories.map((category) => (
        <option key={category._id} value={category._id}>
          {category.Name || category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;
