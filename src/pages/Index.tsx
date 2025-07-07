// src/pages/Index.tsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator, Clock, Book, Star, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { DailyChallengeWidget } from "@/components/DailyChallengeWidget";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Index: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    gradeLevel: "",
    confidenceLevel: "",
    subscribeToTips: false,
  });
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quick signup form submitted:", formData);
    toast({
      title: "Thanks for your interest!",
      description: "Please complete your registration on the signup page.",
    });
    window.location.href = "/signup";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Master SAT Math with
                <span className="text-blue-600 block">
                  Precision & Speed
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Boost your SAT Math score through interactive practice,
                expert videos, personalized learning, and live
                classes. Join thousands of students achieving their dream
                scores.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="text-lg px-8 py-3 bg-blue-600 hover:bg-blue-700"
                >
                  <Link to="/practice">Start Free Practice</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3"
                >
                  <Link to="/class-signup">Join Our Classes</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <span className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Free to start
                </span>
                <span className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Expert instruction
                </span>
                <span className="flex items-center">
                  <Check className="h-4 w-4 text-green-500 mr-1" />
                  Proven results
                </span>
              </div>
            </div>

            {/* Hero Illustration with Daily Challenge */}
            <div className="relative">
              <DailyChallengeWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform combines interactive practice,
              expert instruction, and personalized learning paths.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link to="/practice">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>Practice Portal</CardTitle>
                  <CardDescription>
                    Interactive problems with instant feedback and detailed
                    explanations
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/videos">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                    <Book className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle>Video Library</CardTitle>
                  <CardDescription>
                    Expert walkthrough videos for every SAT Math topic and
                    strategy
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/resources">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                    <Star className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle>Study Resources</CardTitle>
                  <CardDescription>
                    Formula sheets, practice tests, and comprehensive study
                    guides
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link to="/class-signup">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group h-full">
                <CardHeader>
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                    <Calculator className="h-6 w-6 text-orange-600" />
                  </div>
                  <CardTitle>Live Classes</CardTitle>
                  <CardDescription>
                    Small-group sessions with expert instructors
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Sign-Up Section (only if not authenticated) */}
      {!isAuthenticated && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Start Your SAT Math Journey
              </h2>
              <p className="text-xl text-gray-600">
                Join hundreds of students who've improved their scores with
                our proven methods
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center">
                  Get Started Today
                </CardTitle>
                <CardDescription className="text-center">
                  Fill out this quick form to begin your SAT Math
                  preparation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
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
                      <Label htmlFor="gradeLevel">Grade Level</Label>
                      <select
                        id="gradeLevel"
                        name="gradeLevel"
                        required
                        value={formData.gradeLevel}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select grade level</option>
                        <option value="9">9th Grade</option>
                        <option value="10">10th Grade</option>
                        <option value="11">11th Grade</option>
                        <option value="12">12th Grade</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="confidenceLevel">Math Confidence Level</Label>
                      <select
                        id="confidenceLevel"
                        name="confidenceLevel"
                        required
                        value={formData.confidenceLevel}
                        onChange={handleInputChange}
                        className="w-full h-10 px-3 py-2 border rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Select confidence level</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                        <option value="expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      id="subscribeToTips"
                      name="subscribeToTips"
                      type="checkbox"
                      checked={formData.subscribeToTips}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor="subscribeToTips">
                      Send me study tips & updates
                    </Label>
                  </div>

                  <Button type="submit" className="w-full">
                    Get Started
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    By continuing, you agree to our Terms of Service and
                    Privacy Policy
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6" />
                <span className="font-bold text-lg">SAT Math Pro</span>
              </div>
              <p className="text-gray-400">
                Helping students master SAT Math with precision,
                speed, and confidence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/practice" className="hover:text-white transition-colors">
                    Practice Portal
                  </Link>
                </li>
                <li>
                  <Link to="/videos" className="hover:text-white transition-colors">
                    Video Vault
                  </Link>
                </li>
                <li>
                  <Link to="/resources" className="hover:text-white transition-colors">
                    Resource Library
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Study Tips
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <p className="text-gray-400 mb-2">Founded by Shashwat Singh</p>
              <p className="text-gray-400">shashwats17@gmail.com</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SAT Math Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
