// src/pages/SignUp.tsx
import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";              // ← fixed import
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    gradeLevel: "",
    confidenceLevel: "",
    subscribeToTips: false,
  });
  const { toast } = useToast();
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      gradeLevel: formData.gradeLevel,
      confidenceLevel: formData.confidenceLevel,
    });
    if (success) {
      toast({
        title: "Account Created!",
        description: "Welcome! You’re now signed in.",
      });
      navigate("/");
    } else {
      toast({
        title: "Registration Failed",
        description: "An account with that email already exists.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="gradeLevel" className="block text-sm font-medium text-gray-700">
              Grade Level
            </label>
            <select
              id="gradeLevel"
              name="gradeLevel"
              required
              value={formData.gradeLevel}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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
            <label htmlFor="confidenceLevel" className="block text-sm font-medium text-gray-700">
              Math Confidence Level
            </label>
            <select
              id="confidenceLevel"
              name="confidenceLevel"
              required
              value={formData.confidenceLevel}
              onChange={handleInputChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            >
              <option value="">Select confidence level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
              <option value="expert">Expert</option>
            </select>
          </div>
          <div className="flex items-center">
            <input
              id="subscribeToTips"
              name="subscribeToTips"
              type="checkbox"
              checked={formData.subscribeToTips}
              onChange={handleInputChange}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
            />
            <label htmlFor="subscribeToTips" className="ml-2 block text-sm text-gray-900">
              Send me study tips & updates
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
