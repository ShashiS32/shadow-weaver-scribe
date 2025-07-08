
import { useState } from "react";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { sendClassSignupNotification } from "@/utils/discordNotificationService";

interface ClassSignupFormProps {
  onSuccess: () => void;
}

export const ClassSignupForm = ({ onSuccess }: ClassSignupFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gradeLevel: "",
    preferredTime: "",
    comments: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Store registration in localStorage for demo purposes
      const registrations = JSON.parse(localStorage.getItem('classRegistrations') || '[]');
      const newRegistration = {
        ...formData,
        id: Date.now().toString(),
        submissionDate: new Date().toISOString(),
        userId: user?.id || null
      };
      registrations.push(newRegistration);
      localStorage.setItem('classRegistrations', JSON.stringify(registrations));
      
      // Send Discord notification
      const notificationSent = await sendClassSignupNotification(formData);
      
      onSuccess();
      toast({
        title: "Registration Successful!",
        description: notificationSent 
          ? "Your class registration has been submitted and notifications have been sent."
          : "Your class registration has been submitted. Discord notification may have failed.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="mx-auto mb-4 h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Join Our SAT Math Classes</h2>
          <p className="text-xl text-gray-600">
            Get personalized instruction from expert tutors and achieve your target score
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Class Registration</CardTitle>
            <CardDescription className="text-center">
              Fill out this form to register for our SAT Math preparation classes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <Label htmlFor="gradeLevel">Grade Level *</Label>
                  <select
                    id="gradeLevel"
                    name="gradeLevel"
                    required
                    value={formData.gradeLevel}
                    onChange={handleInputChange}
                    className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <option value="">Select grade level</option>
                    <option value="9">9th Grade</option>
                    <option value="10">10th Grade</option>
                    <option value="11">11th Grade</option>
                    <option value="12">12th Grade</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <Label htmlFor="preferredTime">Preferred Class Time *</Label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleInputChange}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select preferred time</option>
                  <option value="weekday-morning">Weekday Morning (9AM-12PM)</option>
                  <option value="weekday-afternoon">Weekday Afternoon (1PM-5PM)</option>
                  <option value="weekday-evening">Weekday Evening (6PM-9PM)</option>
                  <option value="weekend-morning">Weekend Morning (9AM-12PM)</option>
                  <option value="weekend-afternoon">Weekend Afternoon (1PM-5PM)</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <div>
                <Label htmlFor="comments">Additional Comments</Label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  placeholder="Any specific goals, questions, or scheduling preferences?"
                  className="w-full min-h-24 px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={4}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register for Classes"}
              </Button>

              <p className="text-sm text-gray-500 text-center">
                By registering, you agree to our Terms of Service and Privacy Policy. 
                We'll contact you within 24 hours to schedule your first class.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
