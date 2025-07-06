
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Download, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Resources = () => {
  const resources = [
    {
      title: "Formula Sheet",
      description: "Complete collection of SAT Math formulas",
      icon: FileText,
      type: "PDF"
    },
    {
      title: "Practice Tests",
      description: "Full-length SAT Math practice tests",
      icon: BookOpen,
      type: "PDF"
    },
    {
      title: "Study Guide",
      description: "Comprehensive SAT Math study strategies",
      icon: Download,
      type: "PDF"
    }
  ];

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
              <Link to="/resources" className="text-blue-600 font-semibold">Resources</Link>
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Resources</h1>
          <p className="text-xl text-gray-600">Download helpful materials to boost your SAT Math preparation</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle>{resource.title}</CardTitle>
                  <CardDescription>{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{resource.type}</span>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Study Tips Section */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Study Tips & Strategies</CardTitle>
            <CardDescription>Proven methods to maximize your SAT Math performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Time Management</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Aim for 1.5 minutes per question</li>
                  <li>• Skip difficult questions and return later</li>
                  <li>• Use process of elimination</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Problem-Solving Strategies</h3>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li>• Read questions carefully twice</li>
                  <li>• Identify what's being asked</li>
                  <li>• Show your work clearly</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
