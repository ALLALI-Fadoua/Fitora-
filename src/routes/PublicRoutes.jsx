import { Route } from "react-router-dom";
import Home from "../pages/public/Home.jsx";
import Coaches from "../pages/public/Coaches.jsx";
import CoachDetails from "../pages/public/CoachDetails.jsx";
import Programs from "../pages/public/Programs.jsx";
import About from "../pages/public/About.jsx";
import Contact from "../pages/public/Contact.jsx";
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx";
import AdminLogin from "../pages/auth/AdminLogin.jsx";
import Logout from "../pages/auth/Logout.jsx";

// تُستخدم كعناصر <Route> داخل AppRoutes — وليست Router مستقلة
const PublicRoutes = [
  <Route key="home" path="/" element={<Home />} />,
  <Route key="coaches" path="/coaches" element={<Coaches />} />,
  <Route key="coach-details" path="/coaches/:id" element={<CoachDetails />} />,
  <Route key="programs" path="/programs" element={<Programs />} />,
  <Route key="about" path="/about" element={<About />} />,
  <Route key="contact" path="/contact" element={<Contact />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/signup" element={<Signup />} />,
  <Route key="admin-login" path="/admin/login" element={<AdminLogin />} />,
  <Route key="logout" path="/logout" element={<Logout />} />,
];

export default PublicRoutes;