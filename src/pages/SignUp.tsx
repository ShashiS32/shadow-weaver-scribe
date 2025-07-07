import React, { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
      toast({ title: "Account Created!", description: "Welcome!" });
      navigate("/");
    } else {
      toast({
        title: "Registration Failed",
        description: "Email already in use.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* fullName, email, password, gradeLevel, confidenceLevel, subscribeToTips */}
          {/* copy your existing JSX here */}
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/signup" className="font-medium text-blue-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
