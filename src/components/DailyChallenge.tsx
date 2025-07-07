
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
  },
  {
    question: "A line passes through the origin and has a slope of 3/4. What is the equation of this line?",
    options: ["A) y = 3x + 4", "B) y = (3/4)x", "C) y = (4/3)x", "D) y = 3x - 4"],
    correctAnswer: "B) y = (3/4)x",
    explanation: "A line through the origin has the form y = mx, where m is the slope. Here m = 3/4."
  },
  {
    question: "If f(x) = 2x² - 5x + 3, what is f(2)?",
    options: ["A) 1", "B) 3", "C) 5", "D) 7"],
    correctAnswer: "A) 1",
    explanation: "f(2) = 2(2)² - 5(2) + 3 = 2(4) - 10 + 3 = 8 - 10 + 3 = 1."
  },
  {
    question: "What is the median of the data set: 5, 12, 8, 15, 7, 10, 9?",
    options: ["A) 8", "B) 9", "C) 10", "D) 12"],
    correctAnswer: "B) 9",
    explanation: "First arrange in order: 5, 7, 8, 9, 10, 12, 15. The median is the middle value: 9."
  },
  {
    question: "If the perimeter of a rectangle is 36 and its length is 12, what is its width?",
    options: ["A) 6", "B) 8", "C) 10", "D) 12"],
    correctAnswer: "A) 6",
    explanation: "Perimeter = 2(length + width). So 36 = 2(12 + width), which gives 18 = 12 + width, so width = 6."
  },
  {
    question: "What is the distance between points (1, 3) and (5, 6)?",
    options: ["A) 3", "B) 4", "C) 5", "D) 7"],
    correctAnswer: "C) 5",
    explanation: "Distance = √[(5-1)² + (6-3)²] = √[16 + 9] = √25 = 5."
  },
  {
    question: "If 4x - 3 = 2x + 7, what is the value of x?",
    options: ["A) 2", "B) 3", "C) 4", "D) 5"],
    correctAnswer: "D) 5",
    explanation: "4x - 3 = 2x + 7. Subtract 2x: 2x - 3 = 7. Add 3: 2x = 10. Divide by 2: x = 5."
  },
  {
    question: "What is 30% of 80?",
    options: ["A) 20", "B) 24", "C) 26", "D) 28"],
    correctAnswer: "B) 24",
    explanation: "30% of 80 = 0.30 × 80 = 24."
  },
  {
    question: "If sin(θ) = 3/5 and θ is in the first quadrant, what is cos(θ)?",
    options: ["A) 3/5", "B) 4/5", "C) 5/3", "D) 5/4"],
    correctAnswer: "B) 4/5",
    explanation: "Using the Pythagorean identity: sin²(θ) + cos²(θ) = 1. So cos²(θ) = 1 - (3/5)² = 1 - 9/25 = 16/25. Therefore cos(θ) = 4/5."
  },
  {
    question: "What is the y-intercept of the line 2x + 3y = 12?",
    options: ["A) 2", "B) 3", "C) 4", "D) 6"],
    correctAnswer: "C) 4",
    explanation: "To find the y-intercept, set x = 0: 2(0) + 3y = 12, so 3y = 12, and y = 4."
  },
  {
    question: "If a² + b² = 25 and a - b = 1, what is ab?",
    options: ["A) 10", "B) 11", "C) 12", "D) 13"],
    correctAnswer: "C) 12",
    explanation: "From a - b = 1, we get a = b + 1. Substituting: (b + 1)² + b² = 25. This gives b² + 2b + 1 + b² = 25, so 2b² + 2b - 24 = 0, which means b² + b - 12 = 0. Solving: b = 3 or b = -4. If b = 3, then a = 4, so ab = 12."
  },
  {
    question: "What is the area of a circle with radius 6?",
    options: ["A) 12π", "B) 24π", "C) 36π", "D) 72π"],
    correctAnswer: "C) 36π",
    explanation: "Area of a circle = πr². With r = 6, Area = π(6)² = 36π."
  },
  {
    question: "If log₂(x) = 5, what is x?",
    options: ["A) 10", "B) 16", "C) 25", "D) 32"],
    correctAnswer: "D) 32",
    explanation: "If log₂(x) = 5, then x = 2⁵ = 32."
  },
  {
    question: "What is the solution to |x - 3| = 7?",
    options: ["A) x = 10 only", "B) x = -4 only", "C) x = 10 or x = -4", "D) x = 4 or x = -10"],
    correctAnswer: "C) x = 10 or x = -4",
    explanation: "|x - 3| = 7 means x - 3 = 7 or x - 3 = -7. So x = 10 or x = -4."
  },
  {
    question: "If the sum of three consecutive integers is 48, what is the smallest integer?",
    options: ["A) 14", "B) 15", "C) 16", "D) 17"],
    correctAnswer: "B) 15",
    explanation: "Let the integers be n, n+1, n+2. Then n + (n+1) + (n+2) = 48, so 3n + 3 = 48, which gives 3n = 45, so n = 15."
  },
  {
    question: "What is the domain of f(x) = √(x - 4)?",
    options: ["A) x ≥ 0", "B) x ≥ 4", "C) x > 4", "D) All real numbers"],
    correctAnswer: "B) x ≥ 4",
    explanation: "For the square root to be defined, we need x - 4 ≥ 0, which means x ≥ 4."
  }
];

export const getDailyChallenge = (): Challenge => {
  // Get current date and create a consistent seed
  const now = new Date();
  const dateString = now.toDateString(); // This will be the same for the entire day
  
  // Create a simple hash from the date string
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Use absolute value and modulo to get a consistent index
  const index = Math.abs(hash) % challenges.length;
  
  console.log(`Daily challenge for ${dateString}: Question ${index + 1}`);
  
  return challenges[index];
};

export const useDailyChallenge = () => {
  const [challenge, setChallenge] = useState<Challenge>(getDailyChallenge());

  useEffect(() => {
    // Check for new day every hour
    const checkForNewDay = () => {
      const newChallenge = getDailyChallenge();
      if (newChallenge.question !== challenge.question) {
        setChallenge(newChallenge);
        console.log('New daily challenge loaded');
      }
    };

    // Check every hour for date change
    const interval = setInterval(checkForNewDay, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [challenge.question]);

  return challenge;
};
