import AskQuestion from "@/pages/AskQuestion";
import EditProfile from "@/pages/EditProfile";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import QuestionDetail from "@/pages/QuestionDetail";
import Register from "@/pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function RouterHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="auth">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="questions/:id" element={<QuestionDetail />} />
        <Route path="profile">
          <Route index element={<Profile />} />
          <Route path="edit" element={<EditProfile />} />
        </Route>
        <Route path="ask" element={<AskQuestion/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterHandler;
