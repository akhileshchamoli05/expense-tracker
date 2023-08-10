import axios from 'axios';
// import {firestore} from '../firebase';
import React, { useState, useEffect } from 'react';

const ExpenseForm = () => {
  console.log("Hello");
  const [expenses, setExpenses] = useState([]);
  const [moneySpent, setMoneySpent] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  
  const handleAddExpense = () => {
    const newExpense = {
      moneySpent,
      description,
      category,
    };
  
    axios.post('https://expense-tracker-8f63f-default-rtdb.firebaseio.com/expenses.json', newExpense)
      .then(response => {
        console.log("Expense added successfully:", response.data);
  
        // Update local state
        setExpenses([...expenses, newExpense]);
        setMoneySpent('');
        setDescription('');
        setCategory('');
      })
      .catch(error => {
        console.error("Error adding expense:", error);
      });
  };
  

  useEffect(() => {
    // Using axios to fetch expenses from Firebase
    axios.get('https://expense-tracker-8f63f-default-rtdb.firebaseio.com/expenses.json')
      .then(response => {
        const fetchedExpenses = response.data;
        if (fetchedExpenses) {
          const expensesArray = Object.values(fetchedExpenses);
          setExpenses(expensesArray);
        }
      })
      .catch(error => {
        console.error("Error fetching expenses:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once, on mount

  return (
    <div>
      <h2>Expense Tracker</h2>
      
      <form>
        <input
          type="text"
          value={moneySpent}
          onChange={(e) => setMoneySpent(e.target.value)}
          placeholder="Money Spent"
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
          {/* Add more options */}
        </select>
        <button type="button" onClick={handleAddExpense}>
          Add Expense
        </button>
      </form>
      
      <h3>Expenses:</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.description} - {expense.moneySpent} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseForm;
