import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Dashboard from "../pages/admin/Dashboard.jsx";
import Users from "../pages/admin/Users.jsx";
import Coaches from "../pages/admin/Coaches.jsx";
import Categories from "../pages/admin/Categories.jsx";
import Programs from "../pages/admin/Programs.jsx";
import Bookings from "../pages/admin/Bookings.jsx";
import Reviews from "../pages/admin/Reviews.jsx";
import Settings from "../pages/admin/Settings.jsx";

const guard = (element) => <ProtectedRoute allowedRoles={["admin"]}>{element}</ProtectedRoute>;

const AdminRoutes = [
  <Route key="admin-dashboard" path="/admin" element={guard(<Dashboard />)} />,
  <Route key="admin-users" path="/admin/users" element={guard(<Users />)} />,
  <Route key="admin-coaches" path="/admin/coaches" element={guard(<Coaches />)} />,
  <Route key="admin-categories" path="/admin/categories" element={guard(<Categories />)} />,
  <Route key="admin-programs" path="/admin/programs" element={guard(<Programs />)} />,
  <Route key="admin-bookings" path="/admin/bookings" element={guard(<Bookings />)} />,
  <Route key="admin-reviews" path="/admin/reviews" element={guard(<Reviews />)} />,
  <Route key="admin-settings" path="/admin/settings" element={guard(<Settings />)} />,
];

export default AdminRoutes;