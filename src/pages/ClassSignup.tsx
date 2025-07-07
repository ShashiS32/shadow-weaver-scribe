
import { useState } from "react";
import { ClassSignupHeader } from "@/components/ClassSignupHeader";
import { ClassSignupForm } from "@/components/ClassSignupForm";
import { ClassSignupSuccess } from "@/components/ClassSignupSuccess";

const ClassSignup = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSuccess = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return <ClassSignupSuccess />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <ClassSignupHeader />
      <ClassSignupForm onSuccess={handleSuccess} />
    </div>
  );
};

export default ClassSignup;
