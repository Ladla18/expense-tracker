import React from "react";
import { motion } from "framer-motion";
import { DollarSign, User, Calendar } from "lucide-react";

const Dashboard = ({ expenses = [], users = [] }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Expenses"
          value={`$${getTotalExpenses(expenses)}`}
          icon={<DollarSign />}
        />
        <StatCard title="Users" value={users.length} icon={<User />} />
        <StatCard
          title="Last Update"
          value={getLastUpdate(expenses)}
          icon={<Calendar />}
        />
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-gray-300">
        Recent Expenses
      </h2>
      {expenses.length > 0 ? (
        <ul className="space-y-3">
          {expenses.map((expense, index) => (
            <motion.li
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-300">
                  {expense.description}
                </span>
                <span className="text-lg font-bold text-green-400">
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-400 mt-1">
                Paid by: {expense.paidBy}
              </div>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No expenses to display.</p>
      )}
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 rounded-lg p-4 flex items-center">
    <div className="bg-blue-500 p-3 rounded-full mr-4">{icon}</div>
    <div>
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const getTotalExpenses = (expenses) => {
  return expenses && expenses.length > 0
    ? expenses
        .reduce((total, expense) => total + (expense.amount || 0), 0)
        .toFixed(2)
    : "0.00";
};

const getLastUpdate = (expenses) => {
  if (expenses && expenses.length > 0) {
    const lastExpense = expenses[expenses.length - 1];
    return lastExpense.date
      ? new Date(lastExpense.date).toLocaleDateString()
      : "N/A";
  }
  return "N/A";
};

export default Dashboard;
