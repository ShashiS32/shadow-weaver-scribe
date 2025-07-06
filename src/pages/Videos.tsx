
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Videos = () => {
  const videoCategories = [
    {
      title: "Algebra Fundamentals",
      description: "Master linear equations, inequalities, and systems",
      videos: 15,
      thumbnail: "🔢"
    },
    {
      title: "Quadratic Functions",
      description: "Solve quadratic equations and analyze parabolas",
      videos: 12,
      thumbnail: "📈"
    },
    {
      title: "Geometry Basics",
      description: "Areas, perimeters, and geometric relationships",
      videos: 18,
      thumbnail: "📐"
    },
    {
      title: "Trigonometry",
      description: "Sine, cosine, tangent, and their applications",
      videos: 10,
      thumbnail: "📊"
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
              <Link to="/videos" className="text-blue-600 font-semibold">Videos</Link>
              <Link to="/resources" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</Link>
              <Button variant="outline">Sign In</Button>
              <Button>Get Started</Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Vault</h1>
          <p className="text-xl text-gray-600">Expert walkthrough videos for every SAT Math topic</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videoCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="text-4xl mb-4">{category.thumbnail}</div>
                <CardTitle className="group-hover:text-blue-600 transition-colors">
                  {category.title}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.videos} videos</span>
                  <div className="flex items-center space-x-1 text-blue-600">
                    <Play className="h-4 w-4" />
                    <span className="text-sm">Watch</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Video */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Featured Video: Solving Complex Quadratics</CardTitle>
            <CardDescription>Learn advanced techniques for tackling difficult quadratic problems</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Video Player Placeholder</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Videos;
