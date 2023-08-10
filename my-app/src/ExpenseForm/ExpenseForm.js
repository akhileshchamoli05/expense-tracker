import React, { useState } from 'react';

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
    
    setExpenses([...expenses, newExpense]);
    setMoneySpent('');
    setDescription('');
    setCategory('');
  };
  
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
