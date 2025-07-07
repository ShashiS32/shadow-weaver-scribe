 import { useState } from "react";
-import { useToast } from "@/hooks/use-toast";
+import { useToast } from "@/hooks/use-toast";
+import { useAuth } from "@/contexts/AuthContext";
+import { useNavigate, Link } from "react-router-dom";

 const SignUp = () => {
-  const [formData, setFormData] = useState({ fullName: "", email: "", password: "", gradeLevel: "", confidenceLevel: "", subscribeToTips: false });
+  const [formData, setFormData] = useState({
+    fullName: "",
+    email: "",
+    password: "",
+    gradeLevel: "",
+    confidenceLevel: "",
+    subscribeToTips: false,
+  });
   const [isSubmitted, setIsSubmitted] = useState(false);
   const { toast } = useToast();
+  const { register } = useAuth();
+  const navigate = useNavigate();

   const handleSubmit = async (e: React.FormEvent) => {
     e.preventDefault();
-    console.log("Sign up form submitted:", formData);
-    // Simulate successful registration
-    setIsSubmitted(true);
-    toast({ title: "Account Created Successfully!", description: "Welcome to SAT Math Pro. You can now start practicing." });
+    // Attempt to register; AuthContext will reject duplicates
+    const success = await register({
+      fullName: formData.fullName,
+      email: formData.email,
+      password: formData.password,
+      gradeLevel: formData.gradeLevel,
+      confidenceLevel: formData.confidenceLevel,
+    });
+    if (success) {
+      toast({
+        title: "Account Created!",
+        description: "Welcome! You’re now signed in.",
+      });
+      navigate("/"); // or wherever
+    } else {
+      toast({
+        title: "Registration Failed",
+        description: "An account with that email already exists.",
+        variant: "destructive",
+      });
+    }
   };

   if (isSubmitted) {
     return (
