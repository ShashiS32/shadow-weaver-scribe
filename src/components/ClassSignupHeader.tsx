
import { Calculator } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";

export const ClassSignupHeader = () => {
  const { isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-900">SAT Math Pro</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/practice" className="text-gray-600 hover:text-blue-600 transition-colors">Practice</Link>
            <Link to="/videos" className="text-gray-600 hover:text-blue-600 transition-colors">Videos</Link>
            <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</Link>
            {isAuthenticated ? (
              <ProfileDropdown />
            ) : (
              <Button asChild variant="outline">
                <Link to="/signin">Sign In</Link>
              </Button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};
