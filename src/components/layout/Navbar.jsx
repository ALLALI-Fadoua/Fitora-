import { useState } from "react";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import Icon from "../common/Icon.jsx";
import Button from "../common/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { getInitials, matchesRoutePrefix } from "../../utils/format.js";
import logo from "../../assets/images/fitora-logo.png";

const navLinks = [
  { to: "/", label: "الرئيسية" },
  { to: "/coaches", label: "المدربون" },
  { to: "/programs", label: "البرامج" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
];

const dashboardPaths = { coach: "/coach", athlete: "/athlete", admin: "/admin" };
const dashboardLabels = { coach: "مساحة المدرب", athlete: "مساحة المتدرب", admin: "مساحة الإدارة" };

// المسارات التي تُعتبر لوحات تحكم (تطبيق) — لا تظهر فيها روابط الصفحات التسويقية
// لأن القائمة الجانبية للوحة التحكم توفّر تنقّلها الخاص أصلًا.
const DASHBOARD_PREFIXES = ["/coach", "/athlete", "/admin"];
// صفحات مصادقة قائمة بذاتها (تسجيل دخول/تسجيل/خروج) — لا تحتاج روابط التنقل التسويقية أيضًا
const AUTH_ONLY_PREFIXES = ["/login", "/register", "/logout"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isDashboard = DASHBOARD_PREFIXES.some((prefix) => matchesRoutePrefix(pathname, prefix));
  const isAuthPage = AUTH_ONLY_PREFIXES.some((prefix) => matchesRoutePrefix(pathname, prefix));
  const hidePublicNav = isDashboard || isAuthPage;
  const dashboardPath = user ? dashboardPaths[user.role] || "/" : "/";
  const dashboardLabel = user ? dashboardLabels[user.role] || "مساحتي" : "";

  const handleLogout = () => {
    setOpen(false);
    navigate("/logout");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink-800 bg-ink-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-[72px] flex items-center justify-between">
        {/* شعار المنصة */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <img src={logo} alt="Fitora" className="w-9 h-9" />
          <span className="text-xl font-extrabold tracking-tight text-white">FITORA</span>
        </Link>

        {/* روابط التنقل الرئيسية — تُخفى داخل لوحات التحكم */}
        {!hidePublicNav && (
          <nav className="hidden lg:flex items-center gap-9">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `runner-underline text-[15px] font-medium transition-colors ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => <span data-active={isActive}>{link.label}</span>}
              </NavLink>
            ))}
          </nav>
        )}

        {/* أزرار الدخول / التسجيل، أو مساحة المستخدم بعد تسجيل الدخول */}
        <div className="hidden lg:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to={dashboardPath}
                className="flex items-center gap-2.5 pl-1 pr-3 py-1.5 rounded-full border border-ink-600 hover:border-brand-400/50 transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center text-ink-950 text-xs font-bold shrink-0">
                  {getInitials(user.name)}
                </span>
                <span className="text-sm text-white/80">{dashboardLabel}</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                خروج
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost" size="sm">
                تسجيل الدخول
              </Button>
              <Button as={Link} to="/register" variant="primary" size="sm">
                انضم كمدرب
              </Button>
            </>
          )}
        </div>

        {/* زر القائمة للجوال */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden text-white/80 p-2 -m-2"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
        >
          <Icon name={open ? "close" : "menu"} className="w-6 h-6" />
        </button>
      </div>

      {/* قائمة الجوال المنسدلة */}
      {open && (
        <div className="lg:hidden border-t border-ink-800 bg-ink-950 px-5 py-5 flex flex-col gap-4">
          {!hidePublicNav &&
            navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-[15px] font-medium ${isActive ? "text-brand-400" : "text-white/70"}`
                }
              >
                {link.label}
              </NavLink>
            ))}

          {isAuthenticated ? (
            <div className="flex flex-col gap-3 pt-3 border-t border-ink-800">
              <Link to={dashboardPath} onClick={() => setOpen(false)} className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center text-ink-950 text-xs font-bold shrink-0">
                  {getInitials(user.name)}
                </span>
                <span className="text-sm text-white/85 font-medium">{dashboardLabel}</span>
              </Link>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                تسجيل الخروج
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 pt-3 border-t border-ink-800">
              <Button as={Link} to="/login" variant="outline" size="sm" onClick={() => setOpen(false)}>
                تسجيل الدخول
              </Button>
              <Button as={Link} to="/register" variant="primary" size="sm" onClick={() => setOpen(false)}>
                انضم كمدرب
              </Button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}