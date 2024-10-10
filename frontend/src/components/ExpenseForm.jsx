import React, { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Users, Percent, User } from "lucide-react";

const ExpenseForm = ({ onAddExpense, users }) => {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    paidBy: "",
    participants: {},
    split: "even",
  });

  const handleParticipantChange = (user, isParticipating) => {
    setExpense((prev) => ({
      ...prev,
      participants: {
        ...prev.participants,
        [user]: isParticipating ? (prev.split === "even" ? 0 : "") : undefined,
      },
    }));
  };

  const handleSplitChange = (e) => {
    const newSplit = e.target.value;
    setExpense((prev) => ({
      ...prev,
      split: newSplit,
      participants: Object.fromEntries(
        Object.entries(prev.participants).map(([user, value]) => [
          user,
          value !== undefined ? (newSplit === "even" ? 0 : "") : undefined,
        ])
      ),
    }));
  };

  const handleCustomSplitChange = (user, value) => {
    setExpense((prev) => ({
      ...prev,
      participants: {
        ...prev.participants,
        [user]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const participantsArray = Object.keys(expense.participants).filter(
      (user) => expense.participants[user] !== undefined
    );
    let processedExpense = { ...expense, participants: participantsArray };

    if (expense.split === "even") {
      const splitAmount = expense.amount / participantsArray.length;
      processedExpense.participants = Object.fromEntries(
        participantsArray.map((user) => [user, splitAmount])
      );
    } else {
      processedExpense.participants = Object.fromEntries(
        Object.entries(expense.participants).filter(
          ([_, value]) => value !== undefined
        )
      );
    }

    onAddExpense(processedExpense);
    setExpense({
      description: "",
      amount: "",
      paidBy: "",
      participants: {},
      split: "even",
    });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl rounded-xl p-8"
    >
      <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Add New Expense
      </h2>

      <InputField
        id="description"
        label="Description"
        type="text"
        placeholder="Enter expense description"
        value={expense.description}
        onChange={(e) =>
          setExpense({ ...expense, description: e.target.value })
        }
        icon={<DollarSign size={18} />}
      />

      <InputField
        id="amount"
        label="Amount"
        type="number"
        placeholder="Enter amount"
        value={expense.amount}
        onChange={(e) =>
          setExpense({ ...expense, amount: parseFloat(e.target.value) })
        }
        icon={<DollarSign size={18} />}
      />

      <div className="mb-6">
        <label
          className="block text-gray-300 text-sm font-semibold mb-2"
          htmlFor="paidBy"
        >
          Paid By
        </label>
        <div className="relative">
          <select
            id="paidBy"
            className="block appearance-none w-full bg-gray-800 border border-gray-700 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
            value={expense.paidBy}
            onChange={(e) => setExpense({ ...expense, paidBy: e.target.value })}
            required
          >
            <option value="">Who paid?</option>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <User size={18} />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-semibold mb-2">
          Participants
        </label>
        <div className="bg-gray-800 rounded-lg p-4">
          {users.map((user) => (
            <div key={user} className="flex items-center mb-2 last:mb-0">
              <input
                type="checkbox"
                id={`participant-${user}`}
                checked={expense.participants[user] !== undefined}
                onChange={(e) =>
                  handleParticipantChange(user, e.target.checked)
                }
                className="mr-2"
              />
              <label htmlFor={`participant-${user}`} className="text-gray-300">
                {user}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-gray-300 text-sm font-semibold mb-2">
          Split Type
        </label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-800 border border-gray-700 text-white py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
            value={expense.split}
            onChange={handleSplitChange}
          >
            <option value="even">Even Split</option>
            <option value="custom">Custom Split</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <Percent size={18} />
          </div>
        </div>
      </div>

      {expense.split === "custom" && (
        <div className="mb-6">
          <label className="block text-gray-300 text-sm font-semibold mb-2">
            Custom Split
          </label>
          <div className="bg-gray-800 rounded-lg p-4">
            {Object.entries(expense.participants).map(
              ([user, value]) =>
                value !== undefined && (
                  <div key={user} className="flex items-center mb-2 last:mb-0">
                    <label className="w-1/4 text-gray-300">{user}</label>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) =>
                        handleCustomSplitChange(user, e.target.value)
                      }
                      className="w-3/4 bg-gray-700 text-white border border-gray-600 rounded py-2 px-3 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500"
                      placeholder="Amount"
                    />
                  </div>
                )
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
      >
        Add Expense
      </button>
    </motion.form>
  );
};

const InputField = ({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  icon,
}) => (
  <div className="mb-6">
    <label
      className="block text-gray-300 text-sm font-semibold mb-2"
      htmlFor={id}
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={id}
        type={type}
        className="block w-full bg-gray-800 text-white border border-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
        {icon}
      </div>
    </div>
  </div>
);

export default ExpenseForm;
