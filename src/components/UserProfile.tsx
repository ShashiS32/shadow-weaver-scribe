
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, GraduationCap, TrendingUp, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getConfidenceColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-red-100 text-red-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-blue-100 text-blue-800';
      case 'expert': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center pb-4">
        <div className="flex justify-center mb-4">
          <Avatar className="h-20 w-20">
            <AvatarFallback className="text-xl font-bold bg-blue-100 text-blue-600">
              {getInitials(user.fullName)}
            </AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-xl">{user.fullName}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Grade {user.gradeLevel}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500" />
            <span className="text-sm">Joined {formatDate(user.joinedDate)}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <TrendingUp className="h-4 w-4 text-gray-500" />
          <span className="text-sm mr-2">Math Level:</span>
          <Badge className={getConfidenceColor(user.confidenceLevel)}>
            {user.confidenceLevel.charAt(0).toUpperCase() + user.confidenceLevel.slice(1)}
          </Badge>
        </div>

        <div className="pt-4 border-t">
          <Button 
            onClick={handleLogout} 
            variant="outline" 
            className="w-full"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
