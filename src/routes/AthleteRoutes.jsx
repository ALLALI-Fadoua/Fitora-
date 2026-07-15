import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Dashboard from "../pages/athlete/Dashboard.jsx";
import MyBookings from "../pages/athlete/MyBookings.jsx";
import MyPrograms from "../pages/athlete/MyPrograms.jsx";
import Favorites from "../pages/athlete/Favorites.jsx";
import Notifications from "../pages/athlete/Notifications.jsx";
import Profile from "../pages/athlete/Profile.jsx";

const guard = (element) => <ProtectedRoute allowedRoles={["athlete"]}>{element}</ProtectedRoute>;

const AthleteRoutes = [
  <Route key="athlete-dashboard" path="/athlete" element={guard(<Dashboard />)} />,
  <Route key="athlete-bookings" path="/athlete/bookings" element={guard(<MyBookings />)} />,
  <Route key="athlete-programs" path="/athlete/programs" element={guard(<MyPrograms />)} />,
  <Route key="athlete-favorites" path="/athlete/favorites" element={guard(<Favorites />)} />,
  <Route key="athlete-notifications" path="/athlete/notifications" element={guard(<Notifications />)} />,
  <Route key="athlete-profile" path="/athlete/profile" element={guard(<Profile />)} />,
];

export default AthleteRoutes;