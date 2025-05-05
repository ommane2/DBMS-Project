import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import CreateQuiz from "./pages/admin/Quiz-Create";
import ManageQuiz from "./pages/admin/Quiz-Manage";
import QuizResults from "./pages/admin/Quiz-Results";
import JoinQuiz from "./pages/client/Join";
import QuizSubmitted from "./pages/client/Submitted";
import AttemptQuiz from "./pages/client/Attempt";


const App = () => {

  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin/dashboard" element={<AdminDashboard />} />
        <Route exact path="/admin/quiz/create" element={<CreateQuiz />} />

        <Route exact path="/admin/quiz/:quizId/manage" element={<ManageQuiz />} />
        <Route exact path="/admin/quiz/:quizId/results" element={<QuizResults />} />


        {/* User Routes */}
        <Route exact path="/user/join" element={<JoinQuiz />} />
        <Route exact path="/user/quiz/:quizCode/attempt" element={<AttemptQuiz />} />
        <Route exact path="/user/quiz/:quizCode/submitted" element={<QuizSubmitted />} />

      </Routes>
    </div>
  )
}

const AppWrapper = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWrapper;