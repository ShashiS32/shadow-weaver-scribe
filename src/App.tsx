// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";  // ← new!

import Index from "@/pages/Index";
import Practice from "@/pages/Practice";
import Videos from "@/pages/Videos";
import Resources from "@/pages/Resources";
import ClassSignup from "@/pages/ClassSignup";
import SignUp from "@/pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      {/* ← Now every page gets this Header */}
      <Header />

      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/class-signup" element={<ClassSignup />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
