import { useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";
import { matchesRoutePrefix } from "./utils/format.js";

// المسارات التي تُعتبر لوحات تحكم (تطبيق) لا صفحات تسويقية — لا نعرض فيها الـ Footer العام
const DASHBOARD_PREFIXES = ["/coach", "/athlete", "/admin"];

export default function App() {
  const { pathname } = useLocation();
  const isDashboard = DASHBOARD_PREFIXES.some((prefix) => matchesRoutePrefix(pathname, prefix));

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-ink-950">
        <Navbar />
        <main className="flex-1 flex flex-col">
          <AppRoutes />
        </main>
        {!isDashboard && <Footer />}
      </div>
    </AuthProvider>
  );
}