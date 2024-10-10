import React from "react";
import { motion } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react";

const BalanceSummary = ({ expenses, users }) => {
  // Calculate balances
  const balances = users.reduce((acc, user) => {
    acc[user] = 0;
    return acc;
  }, {});

  expenses.forEach((expense) => {
    const { amount, paidBy, participants } = expense;
    balances[paidBy] += amount;

    if (Array.isArray(participants)) {
      // Even split
      const splitAmount = amount / participants.length;
      participants.forEach((participant) => {
        balances[participant] -= splitAmount;
      });
    } else {
      // Custom split
      Object.entries(participants).forEach(([participant, splitAmount]) => {
        balances[participant] -= parseFloat(splitAmount);
      });
    }
  });

  const sortedBalances = Object.entries(balances).sort((a, b) => b[1] - a[1]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl rounded-xl p-8"
    >
      <h1 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
        Balance Summary
      </h1>
      <ul className="space-y-4">
        {sortedBalances.map(([user, balance], index) => (
          <motion.li
            key={user}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`p-4 rounded-lg ${
              balance > 0
                ? "bg-gradient-to-r from-green-500 to-green-600"
                : "bg-gradient-to-r from-red-500 to-red-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">{user}</span>
              <div className="flex items-center">
                <span className="text-2xl font-bold mr-2">
                  ${Math.abs(balance).toFixed(2)}
                </span>
                {balance > 0 ? (
                  <ArrowUpCircle className="text-green-200" size={24} />
                ) : (
                  <ArrowDownCircle className="text-red-200" size={24} />
                )}
              </div>
            </div>
            <div className="text-sm mt-1 text-gray-200">
              {balance > 0 ? "to receive" : "to pay"}
            </div>
          </motion.li>
        ))}
      </ul>
      <TotalBalance balances={balances} />
    </motion.div>
  );
};

const TotalBalance = ({ balances }) => {
  const totalPositive = Object.values(balances).reduce(
    (sum, balance) => sum + (balance > 0 ? balance : 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="mt-8 p-4 bg-gray-800 rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-2 text-gray-300">
        Total Balance
      </h2>
      <div className="flex items-center justify-between">
        <span className="text-gray-400">Total amount to be settled:</span>
        <div className="flex items-center">
          <DollarSign className="text-green-400 mr-1" size={20} />
          <span className="text-2xl font-bold text-green-400">
            {totalPositive.toFixed(2)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceSummary;
