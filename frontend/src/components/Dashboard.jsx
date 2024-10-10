import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  DollarSign,
  User,
  Calendar,
  X,
  Upload,
  Check,
  Eye,
  AlertCircle,
} from "lucide-react";

const Dashboard = ({ expenses = [], users = [], onPaymentSubmit }) => {
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [paymentModal, setPaymentModal] = useState(false);
  const [screenshotModal, setScreenshotModal] = useState(false);

  const handlePaymentSubmit = (expenseId, payerId, screenshot) => {
    onPaymentSubmit(expenseId, payerId, screenshot);
    setPaymentModal(false);
  };
  console.log(expenses)

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
        Expenses and Settlements
      </h2>
      {expenses.length > 0 ? (
        <ul className="space-y-6">
          {expenses.map((expense, index) => (
            <motion.li
              key={expense.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-lg border border-gray-700 p-6 rounded-lg shadow-md"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium text-xl text-gray-300">
                  {expense.description}
                </span>
                <span className="text-2xl font-bold text-green-400">
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-4">
                Paid by: {expense.paidBy}
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-300">
                  Payment Status
                </h3>
                <ul className="space-y-2">
                  {Object.entries(expense.participants).map(
                    ([participant, amount]) => (
                      <li
                        key={participant}
                        className="flex justify-between items-center"
                      >
                        <span>{participant}</span>
                        <div className="flex items-center">
                          <span className="mr-2">${amount.toFixed(1)}</span>
                          {participant === expense.paidBy ? (
                            <div className="flex items-center text-green-400">
                              <Check size={16} className="mr-1" />
                              <span>Paid</span>
                              <button
                                onClick={() => {
                                  setSelectedExpense(expense);
                                  setScreenshotModal(true);
                                }}
                                className="ml-2 text-blue-400 hover:text-blue-300"
                              >
                                <Eye size={16} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-red-400">Not Paid</span>
                          )}
                        </div>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <button
                onClick={() => {
                  setSelectedExpense(expense);
                  setPaymentModal(true);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm transition duration-300"
              >
                Submit Payment
              </button>
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No expenses to display.</p>
      )}

      <AnimatePresence>
        {paymentModal && (
          <PaymentModal
            expense={selectedExpense}
            onClose={() => setPaymentModal(false)}
            onSubmit={handlePaymentSubmit}
            users={users}
          />
        )}
        {screenshotModal && (
          <ScreenshotModal
            expense={selectedExpense}
            onClose={() => setScreenshotModal(false)}
          />
        )}
      </AnimatePresence>
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

const PaymentModal = ({ expense, onClose, onSubmit, users }) => {
  const [payerId, setPayerId] = useState("");
  const [screenshot, setScreenshot] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expense.id, payerId, screenshot);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">Submit Payment</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="payer"
            >
              Payer
            </label>
            <select
              id="payer"
              value={payerId}
              onChange={(e) => setPayerId(e.target.value)}
              className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
              required
            >
              <option value="">Select a payer</option>
              {users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="screenshot"
            >
              Payment Screenshot
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="w-full flex flex-col items-center px-4 py-6 bg-gray-700 text-white rounded-lg shadow-lg tracking-wide uppercase border border-gray-600 cursor-pointer hover:bg-gray-600">
                <Upload size={24} />
                <span className="mt-2 text-base leading-normal">
                  {screenshot ? screenshot.name : "Select a file"}
                </span>
                <input
                  type="file"
                  id="screenshot"
                  className="hidden"
                  onChange={(e) => setScreenshot(e.target.files[0])}
                  accept="image/*"
                />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
          >
            Submit Payment
          </button>
        </form>
      </div>
    </motion.div>
  );
};

const ScreenshotModal = ({ expense, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white">
            Payment Screenshots
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {expense.payments.map((payment, index) => (
            <div key={index} className="bg-gray-700 rounded-lg p-4">
              <p className="text-gray-300 mb-2">Paid by: {payment.payer}</p>
              <img
                src={payment.screenshot}
                alt={`Payment by ${payment.payer}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

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
