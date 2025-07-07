
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Mail } from "lucide-react";

export const EmailSetup = () => {
  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Email Setup Required</span>
        </CardTitle>
        <CardDescription>
          To enable email functionality, you need to set up EmailJS
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertDescription>
            <strong>Steps to enable email sending:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Go to <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">EmailJS.com <ExternalLink className="h-3 w-3 ml-1" /></a></li>
              <li>Create a free account</li>
              <li>Add an email service (Gmail, Outlook, etc.)</li>
              <li>Create email templates for instructor and student notifications</li>
              <li>Replace the placeholder values in ClassSignup.tsx with your actual EmailJS credentials</li>
            </ol>
          </AlertDescription>
        </Alert>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Template Variables Needed:</h4>
          <p className="text-sm text-gray-600 mb-2"><strong>Instructor Template:</strong></p>
          <ul className="text-xs text-gray-500 list-disc list-inside mb-3">
            <li>student_name, student_email, student_phone</li>
            <li>grade_level, preferred_time, comments</li>
            <li>submission_date, submission_time</li>
          </ul>
          <p className="text-sm text-gray-600 mb-2"><strong>Student Confirmation Template:</strong></p>
          <ul className="text-xs text-gray-500 list-disc list-inside">
            <li>student_name, preferred_time, grade_level</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
