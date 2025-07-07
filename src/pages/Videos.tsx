
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Play, Clock, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Videos = () => {
  const [selectedVideo, setSelectedVideo] = useState<number | null>(null);

  const videoCategories = [
    {
      title: "Algebra Fundamentals",
      description: "Master linear equations, inequalities, and systems",
      videos: 15,
      thumbnail: "🔢",
      duration: "45 min",
      level: "Beginner"
    },
    {
      title: "Quadratic Functions",
      description: "Solve quadratic equations and analyze parabolas",
      videos: 12,
      thumbnail: "📈",
      duration: "38 min",
      level: "Intermediate"
    },
    {
      title: "Geometry Essentials",
      description: "Areas, perimeters, and geometric relationships",
      videos: 18,
      thumbnail: "📐",
      duration: "52 min",
      level: "Beginner"
    },
    {
      title: "Trigonometry Basics",
      description: "Sine, cosine, tangent, and their applications",
      videos: 10,
      thumbnail: "📊",
      duration: "30 min",
      level: "Intermediate"
    },
    {
      title: "Data Analysis",
      description: "Statistics, probability, and data interpretation",
      videos: 14,
      thumbnail: "📋",
      duration: "42 min",
      level: "Beginner"
    },
    {
      title: "Advanced Topics",
      description: "Complex numbers, logarithms, and advanced functions",
      videos: 8,
      thumbnail: "🔬",
      duration: "35 min",
      level: "Advanced"
    }
  ];

  const featuredVideos = [
    {
      title: "Solving Complex Quadratics",
      description: "Learn advanced techniques for tackling difficult quadratic problems",
      duration: "12:45",
      views: "2.1K",
      instructor: "Shashwat Singh"
    },
    {
      title: "Geometry Shortcuts for SAT",
      description: "Time-saving tricks for common geometry problems",
      duration: "8:30",
      views: "1.8K", 
      instructor: "Shashwat Singh"
    },
    {
      title: "Statistics Made Simple",
      description: "Master data analysis and probability questions",
      duration: "15:20",
      views: "1.5K",
      instructor: "Shashwat Singh"
    }
  ];

  const handleVideoPlay = (index: number) => {
    setSelectedVideo(index);
  };

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Video Library</h1>
          <p className="text-xl text-gray-600">Expert instruction videos for every SAT Math topic</p>
        </div>

        {/* Featured Video Player */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Featured: {featuredVideos[selectedVideo || 0].title}</CardTitle>
            <CardDescription>{featuredVideos[selectedVideo || 0].description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-center text-white">
                <div className="mb-4">
                  <Play className="h-20 w-20 mx-auto text-white/80 hover:text-white cursor-pointer transition-colors" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{featuredVideos[selectedVideo || 0].title}</h3>
                <div className="flex items-center justify-center space-x-6 text-sm text-white/80">
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {featuredVideos[selectedVideo || 0].duration}
                  </span>
                  <span className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {featuredVideos[selectedVideo || 0].views} views
                  </span>
                  <span>By {featuredVideos[selectedVideo || 0].instructor}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          </CardContent>
        </Card>

        {/* Video Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Topic</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="text-4xl mb-4 text-center">{category.thumbnail}</div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors text-center">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-center">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center text-gray-600">
                        <Play className="h-4 w-4 mr-1" />
                        {category.videos} videos
                      </span>
                      <span className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-1" />
                        {category.duration}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        category.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {category.level}
                      </span>
                      <Button variant="ghost" size="sm" className="group-hover:bg-blue-50">
                        Watch Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Videos List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Videos</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredVideos.map((video, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => handleVideoPlay(index)}
              >
                <CardHeader>
                  <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 relative overflow-hidden">
                    <Play className="h-12 w-12 text-blue-600 group-hover:scale-110 transition-transform" />
                    <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardTitle className="group-hover:text-blue-600 transition-colors text-lg">
                    {video.title}
                  </CardTitle>
                  <CardDescription>{video.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {video.views} views
                    </span>
                    <span>By {video.instructor}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardContent className="text-center py-12">
            <CheckCircle className="h-16 w-16 mx-auto mb-4 text-white/80" />
            <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
            <p className="text-lg mb-6 text-white/90">
              Get full access to our complete video library and track your progress
            </p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Videos;
