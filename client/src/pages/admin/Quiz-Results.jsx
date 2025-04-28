import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, Download } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router-dom";

// Mock results data
const mockResults = {
  quizId: "new-quiz-id",
  quizTitle: "JavaScript Fundamentals",
  participants: [
    {
      id: "p1",
      name: "John Doe",
      score: 8,
      totalQuestions: 10,
      submittedAt: new Date(Date.now() - 3600000), // 1 hour ago
    },
    {
      id: "p2",
      name: "Jane Smith",
      score: 10,
      totalQuestions: 10,
      submittedAt: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
      id: "p3",
      name: "Bob Johnson",
      score: 7,
      totalQuestions: 10,
      submittedAt: new Date(Date.now() - 10800000), // 3 hours ago
    },
    {
      id: "p4",
      name: "Alice Williams",
      score: 9,
      totalQuestions: 10,
      submittedAt: new Date(Date.now() - 14400000), // 4 hours ago
    },
  ],
};

export default function QuizResults() {
  const navigate = useNavigate();
  const params = useParams();
  const { quizId } = params;

  const [results, setResults] = useState(mockResults);
  const [sortConfig, setSortConfig] = useState({
    key: "score",
    direction: "desc",
  });

  // useEffect(() => {
  //   // Check if user is logged in
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/admin/login");
  //   }

  //   // In a real app, you would fetch results from API here
  //   // const fetchResults = async () => {
  //   //   const response = await fetch(`/api/quizzes/${quizId}/results`, {
  //   //     headers: { Authorization: `Bearer ${token}` }
  //   //   })
  //   //   const data = await response.json()
  //   //   setResults(data)
  //   // }
  //   // fetchResults()
  // }, [quizId, navigate]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedParticipants = [...results.participants].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  const exportToCSV = () => {
    // Create CSV content
    const headers = [
      "Name",
      "Score",
      "Total Questions",
      "Percentage",
      "Submitted At",
    ];
    const rows = results.participants.map((p) => [
      p.name,
      p.score,
      p.totalQuestions,
      `${Math.round((p.score / p.totalQuestions) * 100)}%`,
      formatDate(p.submittedAt),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `${results.quizTitle.replace(/\s+/g, "_")}_results.csv`
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Link
          to="/admin/dashboard"
          className="mb-6 inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>

        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Quiz Results</CardTitle>
                <CardDescription>{results.quizTitle}</CardDescription>
              </div>
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead
                      className="cursor-pointer hover:text-violet-600"
                      onClick={() => handleSort("name")}
                    >
                      Participant Name
                      {sortConfig.key === "name" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </TableHead>
                    <TableHead
                      className="cursor-pointer hover:text-violet-600"
                      onClick={() => handleSort("score")}
                    >
                      Score
                      {sortConfig.key === "score" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead
                      className="cursor-pointer hover:text-violet-600"
                      onClick={() => handleSort("submittedAt")}
                    >
                      Submitted At
                      {sortConfig.key === "submittedAt" && (
                        <span className="ml-1">
                          {sortConfig.direction === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedParticipants.map((participant, index) => (
                    <TableRow key={participant.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>{participant.name}</TableCell>
                      <TableCell>
                        {participant.score}/{participant.totalQuestions}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="mr-2 w-16 rounded-full bg-gray-200">
                            <div
                              className="h-2 rounded-full bg-violet-600"
                              style={{
                                width: `${Math.round(
                                  (participant.score /
                                    participant.totalQuestions) *
                                    100
                                )}%`,
                              }}
                            />
                          </div>
                          <span>
                            {Math.round(
                              (participant.score / participant.totalQuestions) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {formatDate(participant.submittedAt)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {results.participants.length === 0 && (
              <div className="py-24 text-center text-gray-500">
                No participants have taken this quiz yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
