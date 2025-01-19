import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAuth0 } from "@auth0/auth0-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const AnalyticsComponent = () => {
  const { isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!isAuthenticated) {
        await loginWithRedirect(); // Redirect to login if not authenticated
        return;
      }

      try {
        const token = await getAccessTokenSilently();

        const [expenseRes, categoryRes, budgetRes, incomeRes] =
          await Promise.all([
            axios.get("http://localhost:3000/expenses", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:3000/categories", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:3000/budgets", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:3000/incomes", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setExpenses(expenseRes.data);
        setCategories(categoryRes.data);
        setBudgets(budgetRes.data);
        setIncomes(incomeRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isAuthenticated, loginWithRedirect, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return <h3>Loading... Please log in to view your data.</h3>;
  }

  // Data for Total Income vs. Total Expenses (Bar Chart)
  const totalIncome = incomes.reduce(
    (sum, income) => sum + income.incomeAmt,
    0
  );
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.expAmt,
    0
  );

  const incomeVsExpenseData = {
    labels: ["Total Income", "Total Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [totalIncome, totalExpenses],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
      },
    ],
  };

  // Data for Budget vs. Expenses by Budget (Bar Chart)
  const budgetVsExpense = budgets.map((budget) => {
    const totalExpensesForBudget = expenses
      .filter((expense) => expense.budgetID === budget._id)
      .reduce((sum, expense) => sum + expense.expAmt, 0);

    return {
      budgetName: budget.budgetName,
      budgetAmt: budget.budgetAmt,
      totalExpenses: totalExpensesForBudget,
    };
  });

  const budgetVsExpenseData = {
    labels: budgetVsExpense.map((b) => b.budgetName),
    datasets: [
      {
        label: "Budget Amount",
        data: budgetVsExpense.map((b) => b.budgetAmt),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
      {
        label: "Expenses",
        data: budgetVsExpense.map((b) => b.totalExpenses),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h3>Overview</h3>

      {/* Bar Graphs Row */}
      <div className="chart-row">
        <div className="chart-container">
          <h3>Total Income vs. Total Expenses</h3>
          <Bar data={incomeVsExpenseData} />
        </div>
        <div className="chart-container">
          <h3>Budget vs. Expenses</h3>
          <Bar data={budgetVsExpenseData} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsComponent;
