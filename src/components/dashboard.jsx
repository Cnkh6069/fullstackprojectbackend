//dashboard.jsx
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import AuthLogoutButton from "./AuthLogoutButton";

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return isAuthenticated ? (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <AuthLogoutButton />
      <nav>
        <Link to="/expenses">Expenses</Link> |{" "}
        <Link to="/incomes">Incomes</Link> |<Link to="/budgets">Budgets</Link> |{" "}
        <Link to="/analytics">Analytics</Link>
      </nav>
    </div>
  ) : (
    <p>Please log in to access the dashboard.</p>
  );
};

export default Dashboard;
