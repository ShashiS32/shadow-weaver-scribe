
import { useState, useEffect } from "react";

interface Challenge {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

const challenges: Challenge[] = [
  {
    question: "If 3x + 7 = 25, what is the value of x?",
    options: ["A) 4", "B) 6", "C) 8", "D) 10"],
    correctAnswer: "B) 6",
    explanation: "Subtract 7 from both sides: 3x = 18. Then divide by 3: x = 6."
  },
  {
    question: "What is the slope of the line passing through points (2, 5) and (6, 13)?",
    options: ["A) 2", "B) 4", "C) 6", "D) 8"],
    correctAnswer: "A) 2",
    explanation: "Use the slope formula: (13-5)/(6-2) = 8/4 = 2."
  },
  {
    question: "If a triangle has angles measuring 45°, 60°, and x°, what is x?",
    options: ["A) 65°", "B) 70°", "C) 75°", "D) 80°"],
    correctAnswer: "C) 75°",
    explanation: "The sum of angles in a triangle is 180°: 45° + 60° + x° = 180°, so x = 75°."
  },
  {
    question: "What is the value of √(144) + √(64)?",
    options: ["A) 18", "B) 20", "C) 22", "D) 24"],
    correctAnswer: "B) 20",
    explanation: "√(144) = 12 and √(64) = 8, so 12 + 8 = 20."
  },
  {
    question: "If 2^x = 32, what is x?",
    options: ["A) 4", "B) 5", "C) 6", "D) 7"],
    correctAnswer: "B) 5",
    explanation: "2^5 = 32, so x = 5."
  }
];

export const getDailyChallenge = (): Challenge => {
  // Get current date in EST
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const est = new Date(utc + (-5 * 3600000)); // EST is UTC-5
  
  // Use the day of year to select a challenge
  const start = new Date(est.getFullYear(), 0, 0);
  const diff = est.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  // Cycle through challenges based on day of year
  return challenges[dayOfYear % challenges.length];
};

export const useDailyChallenge = () => {
  const [challenge, setChallenge] = useState<Challenge>(getDailyChallenge());

  useEffect(() => {
    const checkForNewDay = () => {
      const newChallenge = getDailyChallenge();
      if (newChallenge.question !== challenge.question) {
        setChallenge(newChallenge);
      }
    };

    // Check every minute for date change
    const interval = setInterval(checkForNewDay, 60000);
    
    return () => clearInterval(interval);
  }, [challenge.question]);

  return challenge;
};
