
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";

const PracticeByTopic = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentProblem, setCurrentProblem] = useState(0);
  const { toast } = useToast();

  const problems = [
    {
      id: 1,
      topic: "Algebra",
      difficulty: "Medium",
      question: "If 3x + 7 = 25, what is the value of x?",
      options: ["A) 4", "B) 6", "C) 8", "D) 10"],
      correctAnswer: "B) 6",
      explanation: "Subtract 7 from both sides: 3x = 18. Then divide by 3: x = 6."
    },
    {
      id: 2,
      topic: "Geometry",
      difficulty: "Hard",
      question: "What is the area of a circle with radius 6?",
      options: ["A) 12π", "B) 24π", "C) 36π", "D) 72π"],
      correctAnswer: "C) 36π",
      explanation: "Area of a circle = πr². With r = 6, Area = π(6)² = 36π."
    },
    {
      id: 3,
      topic: "Statistics",
      difficulty: "Medium",
      question: "What is the median of the data set: 5, 12, 8, 15, 7, 10, 9?",
      options: ["A) 8", "B) 9", "C) 10", "D) 12"],
      correctAnswer: "B) 9",
      explanation: "First arrange in order: 5, 7, 8, 9, 10, 12, 15. The median is the middle value: 9."
    },
    {
      id: 4,
      topic: "Advanced Math",
      difficulty: "Hard",
      question: "If log₂(x) = 5, what is x?",
      options: ["A) 10", "B) 16", "C) 25", "D) 32"],
      correctAnswer: "D) 32",
      explanation: "If log₂(x) = 5, then x = 2⁵ = 32."
    },
    {
      id: 5,
      topic: "Algebra",
      difficulty: "Easy",
      question: "What is 30% of 80?",
      options: ["A) 20", "B) 24", "C) 26", "D) 28"],
      correctAnswer: "B) 24",
      explanation: "30% of 80 = 0.30 × 80 = 24."
    }
  ];

  const currentQ = problems[currentProblem];

  const handleSubmit = () => {
    const correct = selectedAnswer === currentQ.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    toast({
      title: correct ? "Correct!" : "Incorrect",
      description: correct ? "Great job! Keep practicing." : currentQ.explanation,
      variant: correct ? "default" : "destructive",
    });
  };

  const nextProblem = () => {
    if (currentProblem < problems.length - 1) {
      setCurrentProblem(currentProblem + 1);
      setSelectedAnswer("");
      setShowResult(false);
      setIsCorrect(false);
    }
  };

  const resetProblem = () => {
    setSelectedAnswer("");
    setShowResult(false);
    setIsCorrect(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />

      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Button asChild variant="outline" className="mr-4">
              <Link to="/resources">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Resources
              </Link>
            </Button>
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Practice by Topic</h2>
              <p className="text-gray-600">Problem {currentProblem + 1} of {problems.length}</p>
            </div>
          </div>

          <Card className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Badge className={getDifficultyColor(currentQ.difficulty)}>
                    {currentQ.difficulty}
                  </Badge>
                  <Badge variant="outline">{currentQ.topic}</Badge>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  Problem #{currentQ.id}
                </div>
              </div>
              <CardTitle className="text-xl">{currentQ.question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentQ.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => !showResult && setSelectedAnswer(option)}
                    disabled={showResult}
                    className={`p-3 text-left rounded-lg border transition-colors ${
                      selectedAnswer === option
                        ? showResult
                          ? option === currentQ.correctAnswer
                            ? "border-green-500 bg-green-50"
                            : "border-red-500 bg-red-50"
                          : "border-blue-500 bg-blue-50"
                        : showResult && option === currentQ.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && option === currentQ.correctAnswer && (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                      {showResult && selectedAnswer === option && option !== currentQ.correctAnswer && (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="flex justify-between items-center">
                {!showResult ? (
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!selectedAnswer}
                    className="px-6"
                  >
                    Submit Answer
                  </Button>
                ) : (
                  <div className="flex space-x-2">
                    <Button onClick={resetProblem} variant="outline">
                      Try Again
                    </Button>
                    {currentProblem < problems.length - 1 && (
                      <Button onClick={nextProblem}>
                        Next Problem
                      </Button>
                    )}
                  </div>
                )}
                
                {showResult && (
                  <div className={`flex items-center space-x-2 ${
                    isCorrect ? "text-green-600" : "text-red-600"
                  }`}>
                    {isCorrect ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <XCircle className="h-5 w-5" />
                    )}
                    <span className="font-medium">
                      {isCorrect ? "Correct!" : "Incorrect"}
                    </span>
                  </div>
                )}
              </div>
              
              {showResult && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Explanation:</strong> {currentQ.explanation}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PracticeByTopic;
