import { BrowserRouter, Routes, Route } from "react-router-dom";
import AskQuestion from "@/pages/AskQuestion";
import EditProfile from "@/pages/EditProfile";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NotFound from "@/pages/NotFound";
import Profile from "@/pages/Profile";
import QuestionDetail from "@/pages/QuestionDetail";
import Register from "@/pages/Register";
import Welcome from "@/pages/Welcome";
import IsAuthenticated from "./isAuthenticated.route";

function RouterHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index path="welcome" element={<Welcome />} />
          <Route path="auth">
            <Route index path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
        <Route path="/" element={<IsAuthenticated />}>
          <Route index element={<Home />} />
          <Route path="questions/:id" element={<QuestionDetail />} />
          <Route path="profile">
            <Route index element={<Profile />} />
            <Route path="edit" element={<EditProfile />} />
          </Route>
          <Route path="ask" element={<AskQuestion />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default RouterHandler;
