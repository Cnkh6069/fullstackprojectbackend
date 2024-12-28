import React, { useState, useEffect } from "react";
import axios from "axios";

const ExpenseComponent = () => {
  const [expName, setExpName] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [budgetOptions, setBudgetOptions] = useState([]);
  const [selectedBudgetValue, setSelectedBudgetValue] = useState("");
  const [expenses, setExpenses] = useState([]);

  //fetches all the Expense records
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/expenses");
        const allExpenses = response.data;
        console.log("Fetched expenses:", allExpenses);
        setExpenses(allExpenses);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };
    fetchExpenses();
  }, []);

  //fetches the list of categories and populates them as a list for selection
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/categories");
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  // fetches the list of budget and populates them as a list for selection
  useEffect(() => {
    const fetchBudgetOptions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/budgets");
        setBudgetOptions(response.data);
        console.log("Fetched Budget data:", response.data);
      } catch (error) {
        console.error("Error fetching budget options:", error);
      }
    };

    fetchBudgetOptions();
  }, []);

  //Axios request to create an expense record based on the set fields in the input table.

  const createExpense = async () => {
    // Ensure all required fields are filled
    if (!expName || !expAmount || !selectedValue || !selectedBudgetValue) {
      alert("Please fill out all fields before creating an expense.");
      return;
    }
    try {
      //Find the matching categoryID from the selected category nae
      const matchingCategory = options.find(
        (option) =>
          option.name === selectedValue || option.Name === selectedValue
      );
      console.log("Category ID is:", matchingCategory);

      if (!matchingCategory) {
        alert("Invalid category selected.");
        return;
      }

      const matchingCategoryID = matchingCategory._id;
      console.log(matchingCategoryID);

      // Find the matching budgetID from the selected budget name
      const matchingBudget = budgetOptions.find(
        (budget) =>
          budget.budgetName === selectedBudgetValue ||
          budget.name === selectedBudgetValue
      );

      if (!matchingBudget) {
        alert("Invalid budget selected.");
        return;
      }

      const matchingBudgetID = matchingBudget._id;

      // send POST request to create an expense record
      const response = await axios.post("http://localhost:3000/expenses", {
        expName: expName, // Expense name
        categoryID: [matchingCategoryID], // ObjectID for category
        expAmt: parseFloat(expAmount), // Ensure the amount is a number
        budgetID: [matchingBudgetID], // ObjectID for budget
      });

      console.log("Expense record created successfully:", response.data);

      // // Clear input fields after successful creation
      // setExpName("");
      // setExpAmount("");
      // setSelectedValue("");
      // setSelectedBudgetValue("");

      // Update the expenses state with the new expense
      setExpenses((prevExpenses) => [...prevExpenses, response.data]);
    } catch (error) {
      console.error("Error creating expense record:", error);
      alert("Failed to create expense record. Please try again.");
    }
  };
  // create a function to update expense record at individual row level
  const updateExpense = async (expenseId) => {
    // Find the expense to update from the state
    const expenseToUpdate = expenses.find(
      (expense) => expense._id === expenseId
    );

    if (!expenseToUpdate) {
      alert("Expense not found.");
      return;
    }
    // Prompt user for new values (for simplicity)
    const updatedExpName = prompt(
      "Enter new Expense Name:",
      expenseToUpdate.expName
    );
    const updatedExpAmt = prompt(
      "Enter new Expense Amount:",
      expenseToUpdate.expAmt
    );
    // Also prompt to update category or budget
    const updatedCategory = prompt(
      "Enter new Category (leave blank to keep current):",
      expenseToUpdate.categoryID[0].Name
    );
    const updatedBudget = prompt(
      "Enter new Budget (leave blank to keep current):",
      expenseToUpdate.budgetID[0].budgetName
    );

    try {
      //Find categoryId and budgetId if updated
      const matchingCategory = options.find(
        (option) =>
          option.name === updatedCategory || option.Name === updatedCategory
      );
      const matchingBudget = budgetOptions.find(
        (budget) =>
          budget.budgetName === updatedBudget || budget.name === updatedBudget
      );
      const updatedExpense = {
        expName: updatedExpName || expenseToUpdate.expName,
        expAmt: updatedExpAmt
          ? parseFloat(updatedExpAmt)
          : expenseToUpdate.expAmt,
        categoryID: matchingCategory
          ? [matchingCategory._id]
          : expenseToUpdate.categoryID,
        budgetID: matchingBudget
          ? [matchingBudget._id]
          : expenseToUpdate.budgetID,
      };
      // Send PUT request to update expense
      const response = await axios.put(
        `http://localhost:3000/expenses/${expenseId}`,
        updatedExpense
      );
      console.log("Expense record updated successfully", response.data);
      // Update the state with the modified expense
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense._id === expenseId ? { ...expense, ...response.data } : expense
        )
      );

      alert("Expense updated successfully.");
    } catch (error) {
      console.error("Error updating expense:", error);
      alert("Failed to update expense. Please try again.");
    }
  };

  // delete Expense record for the row
  const deleteExpense = async (expenseId) => {
    // takes expenseId as a parameter
    try {
      const response = await axios.delete(
        `http://localhost:3000/expenses/${expenseId}`
      );
      console.log("Expense record deleted successfully:", response.data);
      alert("Expense deleted successfully:", response.data);
      //update expense state to reflect the deletion
      const updatedExpense = expenses.filter(
        (expense) => expense._id !== expenseId
      );
      setExpenses(updatedExpense);
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Expense ID</th>
            <th>Expense Name</th>
            <th>Category</th>
            <th>Expense Amount</th>
            <th>Budget</th>
            <th>Created/ Updated On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>"Expense ID will be auto-generated"</td>
            <td>
              <input
                type="text"
                value={expName}
                onChange={(e) => setExpName(e.target.value)}
              />
            </td>
            <td>
              {/*gets the list of categories and populates them by Name*/}
              <select
                value={selectedValue}
                onChange={(e) => setSelectedValue(e.target.value)}
              >
                <option value="">Select an option</option>
                {/* Default option */}
                {options.map((option) => (
                  <option
                    key={option._id || option.id}
                    value={option.Name || option.name}
                  >
                    {/* Adjust property name */}
                    {option.Name || option.name} {/* Display the name */}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="text"
                value={expAmount}
                onChange={(e) => setExpAmount(e.target.value)}
              />
            </td>
            <td>
              <select
                value={selectedBudgetValue}
                onChange={(e) => setSelectedBudgetValue(e.target.value)}
              >
                <option value="">Select an option</option>
                {/* Default option */}
                {budgetOptions.map((budgetOptions) => (
                  <option
                    key={budgetOptions._id || budgetOptions.id}
                    value={budgetOptions.budgetName || budgetOptions.name}
                  >
                    {/* Adjust property name */}
                    {budgetOptions.budgetName || budgetOptions.name}
                    {/* Display the name */}
                  </option>
                ))}
              </select>
            </td>
            <td></td>
            <td>
              <button onClick={createExpense}>Create Record</button>
            </td>
          </tr>
          <tr>
            <td></td>
          </tr>
        </tbody>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense._id}</td>
                <td>{expense.expName}</td>
                <td>{expense.categoryID[0].Name}</td>
                <td>${expense.expAmt}</td>
                <td>{expense.budgetID[0].budgetName}</td>
                <td>{new Date(expense.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => updateExpense(expense._id)}>
                    Update
                  </button>
                  <button onClick={() => deleteExpense(expense._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No expenses found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseComponent;
