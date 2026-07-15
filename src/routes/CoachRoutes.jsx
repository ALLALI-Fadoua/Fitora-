import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Dashboard from "../pages/coach/Dashboard.jsx";
import Sessions from "../pages/coach/Sessions.jsx";
import Programs from "../pages/coach/Programs.jsx";
import Bookings from "../pages/coach/Bookings.jsx";
import Reviews from "../pages/coach/Reviews.jsx";
import Profile from "../pages/coach/Profile.jsx";

const guard = (element) => <ProtectedRoute allowedRoles={["coach"]}>{element}</ProtectedRoute>;

const CoachRoutes = [
  <Route key="coach-dashboard" path="/coach" element={guard(<Dashboard />)} />,
  <Route key="coach-sessions" path="/coach/sessions" element={guard(<Sessions />)} />,
  <Route key="coach-programs" path="/coach/programs" element={guard(<Programs />)} />,
  <Route key="coach-bookings" path="/coach/bookings" element={guard(<Bookings />)} />,
  <Route key="coach-reviews" path="/coach/reviews" element={guard(<Reviews />)} />,
  <Route key="coach-profile" path="/coach/profile" element={guard(<Profile />)} />,
];

export default CoachRoutes;