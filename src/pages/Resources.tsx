
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Clock, Book, Video, FileText, Download, Star, Play, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";

const Resources = () => {
  const practiceTopics = [
    { id: 1, title: "Algebra & Functions", problems: 45, difficulty: "Mixed", description: "Linear equations, quadratics, and function analysis" },
    { id: 2, title: "Geometry & Trigonometry", problems: 38, difficulty: "Mixed", description: "Angles, triangles, circles, and basic trig" },
    { id: 3, title: "Statistics & Probability", problems: 32, difficulty: "Mixed", description: "Data analysis, distributions, and probability" },
    { id: 4, title: "Advanced Math", problems: 28, difficulty: "Hard", description: "Complex numbers, polynomials, and advanced functions" },
  ];

  const videoSeries = [
    { id: 1, title: "SAT Math Fundamentals", videos: 12, duration: "3.5 hours", level: "Beginner" },
    { id: 2, title: "Problem-Solving Strategies", videos: 8, duration: "2.2 hours", level: "Intermediate" },
    { id: 3, title: "Advanced Concepts", videos: 15, duration: "4.1 hours", level: "Advanced" },
    { id: 4, title: "Test-Taking Tips", videos: 6, duration: "1.8 hours", level: "All Levels" },
  ];

  const studyMaterials = [
    { title: "Complete Formula Sheet", type: "PDF", size: "2.3 MB", description: "All essential SAT Math formulas" },
    { title: "Practice Test #1", type: "PDF", size: "4.1 MB", description: "Full-length practice exam with solutions" },
    { title: "Quick Reference Guide", type: "PDF", size: "1.8 MB", description: "Key concepts and shortcuts" },
    { title: "Calculator Tips", type: "PDF", size: "1.2 MB", description: "Effective calculator usage strategies" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">SAT Math Resources</h2>
            <p className="text-xl text-gray-600">Everything you need to master SAT Math - practice, videos, and study materials</p>
          </div>

          {/* Practice by Topic Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                Practice by Topic
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {practiceTopics.map((topic) => (
                <Card key={topic.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant={topic.difficulty === 'Hard' ? 'destructive' : 'secondary'}>
                        {topic.difficulty}
                      </Badge>
                      <span className="text-sm text-gray-500">{topic.problems} problems</span>
                    </div>
                    <CardTitle className="text-lg">{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to="/practice-by-topic">
                        <Play className="h-4 w-4 mr-2" />
                        Start Practice
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Video Library Section */}
          <section className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <Video className="h-6 w-6 text-green-600 mr-2" />
                Video Library
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {videoSeries.map((series) => (
                <Card key={series.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{series.level}</Badge>
                      <span className="text-sm text-gray-500">{series.videos} videos</span>
                    </div>
                    <CardTitle className="text-lg">{series.title}</CardTitle>
                    <CardDescription>Duration: {series.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Play className="h-4 w-4 mr-2" />
                      Watch Series
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Study Materials Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                <FileText className="h-6 w-6 text-purple-600 mr-2" />
                Study Materials
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {studyMaterials.map((material, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary">{material.type}</Badge>
                      <span className="text-sm text-gray-500">{material.size}</span>
                    </div>
                    <CardTitle className="text-lg">{material.title}</CardTitle>
                    <CardDescription>{material.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Resources;
