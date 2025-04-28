import { useState, useEffect } from "react"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, LogOut, MoreVertical, Plus, Settings, Trash, Users } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"



// Mock data for quizzes
const mockQuizzes = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    code: "JS101",
    startTime: new Date(Date.now() + 86400000), // Tomorrow
    endTime: new Date(Date.now() + 172800000), // Day after tomorrow
    questions: 10,
    participants: 0,
  },
  {
    id: "2",
    title: "React Concepts",
    description: "All about React components and hooks",
    code: "REACT22",
    startTime: new Date(Date.now() - 86400000), // Yesterday
    endTime: new Date(Date.now() + 86400000), // Tomorrow
    questions: 15,
    participants: 5,
  },
  {
    id: "3",
    title: "CSS Tricks",
    description: "Advanced CSS techniques and layouts",
    code: "CSS3",
    startTime: new Date(Date.now() - 172800000), // 2 days ago
    endTime: new Date(Date.now() - 86400000), // Yesterday
    questions: 8,
    participants: 12,
  },
]

export default function AdminDashboard() {
//   const router = useRouter()
const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState(mockQuizzes)
  const [deleteQuizId, setDeleteQuizId] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // useEffect(() => {
  //   // Check if user is logged in
  //   const token = localStorage.getItem("token")
  //   if (!token) {
  //       navigate("/admin/login")
  //   }

  //   // In a real app, you would fetch quizzes from API here
  //   // const fetchQuizzes = async () => {
  //   //   const response = await fetch('/api/quizzes', {
  //   //     headers: { Authorization: `Bearer ${token}` }
  //   //   })
  //   //   const data = await response.json()
  //   //   setQuizzes(data)
  //   // }
  //   // fetchQuizzes()
  // }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/admin/login")
  }

  const handleDeleteQuiz = (quizId) => {
    setDeleteQuizId(quizId)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteQuiz = () => {
    // In a real app, you would call an API to delete the quiz
    // const deleteQuiz = async () => {
    //   await fetch(`/api/quizzes/${deleteQuizId}`, {
    //     method: 'DELETE',
    //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    //   })
    // }

    // For demo, just filter out the deleted quiz
    setQuizzes(quizzes.filter((quiz) => quiz.id !== deleteQuizId))
    setIsDeleteDialogOpen(false)
  }

  const getQuizStatus = (startTime, endTime) => {
    const now = new Date()
    if (now < startTime) return "upcoming"
    if (now > endTime) return "completed"
    return "active"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="sticky top-0 z-10 border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-gray-900">Quiz Admin</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">All Quizzes</h2>
          <Link to="/admin/quiz/create">
            <Button className="bg-violet-600 hover:bg-violet-700">
              <Plus className="mr-2 h-4 w-4" />
              Create New Quiz
            </Button>
          </Link>
        </div>

        {/* Quiz grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => {
            const status = getQuizStatus(quiz.startTime, quiz.endTime)
            return (
              <Card key={quiz.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl">{quiz.title}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link to={`/admin/quiz/${quiz.id}/manage`}>
                          <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Manage Quiz
                          </DropdownMenuItem>
                        </Link>
                        <Link to={`/admin/quiz/${quiz.id}/results`}>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            View Results
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={() => handleDeleteQuiz(quiz.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete Quiz
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <Badge
                    className={`${
                      status === "active" ? "bg-green-500" : status === "upcoming" ? "bg-blue-500" : "bg-gray-500"
                    }`}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 text-sm text-gray-500">{quiz.description}</div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span>Code: {quiz.code}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{quiz.questions} Questions</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span>Start: {formatDate(quiz.startTime)}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-400" />
                      <span>{quiz.participants} Participants</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t bg-gray-50 px-6 py-3">
                  <div className="flex w-full justify-between gap-2">
                    <Link to={`/admin/quiz/${quiz.id}/manage`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Manage
                      </Button>
                    </Link>
                    <Link to={`/admin/quiz/${quiz.id}/results`} className="flex-1">
                      <Button variant="outline" className="w-full">
                        Results
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            )
          })}
        </div>

        {/* Delete confirmation dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the quiz and all associated questions and
                results.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={confirmDeleteQuiz} className="bg-red-600 hover:bg-red-700">
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  )
}
