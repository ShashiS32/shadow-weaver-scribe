
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calculator, Edit, User, Calendar, ArrowRight, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { UserProfile } from "@/components/UserProfile";
import { ClassSchedule } from "@/components/ClassSchedule";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/Header";
import { useState } from "react";

const ProfileView = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'profile' | 'classes' | 'settings'>('overview');
  const navigate = useNavigate();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <CardTitle>Loading...</CardTitle>
            <CardDescription>Please wait while we verify your session.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

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

  const navigationCards = [
    {
      id: 'profile',
      title: 'My Profile',
      description: 'View and manage your personal information',
      icon: User,
      color: 'bg-blue-500',
    },
    {
      id: 'classes',
      title: 'My Classes',
      description: 'View your enrolled classes and schedule',
      icon: Calendar,
      color: 'bg-green-500',
    },
    {
      id: 'settings',
      title: 'Account Settings',
      description: 'Update your preferences and account details',
      icon: Settings,
      color: 'bg-purple-500',
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Profile Information</h3>
              <Button
                variant="outline"
                onClick={() => setActiveSection('overview')}
              >
                Back to Overview
              </Button>
            </div>
            <UserProfile />
          </div>
        );
      case 'classes':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">My Classes</h3>
              <Button
                variant="outline"
                onClick={() => setActiveSection('overview')}
              >
                Back to Overview
              </Button>
            </div>
            <ClassSchedule />
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">Account Settings</h3>
              <Button
                variant="outline"
                onClick={() => setActiveSection('overview')}
              >
                Back to Overview
              </Button>
            </div>
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to="/profile/settings">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Dashboard Overview</h3>
              <p className="text-gray-600">Choose a section to manage your account</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {navigationCards.map((card) => {
                const IconComponent = card.icon;
                return (
                  <Card 
                    key={card.id} 
                    className="hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-blue-200"
                    onClick={() => setActiveSection(card.id as any)}
                  >
                    <CardHeader className="text-center">
                      <div className={`w-16 h-16 ${card.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <CardTitle className="text-xl">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full" variant="outline">
                        <span>Open Section</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="h-5 w-5 mr-2 text-blue-600" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full justify-start" variant="ghost">
                    <Link to="/practice-by-topic">
                      <Calculator className="h-4 w-4 mr-2" />
                      Start Practice Session
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="ghost">
                    <Link to="/resources">
                      <Edit className="h-4 w-4 mr-2" />
                      Browse Resources
                    </Link>
                  </Button>
                  <Button asChild className="w-full justify-start" variant="ghost">
                    <Link to="/class-signup">
                      <Calendar className="h-4 w-4 mr-2" />
                      Enroll in Classes
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest progress and updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <div className="flex justify-between items-center">
                      <span>Last practice session</span>
                      <span className="font-medium">2 days ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Profile updated</span>
                      <span className="font-medium">1 week ago</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Classes enrolled</span>
                      <span className="font-medium">2 weeks ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">My Dashboard</h2>
            <p className="text-xl text-gray-600">Manage your account and track your progress</p>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
