// src/components/Header.tsx
import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

export const Header = () => (
  <header className="bg-white shadow-sm sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Calculator className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">SAT Math Pro</h1>
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        <Link
          to="/practice"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Practice
        </Link>
        <Link
          to="/videos"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Videos
        </Link>
        <Link
          to="/resources"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Resources
        </Link>
        <Link
          to="/class-signup"
          className="text-gray-600 hover:text-blue-600 transition-colors"
        >
          Classes
        </Link>
      </nav>
    </div>
  </header>
);
