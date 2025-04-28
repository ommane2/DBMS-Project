"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Home } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"


export default function QuizSubmitted() {
    const navigate = useNavigate();
    const params = useParams();
  const { quizCode } = params

  const [participantName, setParticipantName] = useState("")
  const [score, setScore] = useState(null)

  // useEffect(() => {
  //   // Check if participant is registered
  //   const storedName = localStorage.getItem("participantName")

  //   if (!storedName) {
  //       navigate("/user/join")
  //     return
  //   }

  //   setParticipantName(storedName)

  //   // In a real app, you would fetch the score from API
  //   // const fetchScore = async () => {
  //   //   const participantId = localStorage.getItem('participantId')
  //   //   const response = await fetch(`/api/quiz/${quizCode}/score?participantId=${participantId}`)
  //   //   const data = await response.json()
  //   //   setScore(data.score)
  //   // }
  //   // fetchScore()

  //   // For demo, calculate a random score
  //   const randomScore = Math.floor(Math.random() * 5) + 1
  //   setScore(randomScore)
  // }, [quizCode, navigate])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl">Quiz Submitted!</CardTitle>
          <CardDescription>Thank you for participating, {participantName}</CardDescription>
        </CardHeader>
        <CardContent>
          {score !== null && (
            <div className="mb-6 rounded-lg bg-violet-50 p-4 text-center">
              <p className="text-sm text-violet-600">Your Score</p>
              <p className="text-3xl font-bold text-violet-700">{score} / 5</p>
              <p className="text-sm text-violet-600">
                {score === 5
                  ? "Perfect score! Excellent work!"
                  : score >= 4
                    ? "Great job!"
                    : score >= 3
                      ? "Good effort!"
                      : "Keep practicing!"}
              </p>
            </div>
          )}
          <p className="text-gray-600">
            Your answers have been recorded. You can now close this page or return to the home screen.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/">
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
