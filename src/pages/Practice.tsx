
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, ChevronRight, Target, Trophy, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { DailyChallengeWidget } from "@/components/DailyChallengeWidget";

const Practice = () => {
  const practiceCategories = [
    {
      title: "Algebra & Functions",
      description: "Linear equations, quadratics, and function analysis",
      questions: 25,
      difficulty: "Beginner to Advanced",
      icon: "📊"
    },
    {
      title: "Geometry & Trigonometry", 
      description: "Shapes, angles, and trigonometric relationships",
      questions: 20,
      difficulty: "Intermediate",
      icon: "📐"
    },
    {
      title: "Data Analysis & Statistics",
      description: "Probability, statistics, and data interpretation",
      questions: 18,
      difficulty: "Beginner to Intermediate", 
      icon: "📈"
    },
    {
      title: "Advanced Topics",
      description: "Complex numbers, polynomials, and advanced functions",
      questions: 15,
      difficulty: "Advanced",
      icon: "🔬"
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
              <Link to="/practice" className="text-blue-600 font-semibold">Practice</Link>
              <Link to="/videos" className="text-gray-600 hover:text-blue-600 transition-colors">Videos</Link>
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice Portal</h1>
          <p className="text-xl text-gray-600">Master SAT Math through interactive practice and instant feedback</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Daily Challenge - Full Width */}
          <div className="lg:col-span-3">
            <DailyChallengeWidget />
          </div>
        </div>

        {/* Practice Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Practice by Topic</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {practiceCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-3xl mb-3">{category.icon}</div>
                      <CardTitle className="group-hover:text-blue-600 transition-colors mb-2">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="mb-3">
                        {category.description}
                      </CardDescription>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {category.questions} questions
                    </span>
                    <span className="flex items-center">
                      <Target className="h-4 w-4 mr-1" />
                      {category.difficulty}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Practice Stats */}
        <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="h-6 w-6" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="text-sm opacity-90">Questions Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">0%</div>
                <div className="text-sm opacity-90">Accuracy Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">0</div>
                <div className="text-sm opacity-90">Study Streak</div>
              </div>
            </div>
            <div className="mt-6 text-center">
              <Button variant="secondary" asChild>
                <Link to="/signup">Create Account to Track Progress</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Practice;
