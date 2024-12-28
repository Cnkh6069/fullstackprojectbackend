import React, { useState, useEffect } from "react";
import axios from "axios";

const IncomeComponent = () => {
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newIncome, setNewIncome] = useState({
    incomeName: "",
    incomeAmt: "",
    categoryID: "",
  });

  // Fetch existing income records and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [incomeRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:3000/incomes"),
          axios.get("http://localhost:3000/categories"),
        ]);
        setIncomes(incomeRes.data);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle input changes for new income
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncome((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Create a new income
  const createIncome = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/incomes",
        newIncome
      );
      setIncomes((prev) => [...prev, response.data]);
      window.location.reload();
      setNewIncome({ incomeName: "", incomeAmt: "", categoryID: "" }); // Clear form
      alert("Income created successfully!");
    } catch (error) {
      console.error("Error adding income:", error);
      alert("Failed to add income.");
    }
  };

  // Update an existing income
  const updateIncome = async (incomeId) => {
    const incomeToUpdate = incomes.find((income) => income._id === incomeId);
    if (!incomeToUpdate) {
      alert("Income not found!");
      return;
    }

    const updatedIncomeName = prompt(
      "Enter new Income Name (leave blank to keep current):",
      incomeToUpdate.incomeName
    );
    const updatedIncomeAmt = prompt(
      "Enter new Income Amount (leave blank to keep current):",
      incomeToUpdate.incomeAmt
    );
    const updatedCategory = prompt(
      "Enter new Category Name (leave blank to keep current):",
      incomeToUpdate.categoryID[0]?.Name || ""
    );

    const updatedIncome = {
      incomeName: updatedIncomeName || incomeToUpdate.incomeName,
      incomeAmt: updatedIncomeAmt
        ? parseFloat(updatedIncomeAmt)
        : incomeToUpdate.incomeAmt,
      categoryID: updatedCategory
        ? categories.find((cat) => cat.Name === updatedCategory)?._id ||
          incomeToUpdate.categoryID
        : incomeToUpdate.categoryID,
    };

    try {
      const response = await axios.put(
        `http://localhost:3000/incomes/${incomeId}`,
        updatedIncome
      );
      setIncomes((prevIncomes) =>
        prevIncomes.map((income) =>
          income._id === incomeId ? { ...income, ...response.data } : income
        )
      );
      alert("Income updated successfully!");
    } catch (error) {
      console.error("Error updating income:", error);
      alert("Failed to update income.");
    }
  };

  // Delete an income
  const deleteIncome = async (incomeId) => {
    try {
      await axios.delete(`http://localhost:3000/incomes/${incomeId}`);
      setIncomes((prev) => prev.filter((income) => income._id !== incomeId));
      alert("Income deleted successfully!");
    } catch (error) {
      console.error("Error deleting income:", error);
      alert("Failed to delete income.");
    }
  };

  return (
    <div>
      <div className="top-bar ">
        {/* Income Form */}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            createIncome();
          }}
        >
          <label> Desc: </label>
          <input
            type="text"
            name="incomeName"
            placeholder="Name of Income"
            value={newIncome.incomeName}
            onChange={handleInputChange}
            required
          />
          <label> Amount: </label>
          <input
            type="number"
            name="incomeAmt"
            placeholder="Income Amount"
            value={newIncome.incomeAmt}
            onChange={handleInputChange}
            required
          />
          <label> Category: </label>
          <select
            name="categoryID"
            value={newIncome.categoryID}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.Name}
              </option>
            ))}
          </select>
          <button className="createbutton" type="submit">
            Create Income
          </button>
        </form>
      </div>
      {/* Income Table */}
      <h3>Incomes</h3>
      <table>
        <thead>
          <tr>
            <th>Income ID</th>
            <th>Income Name</th>
            <th>Category</th>
            <th>Income Amount</th>
            <th>Created On</th>
            <th>Updated On</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {incomes.length > 0 ? (
            incomes.map((income) => (
              <tr key={income._id}>
                <td>{income._id}</td>
                <td>{income.incomeName}</td>
                <td>{income.categoryID[0]?.Name}</td>
                <td>${income.incomeAmt}</td>
                <td>{new Date(income.createdAt).toLocaleString()}</td>
                <td>{new Date(income.updatedAt).toLocaleString()}</td>
                <td>
                  <button
                    className="updatebutton"
                    onClick={() => updateIncome(income._id)}
                  >
                    Update
                  </button>
                  <button
                    className="deletebutton"
                    onClick={() => deleteIncome(income._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No income records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeComponent;
