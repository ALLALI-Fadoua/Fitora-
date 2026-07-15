import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// يحمي مسارات لوحات التحكم: يمنع الوصول قبل تسجيل الدخول، ويمنع دخول دور
// لمساحة دور آخر (مثال: متدرب يحاول فتح /admin).
export default function ProtectedRoute({ allowedRoles, children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}