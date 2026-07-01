import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UserInformation from "./pages/UserInformation";
import JDUpload from "./pages/JDUpload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/userinfo" element={<UserInformation />} />
      <Route path="/jd-upload" element={<JDUpload />} />
    </Routes>
  );
}

export default App;