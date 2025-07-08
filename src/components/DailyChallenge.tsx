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
    question: "A rectangle has length 12 and width 8. What is its area?",
    options: ["A) 20", "B) 40", "C) 96", "D) 192"],
    correctAnswer: "C) 96",
    explanation: "Area of rectangle = length × width = 12 × 8 = 96."
  },
  {
    question: "If f(x) = 3x - 2, what is f(4)?",
    options: ["A) 8", "B) 10", "C) 12", "D) 14"],
    correctAnswer: "B) 10",
    explanation: "f(4) = 3(4) - 2 = 12 - 2 = 10."
  },
  {
    question: "What is 25% of 200?",
    options: ["A) 25", "B) 50", "C) 75", "D) 100"],
    correctAnswer: "B) 50",
    explanation: "25% of 200 = 0.25 × 200 = 50."
  },
  {
    question: "If x² = 49, what are the possible values of x?",
    options: ["A) 7 only", "B) -7 only", "C) 7 and -7", "D) 49"],
    correctAnswer: "C) 7 and -7",
    explanation: "Since x² = 49, x = ±√49 = ±7."
  },
  {
    question: "The circumference of a circle is 12π. What is its radius?",
    options: ["A) 3", "B) 6", "C) 12", "D) 24"],
    correctAnswer: "B) 6",
    explanation: "Circumference = 2πr, so 12π = 2πr, which gives r = 6."
  },
  {
    question: "If 5x - 3 = 2x + 9, what is x?",
    options: ["A) 2", "B) 3", "C) 4", "D) 6"],
    correctAnswer: "C) 4",
    explanation: "5x - 3 = 2x + 9. Subtract 2x: 3x - 3 = 9. Add 3: 3x = 12. So x = 4."
  },
  {
    question: "What is the y-intercept of y = 3x + 5?",
    options: ["A) 3", "B) 5", "C) -3", "D) -5"],
    correctAnswer: "B) 5",
    explanation: "In y = mx + b form, b is the y-intercept. Here b = 5."
  },
  {
    question: "If the probability of rain is 0.3, what is the probability it won't rain?",
    options: ["A) 0.3", "B) 0.6", "C) 0.7", "D) 1.3"],
    correctAnswer: "C) 0.7",
    explanation: "P(not rain) = 1 - P(rain) = 1 - 0.3 = 0.7."
  },
  {
    question: "What is the volume of a cube with side length 4?",
    options: ["A) 12", "B) 16", "C) 48", "D) 64"],
    correctAnswer: "D) 64",
    explanation: "Volume of cube = side³ = 4³ = 64."
  },
  {
    question: "If 2x + y = 8 and x = 3, what is y?",
    options: ["A) 1", "B) 2", "C) 3", "D) 5"],
    correctAnswer: "B) 2",
    explanation: "Substitute x = 3: 2(3) + y = 8, so 6 + y = 8, which gives y = 2."
  },
  {
    question: "What is the mean of 4, 8, 12, and 16?",
    options: ["A) 8", "B) 10", "C) 12", "D) 16"],
    correctAnswer: "B) 10",
    explanation: "Mean = (4 + 8 + 12 + 16) ÷ 4 = 40 ÷ 4 = 10."
  },
  {
    question: "If sin(θ) = 0.5, what is θ in degrees (0° ≤ θ ≤ 90°)?",
    options: ["A) 30°", "B) 45°", "C) 60°", "D) 90°"],
    correctAnswer: "A) 30°",
    explanation: "sin(30°) = 1/2 = 0.5."
  },
  {
    question: "What is the distance between (0, 0) and (3, 4)?",
    options: ["A) 3", "B) 4", "C) 5", "D) 7"],
    correctAnswer: "C) 5",
    explanation: "Distance = √[(3-0)² + (4-0)²] = √[9 + 16] = √25 = 5."
  },
  {
    question: "If x/3 = 8, what is x?",
    options: ["A) 3", "B) 8", "C) 11", "D) 24"],
    correctAnswer: "D) 24",
    explanation: "Multiply both sides by 3: x = 8 × 3 = 24."
  },
  {
    question: "What is 2³ × 2⁴?",
    options: ["A) 2⁷", "B) 2¹²", "C) 4⁷", "D) 16"],
    correctAnswer: "A) 2⁷",
    explanation: "When multiplying powers with same base, add exponents: 2³ × 2⁴ = 2³⁺⁴ = 2⁷."
  },
  {
    question: "A bag contains 3 red balls and 7 blue balls. What's the probability of drawing a red ball?",
    options: ["A) 3/10", "B) 7/10", "C) 3/7", "D) 1/3"],
    correctAnswer: "A) 3/10",
    explanation: "P(red) = number of red balls / total balls = 3/(3+7) = 3/10."
  },
  {
    question: "If y = x² and x = -3, what is y?",
    options: ["A) -9", "B) -6", "C) 6", "D) 9"],
    correctAnswer: "D) 9",
    explanation: "y = (-3)² = 9. Note that (-3)² = (-3) × (-3) = 9."
  },
  {
    question: "What is the sum of interior angles of a pentagon?",
    options: ["A) 360°", "B) 540°", "C) 720°", "D) 900°"],
    correctAnswer: "B) 540°",
    explanation: "Sum = (n-2) × 180° where n = number of sides. For pentagon: (5-2) × 180° = 540°."
  },
  {
    question: "If 3(x + 2) = 21, what is x?",
    options: ["A) 3", "B) 5", "C) 7", "D) 9"],
    correctAnswer: "B) 5",
    explanation: "3(x + 2) = 21. Divide by 3: x + 2 = 7. Subtract 2: x = 5."
  },
  {
    question: "What is the reciprocal of 2/5?",
    options: ["A) 5/2", "B) 2/5", "C) -2/5", "D) 10"],
    correctAnswer: "A) 5/2",
    explanation: "The reciprocal of a/b is b/a. So reciprocal of 2/5 is 5/2."
  },
  {
    question: "If a square has area 36, what is its perimeter?",
    options: ["A) 6", "B) 12", "C) 18", "D) 24"],
    correctAnswer: "D) 24",
    explanation: "If area = 36, then side = √36 = 6. Perimeter = 4 × side = 4 × 6 = 24."
  },
  {
    question: "What is 40% more than 50?",
    options: ["A) 60", "B) 70", "C) 90", "D) 200"],
    correctAnswer: "B) 70",
    explanation: "40% of 50 = 0.4 × 50 = 20. So 40% more than 50 = 50 + 20 = 70."
  },
  {
    question: "If log₁₀(x) = 2, what is x?",
    options: ["A) 2", "B) 10", "C) 20", "D) 100"],
    correctAnswer: "D) 100",
    explanation: "If log₁₀(x) = 2, then x = 10² = 100."
  },
  {
    question: "What is the midpoint of the line segment from (2, 3) to (8, 7)?",
    options: ["A) (5, 5)", "B) (6, 5)", "C) (5, 6)", "D) (10, 10)"],
    correctAnswer: "A) (5, 5)",
    explanation: "Midpoint = ((x₁+x₂)/2, (y₁+y₂)/2) = ((2+8)/2, (3+7)/2) = (5, 5)."
  },
  {
    question: "If x² - 5x + 6 = 0, what are the values of x?",
    options: ["A) 2 and 3", "B) 1 and 6", "C) -2 and -3", "D) 5 and 6"],
    correctAnswer: "A) 2 and 3",
    explanation: "Factor: (x-2)(x-3) = 0. So x = 2 or x = 3."
  },
  {
    question: "What is the range of the function f(x) = x² for x ≥ 0?",
    options: ["A) All real numbers", "B) x ≥ 0", "C) y ≥ 0", "D) y ≤ 0"],
    correctAnswer: "C) y ≥ 0",
    explanation: "Since x ≥ 0 and f(x) = x², the output y = x² ≥ 0."
  },
  {
    question: "If cos(θ) = 0.8, what is sin²(θ) + cos²(θ)?",
    options: ["A) 0.64", "B) 0.8", "C) 1", "D) 1.6"],
    correctAnswer: "C) 1",
    explanation: "By the Pythagorean identity, sin²(θ) + cos²(θ) = 1 for any angle θ."
  },
  {
    question: "A number is decreased by 25% to get 60. What was the original number?",
    options: ["A) 45", "B) 75", "C) 80", "D) 85"],
    correctAnswer: "C) 80",
    explanation: "If x is decreased by 25%, we get 0.75x = 60. So x = 60/0.75 = 80."
  },
  {
    question: "What is the coefficient of x² in the expansion of (x + 2)³?",
    options: ["A) 2", "B) 4", "C) 6", "D) 8"],
    correctAnswer: "C) 6",
    explanation: "(x + 2)³ = x³ + 3x²(2) + 3x(2²) + 2³ = x³ + 6x² + 12x + 8. Coefficient of x² is 6."
  },
  {
    question: "If the ratio of boys to girls in a class is 3:4 and there are 21 students total, how many boys are there?",
    options: ["A) 7", "B) 9", "C) 12", "D) 15"],
    correctAnswer: "B) 9",
    explanation: "Ratio 3:4 means 3+4=7 parts total. Boys = (3/7) × 21 = 9."
  },
  {
    question: "What is the vertex of the parabola y = x² - 4x + 3?",
    options: ["A) (2, -1)", "B) (-2, 1)", "C) (2, 1)", "D) (4, 3)"],
    correctAnswer: "A) (2, -1)",
    explanation: "For y = ax² + bx + c, vertex x = -b/(2a) = -(-4)/(2×1) = 2. Then y = 4 - 8 + 3 = -1."
  },
  {
    question: "If |x - 3| = 5, what are the possible values of x?",
    options: ["A) 8 only", "B) -2 only", "C) 8 and -2", "D) 3 and 5"],
    correctAnswer: "C) 8 and -2",
    explanation: "|x - 3| = 5 means x - 3 = 5 or x - 3 = -5. So x = 8 or x = -2."
  },
  {
    question: "What is the slope of a line perpendicular to y = 2x + 1?",
    options: ["A) 2", "B) -2", "C) 1/2", "D) -1/2"],
    correctAnswer: "D) -1/2",
    explanation: "Perpendicular lines have slopes that are negative reciprocals. Slope of y = 2x + 1 is 2, so perpendicular slope is -1/2."
  },
  {
    question: "If 3ˣ = 81, what is x?",
    options: ["A) 3", "B) 4", "C) 27", "D) 81"],
    correctAnswer: "B) 4",
    explanation: "Since 81 = 3⁴, we have 3ˣ = 3⁴, so x = 4."
  },
  {
    question: "What is the area of a triangle with base 8 and height 6?",
    options: ["A) 14", "B) 24", "C) 28", "D) 48"],
    correctAnswer: "B) 24",
    explanation: "Area of triangle = (1/2) × base × height = (1/2) × 8 × 6 = 24."
  },
  {
    question: "If f(x) = 2x + 3 and g(x) = x - 1, what is f(g(2))?",
    options: ["A) 3", "B) 5", "C) 7", "D) 9"],
    correctAnswer: "B) 5",
    explanation: "First find g(2) = 2 - 1 = 1. Then f(g(2)) = f(1) = 2(1) + 3 = 5."
  },
  {
    question: "What is the sum of the first 5 positive integers?",
    options: ["A) 10", "B) 15", "C) 20", "D) 25"],
    correctAnswer: "B) 15",
    explanation: "1 + 2 + 3 + 4 + 5 = 15. Or use formula: n(n+1)/2 = 5(6)/2 = 15."
  },
  {
    question: "If a line has x-intercept 4 and y-intercept -3, what is its equation?",
    options: ["A) 3x - 4y = 12", "B) 3x + 4y = 12", "C) 4x - 3y = 12", "D) 4x + 3y = 12"],
    correctAnswer: "A) 3x - 4y = 12",
    explanation: "Using intercept form: x/4 + y/(-3) = 1. Multiply by 12: 3x - 4y = 12."
  },
  {
    question: "What is the domain of f(x) = 1/(x - 2)?",
    options: ["A) All real numbers", "B) x ≠ 0", "C) x ≠ 2", "D) x > 2"],
    correctAnswer: "C) x ≠ 2",
    explanation: "The function is undefined when the denominator equals zero, i.e., when x - 2 = 0 or x = 2."
  },
  {
    question: "What is 15% of 80?",
    options: ["A) 10", "B) 12", "C) 15", "D) 20"],
    correctAnswer: "B) 12",
    explanation: "15% of 80 = 0.15 × 80 = 12."
  },
  {
    question: "If the side of a regular hexagon is 6, what is its perimeter?",
    options: ["A) 24", "B) 30", "C) 36", "D) 42"],
    correctAnswer: "C) 36",
    explanation: "A regular hexagon has 6 equal sides. Perimeter = 6 × 6 = 36."
  },
  {
    question: "What is the next term in the arithmetic sequence: 7, 12, 17, 22, ...?",
    options: ["A) 25", "B) 27", "C) 29", "D) 32"],
    correctAnswer: "B) 27",
    explanation: "Common difference = 12 - 7 = 5. Next term = 22 + 5 = 27."
  },
  {
    question: "If x + y = 10 and x - y = 4, what is x?",
    options: ["A) 3", "B) 6", "C) 7", "D) 14"],
    correctAnswer: "C) 7",
    explanation: "Add the equations: (x + y) + (x - y) = 10 + 4, so 2x = 14, thus x = 7."
  },
  {
    question: "What is the surface area of a cube with side length 3?",
    options: ["A) 27", "B) 36", "C) 54", "D) 81"],
    correctAnswer: "C) 54",
    explanation: "A cube has 6 faces, each with area 3² = 9. Total surface area = 6 × 9 = 54."
  },
  {
    question: "If tan(θ) = 3/4, what is the value of sin(θ)/cos(θ)?",
    options: ["A) 3/4", "B) 4/3", "C) 7", "D) 12"],
    correctAnswer: "A) 3/4",
    explanation: "By definition, tan(θ) = sin(θ)/cos(θ), so sin(θ)/cos(θ) = 3/4."
  },
  {
    question: "What is the greatest common divisor of 24 and 36?",
    options: ["A) 6", "B) 8", "C) 12", "D) 18"],
    correctAnswer: "C) 12",
    explanation: "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24. Factors of 36: 1, 2, 3, 4, 6, 9, 12, 18, 36. GCD = 12."
  },
  {
    question: "If a rectangle has length twice its width and perimeter 36, what is its width?",
    options: ["A) 6", "B) 9", "C) 12", "D) 18"],
    correctAnswer: "A) 6",
    explanation: "Let width = w, length = 2w. Perimeter = 2(w + 2w) = 6w = 36, so w = 6."
  },
  {
    question: "What is the value of (√16)(√25)?",
    options: ["A) √41", "B) 20", "C) 9", "D) 41"],
    correctAnswer: "B) 20",
    explanation: "(√16)(√25) = 4 × 5 = 20."
  },
  {
    question: "If 2x - 3y = 6 and x = 0, what is y?",
    options: ["A) -2", "B) -1", "C) 1", "D) 2"],
    correctAnswer: "A) -2",
    explanation: "Substitute x = 0: 2(0) - 3y = 6, so -3y = 6, thus y = -2."
  },
  {
    question: "What is the mode of the data set: 3, 5, 7, 5, 9, 5, 2?",
    options: ["A) 3", "B) 5", "C) 7", "D) 9"],
    correctAnswer: "B) 5",
    explanation: "The mode is the most frequently occurring value. 5 appears 3 times, more than any other number."
  },
  {
    question: "If f(x) = x³, what is f(-2)?",
    options: ["A) -8", "B) -6", "C) 6", "D) 8"],
    correctAnswer: "A) -8",
    explanation: "f(-2) = (-2)³ = (-2) × (-2) × (-2) = -8."
  },
  {
    question: "What is the equation of a line with slope 3 passing through (1, 2)?",
    options: ["A) y = 3x - 1", "B) y = 3x + 2", "C) y = 3x - 5", "D) y = x + 2"],
    correctAnswer: "A) y = 3x - 1",
    explanation: "Using point-slope form: y - 2 = 3(x - 1), so y - 2 = 3x - 3, thus y = 3x - 1."
  },
  {
    question: "If a coin is flipped 3 times, what's the probability of getting exactly 2 heads?",
    options: ["A) 1/8", "B) 2/8", "C) 3/8", "D) 4/8"],
    correctAnswer: "C) 3/8",
    explanation: "Possible outcomes with exactly 2 heads: HHT, HTH, THH. That's 3 out of 8 total outcomes."
  },
  {
    question: "What is the inverse of the function f(x) = 2x + 4?",
    options: ["A) f⁻¹(x) = (x - 4)/2", "B) f⁻¹(x) = (x + 4)/2", "C) f⁻¹(x) = 2x - 4", "D) f⁻¹(x) = x/2 + 4"],
    correctAnswer: "A) f⁻¹(x) = (x - 4)/2",
    explanation: "Let y = 2x + 4. Solve for x: y - 4 = 2x, so x = (y - 4)/2. Therefore f⁻¹(x) = (x - 4)/2."
  },
  {
    question: "What is the sum of angles in a quadrilateral?",
    options: ["A) 180°", "B) 270°", "C) 360°", "D) 450°"],
    correctAnswer: "C) 360°",
    explanation: "Sum of interior angles = (n-2) × 180° where n = 4. So (4-2) × 180° = 360°."
  },
  {
    question: "If 5! = 120, what is 6!?",
    options: ["A) 600", "B) 720", "C) 840", "D) 1440"],
    correctAnswer: "B) 720",
    explanation: "6! = 6 × 5! = 6 × 120 = 720."
  },
  {
    question: "What is the standard deviation of the data set {2, 4, 6} if the mean is 4?",
    options: ["A) 2", "B) √2", "C) 2√2/3", "D) 4"],
    correctAnswer: "C) 2√2/3",
    explanation: "Variance = [(2-4)² + (4-4)² + (6-4)²]/3 = [4 + 0 + 4]/3 = 8/3. Standard deviation = √(8/3) = 2√2/3."
  },
  {
    question: "If matrix A = [2 3; 1 4], what is det(A)?",
    options: ["A) 5", "B) 8", "C) 10", "D) 11"],
    correctAnswer: "A) 5",
    explanation: "For 2×2 matrix [a b; c d], determinant = ad - bc = (2)(4) - (3)(1) = 8 - 3 = 5."
  },
  {
    question: "What is the limit of (x² - 1)/(x - 1) as x approaches 1?",
    options: ["A) 0", "B) 1", "C) 2", "D) undefined"],
    correctAnswer: "C) 2",
    explanation: "Factor: (x² - 1)/(x - 1) = (x + 1)(x - 1)/(x - 1) = x + 1. As x → 1, limit = 1 + 1 = 2."
  },
  {
    question: "If i² = -1, what is (2 + 3i)(1 - i)?",
    options: ["A) 5 + i", "B) 5 - i", "C) -1 + i", "D) -1 - i"],
    correctAnswer: "A) 5 + i",
    explanation: "(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i² = 2 + i - 3(-1) = 2 + i + 3 = 5 + i."
  },
  {
    question: "What is the derivative of f(x) = x³ + 2x²?",
    options: ["A) 3x² + 2x", "B) 3x² + 4x", "C) x⁴ + 2x³", "D) 3x + 4"],
    correctAnswer: "B) 3x² + 4x",
    explanation: "Using power rule: d/dx(x³) = 3x² and d/dx(2x²) = 4x. So f'(x) = 3x² + 4x."
  },
  {
    question: "What is ∫(2x + 1)dx?",
    options: ["A) x² + x + C", "B) x² + x", "C) 2x² + x + C", "D) x² + C"],
    correctAnswer: "A) x² + x + C",
    explanation: "∫(2x + 1)dx = ∫2x dx + ∫1 dx = x² + x + C."
  },
  {
    question: "If log₂(8) = 3, what is log₂(16)?",
    options: ["A) 3", "B) 4", "C) 8", "D) 16"],
    correctAnswer: "B) 4",
    explanation: "Since 16 = 2⁴, we have log₂(16) = 4."
  },
  {
    question: "What is the nth term of the geometric sequence 2, 6, 18, 54, ...?",
    options: ["A) 2 × 3ⁿ", "B) 2 × 3ⁿ⁻¹", "C) 6 × 3ⁿ", "D) 3ⁿ⁺¹"],
    correctAnswer: "B) 2 × 3ⁿ⁻¹",
    explanation: "First term a = 2, common ratio r = 3. nth term = a × rⁿ⁻¹ = 2 × 3ⁿ⁻¹."
  },
  {
    question: "What is the contrapositive of 'If p, then q'?",
    options: ["A) If q, then p", "B) If not p, then not q", "C) If not q, then not p", "D) Not p and not q"],
    correctAnswer: "C) If not q, then not p",
    explanation: "The contrapositive of 'If p, then q' is 'If not q, then not p'."
  },
  {
    question: "If f(x) = eˣ, what is f'(x)?",
    options: ["A) x eˣ⁻¹", "B) eˣ", "C) ln(x)", "D) 1/x"],
    correctAnswer: "B) eˣ",
    explanation: "The derivative of eˣ is eˣ itself."
  },
  {
    question: "What is the value of C(5,2), the number of ways to choose 2 items from 5?",
    options: ["A) 10", "B) 20", "C) 25", "D) 120"],
    correctAnswer: "A) 10",
    explanation: "C(5,2) = 5!/(2!(5-2)!) = 5!/(2!×3!) = (5×4)/(2×1) = 10."
  },
  {
    question: "If the radius of a sphere is doubled, by what factor does its volume increase?",
    options: ["A) 2", "B) 4", "C) 6", "D) 8"],
    correctAnswer: "D) 8",
    explanation: "Volume = (4/3)πr³. If radius doubles to 2r, new volume = (4/3)π(2r)³ = 8 × (4/3)πr³."
  },
  {
    question: "What is the solution to the inequality 2x - 5 < 3?",
    options: ["A) x < 4", "B) x > 4", "C) x < -1", "D) x > -1"],
    correctAnswer: "A) x < 4",
    explanation: "2x - 5 < 3. Add 5: 2x < 8. Divide by 2: x < 4."
  },
  {
    question: "If vectors u = (3, 4) and v = (1, 2), what is u · v?",
    options: ["A) 7", "B) 11", "C) 14", "D) 24"],
    correctAnswer: "B) 11",
    explanation: "Dot product u · v = (3)(1) + (4)(2) = 3 + 8 = 11."
  },
  {
    question: "What is the period of the function f(x) = sin(3x)?",
    options: ["A) π/3", "B) 2π/3", "C) π", "D) 2π"],
    correctAnswer: "B) 2π/3",
    explanation: "For sin(kx), period = 2π/k. Here k = 3, so period = 2π/3."
  },
  {
    question: "If a parabola opens upward and has vertex at (2, -3), what is its minimum value?",
    options: ["A) -3", "B) 2", "C) -1", "D) 5"],
    correctAnswer: "A) -3",
    explanation: "For an upward-opening parabola, the minimum value occurs at the vertex. The y-coordinate of the vertex is -3."
  },
  {
    question: "What is the amplitude of the function f(x) = 4sin(2x) + 1?",
    options: ["A) 1", "B) 2", "C) 4", "D) 5"],
    correctAnswer: "C) 4",
    explanation: "For f(x) = A sin(Bx) + C, the amplitude is |A|. Here A = 4, so amplitude = 4."
  },
  {
    question: "If P(A) = 0.3 and P(B) = 0.4, and A and B are mutually exclusive, what is P(A ∪ B)?",
    options: ["A) 0.12", "B) 0.7", "C) 0.1", "D) 1.0"],
    correctAnswer: "B) 0.7",
    explanation: "For mutually exclusive events, P(A ∪ B) = P(A) + P(B) = 0.3 + 0.4 = 0.7."
  },
  {
    question: "What is the eccentricity of a circle?",
    options: ["A) 0", "B) 1", "C) √2", "D) ∞"],
    correctAnswer: "A) 0",
    explanation: "A circle has eccentricity 0 because it's a special case of an ellipse where both foci coincide at the center."
  },
  {
    question: "If the half-life of a substance is 10 years, what fraction remains after 30 years?",
    options: ["A) 1/3", "B) 1/4", "C) 1/8", "D) 1/16"],
    correctAnswer: "C) 1/8",
    explanation: "After 30 years = 3 half-lives, fraction remaining = (1/2)³ = 1/8."
  },
  {
    question: "What is the sum of the infinite geometric series 1 + 1/2 + 1/4 + 1/8 + ...?",
    options: ["A) 1", "B) 2", "C) 3", "D) ∞"],
    correctAnswer: "B) 2",
    explanation: "For |r| < 1, sum = a/(1-r) where a = 1, r = 1/2. Sum = 1/(1-1/2) = 1/(1/2) = 2."
  },
  {
    question: "If f(x) = ln(x), what is f'(x)?",
    options: ["A) 1/x", "B) x", "C) ln(x)", "D) e^x"],
    correctAnswer: "A) 1/x",
    explanation: "The derivative of ln(x) is 1/x."
  },
  {
    question: "What is the area under the curve y = x from x = 0 to x = 2?",
    options: ["A) 1", "B) 2", "C) 3", "D) 4"],
    correctAnswer: "B) 2",
    explanation: "∫₀² x dx = [x²/2]₀² = 4/2 - 0 = 2."
  },
  {
    question: "If z = 3 + 4i, what is |z|?",
    options: ["A) 3", "B) 4", "C) 5", "D) 7"],
    correctAnswer: "C) 5",
    explanation: "For complex number z = a + bi, |z| = √(a² + b²) = √(3² + 4²) = √25 = 5."
  },
  {
    question: "What is the Taylor series expansion of e^x centered at x = 0?",
    options: ["A) Σ xⁿ/n!", "B) Σ xⁿ", "C) Σ n!xⁿ", "D) Σ xⁿ/n"],
    correctAnswer: "A) Σ xⁿ/n!",
    explanation: "The Taylor series for e^x is 1 + x + x²/2! + x³/3! + ... = Σ xⁿ/n!."
  },
  {
    question: "If a hyperbola has equation x²/9 - y²/4 = 1, what are the slopes of its asymptotes?",
    options: ["A) ±2/3", "B) ±3/2", "C) ±9/4", "D) ±4/9"],
    correctAnswer: "A) ±2/3",
    explanation: "For hyperbola x²/a² - y²/b² = 1, asymptotes have slopes ±b/a = ±√4/√9 = ±2/3."
  },
  {
    question: "What is the Wronskian of functions e^x and e^(2x)?",
    options: ["A) e^x", "B) e^(2x)", "C) e^(3x)", "D) 2e^(3x)"],
    correctAnswer: "C) e^(3x)",
    explanation: "W = |e^x  e^(2x); e^x  2e^(2x)| = e^x × 2e^(2x) - e^(2x) × e^x = 2e^(3x) - e^(3x) = e^(3x)."
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
  
  console.log(`Daily challenge for ${dateString}: Question ${index + 1} of ${challenges.length} total questions`);
  
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
