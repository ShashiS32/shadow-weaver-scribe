
import { Link, useLocation } from "react-router-dom";
import { Calculator } from "lucide-react";
import { Button } from "./ui/button";
import { ProfileDropdown } from "./ProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Calculator className="h-8 w-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-900">SAT Math Pro</h1>
        </Link>
        
        <nav className="flex items-center space-x-8">
          <Link
            to="/"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/") 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Home
          </Link>
          
          <Link
            to="/resources"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/resources") 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Resources
          </Link>
          
          <Link
            to="/class-signup"
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              isActive("/class-signup") 
                ? "bg-blue-100 text-blue-700" 
                : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
            }`}
          >
            Classes
          </Link>
          
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <Button asChild>
              <Link to="/signin">Sign In / Get Started</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
};
