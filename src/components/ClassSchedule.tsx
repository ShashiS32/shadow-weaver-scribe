
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Edit, Trash2, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { sendDiscordNotification } from "@/utils/discordNotificationService";

interface ClassRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  gradeLevel: string;
  preferredTime: string;
  comments: string;
  submissionDate: string;
  userId: string | null;
  status: 'active' | 'cancelled';
}

export const ClassSchedule = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getUserClasses = (): ClassRegistration[] => {
    const registrations = JSON.parse(localStorage.getItem('classRegistrations') || '[]');
    return registrations.filter((reg: ClassRegistration) => 
      reg.userId === user?.id && reg.status !== 'cancelled'
    );
  };

  const [userClasses, setUserClasses] = useState<ClassRegistration[]>(getUserClasses());

  const formatTime = (timeSlot: string) => {
    return timeSlot.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCancelClass = async (classId: string) => {
    setIsLoading(true);
    try {
      const registrations = JSON.parse(localStorage.getItem('classRegistrations') || '[]');
      const updatedRegistrations = registrations.map((reg: ClassRegistration) =>
        reg.id === classId ? { ...reg, status: 'cancelled' } : reg
      );
      localStorage.setItem('classRegistrations', JSON.stringify(updatedRegistrations));

      const cancelledClass = registrations.find((reg: ClassRegistration) => reg.id === classId);
      
      if (cancelledClass) {
        // Send Discord notification
        const notificationSent = await sendDiscordNotification('classSignup', {
          ...cancelledClass,
          comments: `CLASS CANCELLED - Original: ${cancelledClass.comments || 'No comments'}`
        });

        if (!notificationSent) {
          console.warn('Discord notification failed to send for class cancellation');
        }
      }

      setUserClasses(getUserClasses());
      toast({
        title: "Class Cancelled",
        description: "Your class has been cancelled successfully. A notification has been sent.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel class. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeClass = async (classId: string) => {
    // For now, we'll just show a message. In a real app, this would open a modal to edit the class
    toast({
      title: "Change Class",
      description: "Class modification feature coming soon. Please contact support to change your class schedule.",
    });
  };

  if (userClasses.length === 0) {
    return (
      <Card>
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle>No Classes Enrolled</CardTitle>
          <CardDescription>
            You haven't signed up for any classes yet. Register for a class to start your SAT Math journey!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild>
            <a href="/class-signup">Sign Up for Classes</a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Class Schedule</h3>
        <p className="text-gray-600">Manage your enrolled SAT Math classes</p>
      </div>

      <div className="grid gap-4">
        {userClasses.map((classReg) => (
          <Card key={classReg.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">SAT Math Preparation Class</CardTitle>
                  <CardDescription>Grade {classReg.gradeLevel}</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{formatTime(classReg.preferredTime)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Registered: {formatDate(classReg.submissionDate)}</span>
                </div>
              </div>

              {classReg.comments && (
                <div className="p-3 bg-gray-50 rounded-md">
                  <p className="text-sm text-gray-700">
                    <strong>Comments:</strong> {classReg.comments}
                  </p>
                </div>
              )}

              <div className="flex space-x-2 pt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleChangeClass(classReg.id)}
                  disabled={isLoading}
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Change Schedule
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleCancelClass(classReg.id)}
                  disabled={isLoading}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Cancel Class
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
