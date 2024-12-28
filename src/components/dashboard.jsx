import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      {/* Sidebar with Links */}
      <aside className="sidebar">
        <h2>Fast Budget</h2>
        <ul>
          <li>
            <Link to="/">Home Page</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/expenses">Expenses</Link>
          </li>
          <li>
            <Link to="/incomes">Incomes</Link>
          </li>
          <li>
            <Link to="/budgets">Budgets</Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
