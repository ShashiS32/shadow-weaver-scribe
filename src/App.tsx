
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Resources from "./pages/Resources";
import SignIn from "./pages/SignIn";
import ClassSignup from "./pages/ClassSignup";
import ProfileView from "./pages/ProfileView";
import ProfileSettings from "./pages/ProfileSettings";
import PracticeByTopic from "./pages/PracticeByTopic";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/practice-by-topic" element={<PracticeByTopic />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/class-signup" element={<ClassSignup />} />
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/settings" element={<ProfileSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
