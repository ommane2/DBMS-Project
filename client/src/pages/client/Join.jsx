import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/store/auth";
import { toast } from "react-toastify";

export default function JoinQuiz() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [quizCode, setQuizCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, API, authorizationToken } = useAuth(); // Custom hook from AuthContext

  const handleJoin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // setError("");

    try {
      // In a real app, you would call an API to join the quiz
      // const response = await fetch(`/api/quiz/${quizCode}/start`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name })
      // })

      // if (response.ok) {
      //   const data = await response.json()
      //   localStorage.setItem('participantId', data.participantId)
      //   localStorage.setItem('participantName', name)
      //   navigate(`/user/quiz/${quizCode}/attempt`)
      // } else {
      //   const data = await response.json()
      //   setError(data.message || 'Failed to join quiz')
      // }

      // For demo purposes, we'll simulate a successful join
      // Check if quiz code is valid (for demo, we'll accept JS101)

      // if (quizCode === "JS101") {
      //   localStorage.setItem("participantId", "demo-participant-id")
      // localStorage.setItem("participantName", name)
      //   navigate(`/user/quiz/${quizCode}/attempt`)
      // } else {
      //   setError("Invalid quiz code or quiz not found")
      // }

      const response = await axios.post(
        `${API}/api/attempt/start`,
        {
          participantName: name,
          code: quizCode,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // localStorage.setItem("participantId", );
        localStorage.setItem("participantName", name);
        navigate(`/user/quiz/${quizCode}/attempt`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="flex items-center text-gray-900 hover:text-gray-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-center text-2xl font-bold">
              Join Quiz
            </CardTitle>
            <CardDescription className="text-center">
              Enter your name and the quiz code to start
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleJoin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quizCode">Quiz Code</Label>
                <Input
                  id="quizCode"
                  placeholder="Enter the quiz code (e.g., JS101)"
                  value={quizCode}
                  onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-700"
                disabled={isLoading}
              >
                {isLoading ? "Joining..." : "Join Quiz"}
              </Button>
            </form>
          </CardContent>
          {/* <CardFooter className="flex justify-center border-t bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              For demo, use quiz code:{" "}
              <span className="font-semibold">JS101</span>
            </p>
          </CardFooter> */}
        </Card>
      </main>
    </div>
  );
}
