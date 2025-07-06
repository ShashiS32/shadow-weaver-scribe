
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, CheckCircle, XCircle } from "lucide-react";
import { useDailyChallenge } from "./DailyChallenge";
import { useToast } from "@/hooks/use-toast";

export const DailyChallengeWidget = () => {
  const challenge = useDailyChallenge();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    const correct = selectedAnswer === challenge.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    toast({
      title: correct ? "Correct!" : "Incorrect",
      description: correct ? "Great job! Keep practicing." : challenge.explanation,
      variant: correct ? "default" : "destructive",
    });
  };

  const resetChallenge = () => {
    setSelectedAnswer("");
    setShowResult(false);
    setIsCorrect(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-blue-600" />
          <span>Today's Challenge</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-lg font-medium mb-4">{challenge.question}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {challenge.options.map((option) => (
              <button
                key={option}
                onClick={() => !showResult && setSelectedAnswer(option)}
                disabled={showResult}
                className={`p-3 text-left rounded-lg border transition-colors ${
                  selectedAnswer === option
                    ? showResult
                      ? option === challenge.correctAnswer
                        ? "border-green-500 bg-green-50"
                        : "border-red-500 bg-red-50"
                      : "border-blue-500 bg-blue-50"
                    : showResult && option === challenge.correctAnswer
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 hover:border-gray-300"
                } ${showResult ? "cursor-not-allowed" : "cursor-pointer"}`}
              >
                <div className="flex items-center justify-between">
                  <span>{option}</span>
                  {showResult && option === challenge.correctAnswer && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                  {showResult && selectedAnswer === option && option !== challenge.correctAnswer && (
                    <XCircle className="h-4 w-4 text-red-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
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
            <Button onClick={resetChallenge} variant="outline">
              Try Another Challenge
            </Button>
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
              <strong>Explanation:</strong> {challenge.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
