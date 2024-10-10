import React from "react";
import { Link } from "react-router-dom";
import { Home, PlusCircle, PieChart } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <nav className="container mx-auto px-6 py-4">
        <ul className="flex items-center justify-between">
          <li className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
            ExpenseTracker
          </li>
          <div className="flex space-x-6">
            {[
              { to: "/", text: "Dashboard", icon: Home },
              { to: "/add-expense", text: "Add Expense", icon: PlusCircle },
              {
                to: "/balance-summary",
                text: "Balance Summary",
                icon: PieChart,
              },
            ].map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-200"
                >
                  <link.icon size={18} />
                  <span>{link.text}</span>
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
