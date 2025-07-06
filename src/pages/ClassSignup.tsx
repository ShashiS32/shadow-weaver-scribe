
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, CheckCircle, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const ClassSignup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    gradeLevel: "",
    preferredTime: "",
    comments: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendEmail = async (data: typeof formData) => {
    // In a real application, you would use a backend service like EmailJS or a server endpoint
    // For now, we'll simulate the email sending
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDate.toLocaleTimeString();
    
    const emailContent = {
      to: ["shashwats17@gmail.com", data.email],
      subject: "SAT Math Pro - New Class Registration",
      body: `
New class registration received:

Student Information:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.phone}
- Grade Level: ${data.gradeLevel}
- Preferred Time: ${data.preferredTime}
- Comments: ${data.comments || "None"}

Submission Details:
- Date: ${formattedDate}
- Time: ${formattedTime}

Please follow up with the student to schedule their first class.
      `
    };

    // Simulate email sending with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Email would be sent to:", emailContent.to);
    console.log("Email content:", emailContent.body);
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendEmail(formData);
      setIsSubmitted(true);
      toast({
        title: "Registration Successful!",
        description: "We've received your class registration and will contact you soon.",
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

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Registration Confirmed!</CardTitle>
            <CardDescription>
              Thank you for registering for SAT Math Pro classes. We've sent confirmation emails to both you and our instructor.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 text-center">
                You'll receive a follow-up email within 24 hours to schedule your first class.
              </p>
            </div>
            <Button asChild className="w-full">
              <Link to="/">Return to Homepage</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
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
              <Button variant="outline">Sign In</Button>
            </nav>
          </div>
        </div>
      </header>

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
    </div>
  );
};

export default ClassSignup;
