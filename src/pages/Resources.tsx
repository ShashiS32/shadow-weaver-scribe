
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Download, BookOpen, FileText, Target, Lightbulb, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Resources = () => {
  const { toast } = useToast();

  const handleDownload = (resourceName: string) => {
    toast({
      title: "Download Started",
      description: `${resourceName} is being prepared for download.`,
    });
  };

  const resources = [
    {
      title: "Complete Formula Sheet",
      description: "All essential SAT Math formulas in one comprehensive guide",
      icon: FileText,
      type: "PDF",
      size: "2.3 MB",
      downloads: "12.5K"
    },
    {
      title: "Practice Test Collection",
      description: "10 full-length SAT Math practice tests with detailed solutions",
      icon: BookOpen,
      type: "PDF Bundle",
      size: "15.7 MB", 
      downloads: "8.9K"
    },
    {
      title: "Study Strategy Guide",
      description: "Proven methods and time management strategies for SAT Math",
      icon: Target,
      type: "PDF",
      size: "4.1 MB",
      downloads: "6.2K"
    },
    {
      title: "Quick Reference Cards",
      description: "Pocket-sized cards with key formulas and concepts",
      icon: Download,
      type: "PDF",
      size: "1.8 MB",
      downloads: "9.3K"
    },
    {
      title: "Error Analysis Worksheet",
      description: "Track and analyze your mistakes to improve faster",
      icon: Lightbulb,
      type: "PDF",
      size: "0.9 MB",
      downloads: "4.1K"
    },
    {
      title: "Calculator Tips Guide",
      description: "Master your calculator for maximum efficiency",
      icon: Calculator,
      type: "PDF",
      size: "2.7 MB",
      downloads: "7.8K"
    }
  ];

  const studyTips = [
    {
      category: "Time Management",
      tips: [
        "Aim for 1.25 minutes per question on average",
        "Skip difficult questions and return later",
        "Use process of elimination strategically",
        "Practice with a timer regularly"
      ]
    },
    {
      category: "Problem-Solving Strategies", 
      tips: [
        "Read questions carefully twice before solving",
        "Identify what's being asked before calculating",
        "Show your work clearly and systematically",
        "Check your answers when time permits"
      ]
    },
    {
      category: "Test Day Preparation",
      tips: [
        "Bring a backup calculator and extra batteries",
        "Get a good night's sleep before the test",
        "Eat a nutritious breakfast on test day",
        "Arrive at the test center early"
      ]
    },
    {
      category: "Common Mistakes to Avoid",
      tips: [
        "Don't make careless arithmetic errors",
        "Watch out for negative signs in equations",
        "Be careful with units and conversions",
        "Double-check circle vs. radius problems"
      ]
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
              <Link to="/class-signup" className="text-gray-600 hover:text-blue-600 transition-colors">Classes</Link>
              <Button variant="outline">Sign In</Button>
              <Button asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Resources</h1>
          <p className="text-xl text-gray-600">Download comprehensive materials to accelerate your SAT Math preparation</p>
        </div>

        {/* Downloadable Resources */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Download Center</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.map((resource, index) => {
              const IconComponent = resource.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg">{resource.title}</CardTitle>
                    <CardDescription>{resource.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{resource.type}</span>
                        <span>{resource.size}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">{resource.downloads} downloads</span>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDownload(resource.title)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Study Tips & Strategies */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Tips & Strategies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {studyTips.map((section, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    <span>{section.category}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start space-x-2">
                        <div className="h-1.5 w-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Score Improvement Guide */}
        <Card className="bg-gradient-to-r from-green-500 to-blue-600 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Score Improvement Roadmap</CardTitle>
            <CardDescription className="text-green-100">
              Follow this structured approach to maximize your SAT Math score
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-white/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Diagnostic Assessment</h3>
                <p className="text-sm text-white/90">Take a practice test to identify your strengths and weaknesses</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Targeted Practice</h3>
                <p className="text-sm text-white/90">Focus on your weak areas while maintaining your strengths</p>
              </div>
              <div className="text-center">
                <div className="bg-white/20 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Test Strategy</h3>
                <p className="text-sm text-white/90">Master time management and test-taking strategies</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/class-signup">Get Personalized Guidance</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Resources;
