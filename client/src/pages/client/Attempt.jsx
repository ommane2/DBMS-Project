import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate, useParams } from "react-router-dom";

// Mock quiz data
const mockQuiz = {
  id: "1",
  title: "JavaScript Fundamentals",
  description: "Test your knowledge of JavaScript basics",
  code: "JS101",
  questions: [
    {
      id: "q1",
      questionText: "What is JavaScript?",
      options: [
        "A programming language",
        "A markup language",
        "A database system",
        "An operating system",
      ],
    },
    {
      id: "q2",
      questionText: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Object"],
    },
    {
      id: "q3",
      questionText: "What does DOM stand for?",
      options: [
        "Document Object Model",
        "Data Object Model",
        "Document Oriented Model",
        "Digital Ordinance Model",
      ],
    },
    {
      id: "q4",
      questionText:
        "Which method is used to add an element at the end of an array?",
      options: ["push()", "append()", "addToEnd()", "insert()"],
    },
    {
      id: "q5",
      questionText: "What is the correct way to write a JavaScript array?",
      options: [
        "var colors = ['red', 'green', 'blue']",
        "var colors = (1:'red', 2:'green', 3:'blue')",
        "var colors = 'red', 'green', 'blue'",
        "var colors = {red, green, blue}",
      ],
    },
  ],
  timeLimit: 10 * 60, // 10 minutes in seconds
};

export default function AttemptQuiz() {
  const navigate = useNavigate();
  const params = useParams();
  const { quizCode } = params;

  const [quiz, setQuiz] = useState(mockQuiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   // Check if participant is registered
  //   const participantId = localStorage.getItem("participantId");
  //   const participantName = localStorage.getItem("participantName");

  //   if (!participantId || !participantName) {
  //     navigate("/user/join");
  //     return;
  //   }

  //   // In a real app, you would fetch  {
  //   navigate("/user/join");
  //   return;
  // }, []);

  // In a real app, you would fetch quiz data from API here
  // const fetchQuiz = async () => {
  //   const response = await fetch(`/api/quiz/${quizCode}`)
  //   const data = await response.json()
  //   setQuiz(data)
  //   setTimeLeft(data.timeLimit)
  // }
  // fetchQuiz()

  // Timer countdown\
  useEffect(()=>{

  },[])
  const timer = setInterval(() => {
    setTimeLeft((prevTime) => {
      if (prevTime <= 1) {
        clearInterval(timer);
        // handleSubmit();
        return 0;
      }
      return prevTime - 1;
    });
  }, 1000);

  // return () => clearInterval(timer)
  // , [quizCode, router])

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < quiz.questions.length) {
      const isConfirmed = window.confirm(
        "You haven't answered all questions. Are you sure you want to submit?"
      );
      if (!isConfirmed) return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // In a real app, you would call an API to submit answers
      // const response = await fetch(`/api/quiz/${quizCode}/submit`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     participantId: localStorage.getItem('participantId'),
      //     answers
      //   })
      // })

      // if (response.ok) {
      //   router.push(`/user/quiz/${quizCode}/submitted`)
      // } else {
      //   const data = await response.json()
      //   setError(data.message || 'Failed to submit quiz')
      // }

      // For demo purposes, we'll simulate a successful submission
      setTimeout(() => {
        localStorage.setItem("quizAnswers", JSON.stringify(answers));
        navigate(`/user/quiz/${quizCode}/submitted`);
      }, 1000);
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with timer */}
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">{quiz.title}</h1>
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center rounded-full px-3 py-1 text-sm font-medium ${
                timeLeft < 60
                  ? "bg-red-100 text-red-800"
                  : "bg-violet-100 text-violet-800"
              }`}
            >
              <Clock className="mr-1 h-4 w-4" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
        <Progress value={progress} className="h-1" />
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-sm font-medium text-violet-800">
                {currentQuestionIndex + 1}
              </span>
              {currentQuestion.questionText}
            </CardTitle>
            <CardDescription>
              Question {currentQuestionIndex + 1} of {quiz.questions.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[currentQuestion.id]?.toString()}
              onValueChange={(value) =>
                handleAnswerChange(currentQuestion.id, Number.parseInt(value))
              }
              className="space-y-3"
            >
              {currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-2 rounded-md border p-3 hover:bg-gray-50"
                >
                  <RadioGroupItem
                    value={index.toString()}
                    id={`option-${index}`}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer font-normal"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <div className="flex space-x-2">
              {currentQuestionIndex === quiz.questions.length - 1 ? (
                <Button
                  onClick={handleSubmit}
                  className="bg-violet-600 hover:bg-violet-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit Quiz"}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>

        {/* Question navigation */}
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-gray-700">
            Question Navigation
          </h2>
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className={`h-10 w-10 ${
                  currentQuestionIndex === index
                    ? "border-violet-600 bg-violet-50 text-violet-600"
                    : answers[question.id] !== undefined
                    ? "border-green-600 bg-green-50 text-green-600"
                    : ""
                }`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
