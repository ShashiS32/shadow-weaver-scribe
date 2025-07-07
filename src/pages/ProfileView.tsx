
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Edit } from "lucide-react";
import { Link } from "react-router-dom";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { UserProfile } from "@/components/UserProfile";
import { ProfileNavigation } from "@/components/ProfileNavigation";
import { useAuth } from "@/contexts/AuthContext";

const ProfileView = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>Please sign in to view your profile.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link to="/signin">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
              <ProfileDropdown />
            </nav>
          </div>
        </div>
      </header>

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Profile</h2>
            <p className="text-xl text-gray-600">View your account information and progress</p>
          </div>

          <ProfileNavigation />

          <div className="flex justify-center mb-6">
            <UserProfile />
          </div>

          <div className="text-center">
            <Button asChild>
              <Link to="/profile/settings">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
