import { useState, useEffect } from "react";
import axios, { all } from "axios";
import React from "react";
import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LoginRegisterPage from "./components/LoginRegisterPage.jsx";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";

import ExpenseComponent from "./components/ExpenseComponent";
import IncomeComponent from "./components/IncomeComponent";
import BudgetComponent from "./components/budgetComponent";
import AnalyticsComponent from "./components/AnalyticsComponent.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  const refreshPage = () => {
    window.location.reload();
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
      children: [
        {
          path: "/",
          element: (
            <div>
              <h3>Welcome to Rocket Budget Tracking Platform</h3>
              <h4>Please select your options</h4>
              <h5>Register New Account or Login</h5>
              <RegisterForm />
              <br />
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <LoginForm />
              <p></p>
            </div>
          ),
        },
        {
          path: "expenses",
          element: (
            <div>
              <h3>Records of Expenses</h3>
              <ExpenseComponent />
            </div>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <div>
              <h3>Dashboard</h3>
              <AnalyticsComponent />
            </div>
          ),
        },

        {
          path: "incomes",
          element: (
            <div>
              <h3>Records of Income</h3>
              <IncomeComponent />
            </div>
          ),
        },
        {
          path: "budgets",
          element: (
            <div>
              <h3>Set Budget</h3>
              <BudgetComponent />
            </div>
          ),
        },
      ],
    },
  ]);
  // create states to manage CRUD of Income, Budget and Expenses.
  const [count, setCount] = useState(0);
  const [incomes, setIncomes] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  //Call get all expenses on update of state.

  return <RouterProvider router={router} />;
}

export default App;
