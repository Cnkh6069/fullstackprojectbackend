import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./components/Dashboard";
import ExpenseComponent from "./components/ExpenseComponent";
import IncomeComponent from "./components/IncomeComponent";
import BudgetComponent from "./components/BudgetComponent";
import AnalyticsComponent from "./components/AnalyticsComponent";
import LoginRegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading screen if Auth0 is loading
  }

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <Route path="/" element={<LoginRegisterPage />} />
        ) : (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/expenses" element={<ExpenseComponent />} />
            <Route path="/incomes" element={<IncomeComponent />} />
            <Route path="/budgets" element={<BudgetComponent />} />
            <Route path="/analytics" element={<AnalyticsComponent />} />
            {/* Protected routes */}
            <Route
              path="/protected"
              element={
                <ProtectedRoute>
                  <ProtectedComponent />
                </ProtectedRoute>
              }
            />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
