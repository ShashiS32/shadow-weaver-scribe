import React from "react";
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

export const Header: React.FC = () => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Calculator className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">SAT Math Pro</h1>
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        {["/practice","/videos","/resources","/class-signup"].map((path, i) => {
          const label = ["Practice","Videos","Resources","Classes"][i];
          return (
            <Link
              key={path}
              to={path}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  </header>
);
