// App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import BalanceSummary from "./components/BalanceSummary";
import Header from "./components/Header";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [users, setUsers] = useState(["Alice", "Bob", "Charlie", "David"]);

  const addExpense = (newExpense) => {
    setExpenses([...expenses, { ...newExpense, id: Date.now() }]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route
              path="/"
              element={<Dashboard expenses={expenses} users={users} />}
            />
            <Route
              path="/add-expense"
              element={<ExpenseForm onAddExpense={addExpense} users={users} />}
            />
            <Route
              path="/balance-summary"
              element={<BalanceSummary expenses={expenses} users={users} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
