import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Clock, Edit, Plus, Trash } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/store/auth";
import { toast } from "react-toastify";

// Mock quiz data
const mockQuiz = {
  id: "new-quiz-id",
  title: "JavaScript Fundamentals",
  description: "Test your knowledge of JavaScript basics",
  code: "JS101",
  startTime: new Date(Date.now() + 86400000), // Tomorrow
  endTime: new Date(Date.now() + 172800000), // Day after tomorrow
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
      correctOption: 0,
    },
    {
      id: "q2",
      questionText: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Object"],
      correctOption: 2,
    },
  ],
};

export default function ManageQuiz() {
  const navigate = useNavigate();
  const params = useParams();
  const { quizId } = params;
  const { isLoggedIn, isAdmin, API, authorizationToken } = useAuth(); // Custom hook from AuthContext
  const [quiz, setQuiz] = useState(null);
  const [isAddQuestionDialogOpen, setIsAddQuestionDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    options: ["", "", "", ""],
    correctOption: 0,
  });
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const getQuizInfo = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API}/api/quiz/${quizId}`, {
        headers: {
          Authorization: authorizationToken,
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log(`Quiz Response Data: `, response.data);
        setQuiz(response.data);
      }
    } catch (error) {
      console.log(`Error While Getting Quiz: `, error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuizInfo();
  }, [API, quizId]);

  const handleAddQuestion = () => {
    // Validate question
    // if (
    //   !newQuestion.questionText.trim() ||
    //   newQuestion.options.some((option) => !option.trim())
    // ) {
    //   return;
    // }
    // In a real app, you would call an API to add the question
    const addQuestion = async () => {

      const response = await axios.post(
        `${API}/api/question`,
        {
          quizId: quizId,
          text: newQuestion.text,
          options: newQuestion.options,
          correctOption: newQuestion.correctOption,
        },
        {
          headers: {
            Authorization: authorizationToken,
          },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        getQuizInfo();
        toast.success(response.data.message);
      }
    };
    addQuestion();

    // For demo, just add to local state
    const newQuestionWithId = {
      ...newQuestion,
      id: `q${quiz.questions.length + 1}`,
    };

    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestionWithId],
    }));

    // Reset form
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctOption: 0,
    });

    setIsAddQuestionDialogOpen(false);
  };

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
    setNewQuestion({
      text: question.text,
      options: [...question.options],
      correctOption: question.correctOption,
    });
    setIsAddQuestionDialogOpen(true);
  };

  const handleUpdateQuestion = () => {
    // In a real app, you would call an API to update the question
    const updateQuestion = async () => {
      // await fetch(`/api/quizzes/${quizId}/questions/${editingQuestion.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('token')}`
      //   },
      //   body: JSON.stringify(newQuestion)
      // })

      const response  =await axios.put(`${API}/api/question/${editingQuestion._id}`,{
        text:newQuestion.text,
        options:newQuestion.options,
        correctOption:newQuestion.correctOption,
      },{
        headers:{
          Authorization:authorizationToken,
        },withCredentials:true,
      })
      if(response.status===200){
        toast.success(response.data.message);
        getQuizInfo();
      }
    };

    updateQuestion();

    // For demo, just update local state
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === editingQuestion.id ? { ...q, ...newQuestion } : q
      ),
    }));

    // Reset form
    setNewQuestion({
      text: "",
      options: ["", "", "", ""],
      correctOption: 0,
    });
    setEditingQuestion(null);
    setIsAddQuestionDialogOpen(false);
  };

  const handleDeleteQuestion = (questionId) => {
    setDeleteQuestionId(questionId);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteQuestion = async () => {
    const response = await axios.delete(`${API}/api/question/${deleteQuestionId}`, {
      headers: {
        Authorization: authorizationToken,
      },
      withCredentials: true,
    });
    if (response.status === 200) {
      toast.success(response.data.message);
      getQuizInfo();
    }

    // For demo, just filter out the deleted question
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== deleteQuestionId),
    }));

    setIsDeleteDialogOpen(false);
  };

  const handleOptionChange = (index, value) => {
    setNewQuestion((prev) => {
      const updatedOptions = [...prev.options];
      updatedOptions[index] = value;
      return { ...prev, options: updatedOptions };
    });
  };

  if (isLoading) {
    return <h1>Loading......</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/admin/dashboard"
          className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        {/* Quiz Info Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">{quiz.title}</CardTitle>
            <CardDescription>{quiz.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border bg-gray-50 p-3">
                <div className="text-sm font-medium text-gray-500">
                  Quiz Code
                </div>
                <div className="mt-1 text-lg font-semibold">{quiz.code}</div>
              </div>
              <div className="rounded-lg border bg-gray-50 p-3">
                <div className="text-sm font-medium text-gray-500">
                  Questions
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {quiz.questions.length}
                </div>
              </div>
              <div className="rounded-lg border bg-gray-50 p-3">
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  Start Time
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {formatDate(quiz.startTime)}
                </div>
              </div>
              <div className="rounded-lg border bg-gray-50 p-3">
                <div className="flex items-center text-sm font-medium text-gray-500">
                  <Clock className="mr-1 h-4 w-4" />
                  End Time
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {formatDate(quiz.endTime)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Questions Section */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Questions</h2>
          <Dialog
            open={isAddQuestionDialogOpen}
            onOpenChange={setIsAddQuestionDialogOpen}
          >
            <DialogTrigger asChild>
              <Button className="bg-violet-600 hover:bg-violet-700">
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>
                  {editingQuestion ? "Edit Question" : "Add New Question"}
                </DialogTitle>
                <DialogDescription>
                  {editingQuestion
                    ? "Update the question details below."
                    : "Create a new question for your quiz."}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="text">Question</Label>
                  <Textarea
                    id="text"
                    placeholder="Enter your question here"
                    value={newQuestion.text}
                    onChange={(e) =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        text: e.target.value,
                      }))
                    }
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Label>Options</Label>
                  {newQuestion.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        placeholder={`Option ${index + 1}`}
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        required
                      />
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label>Correct Answer</Label>
                  <RadioGroup
                    value={newQuestion.correctOption.toString()}
                    onValueChange={(value) =>
                      setNewQuestion((prev) => ({
                        ...prev,
                        correctOption: Number.parseInt(value),
                      }))
                    }
                  >
                    {newQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={index.toString()}
                          id={`option-${index}`}
                        />
                        <Label htmlFor={`option-${index}`}>
                          Option {index + 1}
                          {option ? `: ${option}` : ""}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAddQuestionDialogOpen(false);
                    setEditingQuestion(null);
                    setNewQuestion({
                      text: "",
                      options: ["", "", "", ""],
                      correctOption: 0,
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={
                    editingQuestion ? handleUpdateQuestion : handleAddQuestion
                  }
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  {editingQuestion ? "Update Question" : "Add Question"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Questions List */}
        {quiz.questions.length === 0 ? (
          <Card className="border-dashed bg-gray-50">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <p className="mb-4 text-gray-500">No questions added yet</p>
              <Button
                onClick={() => setIsAddQuestionDialogOpen(true)}
                className="bg-violet-600 hover:bg-violet-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Question
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {quiz.questions.map((question, index) => (
              <Card key={question._id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 font-medium text-gray-500">
                        Question {index + 1}
                      </div>
                      <div className="text-lg font-medium">
                        {question.text}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEditQuestion(question)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {question.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className={`rounded-md border p-3 ${
                          optIndex === question.correctOption
                            ? "border-green-500 bg-green-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-center">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-xs">
                            {String.fromCharCode(65 + optIndex)}
                          </div>
                          <div>{option}</div>
                          {optIndex === question.correctOption && (
                            <div className="ml-auto text-xs font-medium text-green-600">
                              Correct Answer
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Delete Question Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              question.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteQuestion}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
