import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/common/Icon.jsx";
import Button from "../../components/common/Button.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

const quickLinks = [
  { to: "/coaches", label: "المدربون الرياضيون" },
  { to: "/programs", label: "البرامج التدريبية" },
  { to: "/about", label: "من نحن" },
  { to: "/contact", label: "تواصل معنا" },
];

const sportChips = [
  { icon: "dumbbell", label: "تدريب القوة" },
  { icon: "run", label: "كارديو ولياقة" },
  { icon: "flex", label: "بناء العضلات" },
];

export default function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState("loading"); // loading | done

  useEffect(() => {
    const timer = setTimeout(() => {
      logout();
      setStep("done");
    }, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center px-5 py-16 overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-gradient opacity-[0.06] blur-3xl rounded-full" />

      <div className="relative w-full max-w-md">
        {step === "loading" ? (
          <div className="bg-ink-900 border border-ink-700 rounded-3xl p-12 shadow-2xl text-center">
            <div className="relative w-20 h-20 mx-auto mb-8">
              <div className="absolute inset-0 bg-brand-gradient opacity-20 rounded-full blur-xl animate-pulse" />
              <div className="relative w-full h-full bg-ink-800 border border-brand-400/30 rounded-full flex items-center justify-center">
                <Icon name="arrowLeft" className="w-8 h-8 text-brand-400" />
              </div>
            </div>
            <h1 className="text-2xl font-extrabold text-white mb-2">جاري تسجيل الخروج...</h1>
            <p className="text-white/45 text-sm mb-8">استرح جيدًا، الجسم يُبنى في الراحة</p>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-2 border-ink-700 border-t-brand-400 rounded-full animate-spin" />
            </div>
          </div>
        ) : (
          <>
            <div className="bg-ink-900 border border-ink-700 rounded-3xl p-10 shadow-2xl text-center">
              <div className="relative w-20 h-20 mx-auto mb-6">
                <div className="absolute inset-0 bg-brand-gradient opacity-20 rounded-full blur-xl" />
                <div className="relative w-full h-full bg-brand-gradient-soft border border-brand-400/30 rounded-full flex items-center justify-center">
                  <Icon name="check" className="w-8 h-8 text-brand-400" />
                </div>
              </div>

              <span className="inline-flex items-center gap-2 bg-brand-gradient-soft border border-brand-400/30 rounded-full px-4 py-1 text-xs text-brand-400 mb-4">
                <Icon name="dumbbell" className="w-3.5 h-3.5" />
                أحسنت الأداء اليوم
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">تم تسجيل الخروج</h1>
              <p className="text-white/45 text-sm">شكرًا لتدريبك معنا على Fitora</p>
              <p className="text-white/30 text-xs mt-2 mb-8">تذكّر: الانتظام في التدريب هو مفتاح النتائج</p>

              <div className="flex flex-col gap-3">
                <Button as={Link} to="/coaches" variant="primary" size="md">
                  <Icon name="dumbbell" className="w-4 h-4" />
                  استكشف المدربين
                </Button>
                <Button as={Link} to="/login" variant="outline" size="md">
                  تسجيل الدخول مرة أخرى
                </Button>
              </div>

              <div className="mt-8 pt-6 border-t border-ink-700">
                <p className="text-white/30 text-xs mb-3">استكشف المزيد</p>
                <div className="flex flex-wrap justify-center gap-2.5">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className="text-xs text-brand-400 hover:text-brand-400/80 transition-colors bg-brand-gradient-soft border border-brand-400/20 rounded-lg px-3 py-1.5"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* شرائح رياضية */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {sportChips.map((chip) => (
                <div key={chip.label} className="bg-ink-900 border border-ink-700 rounded-2xl p-4 text-center">
                  <div className="w-10 h-10 bg-brand-gradient-soft rounded-xl flex items-center justify-center mx-auto mb-2">
                    <Icon name={chip.icon} className="w-5 h-5 text-brand-400" />
                  </div>
                  <p className="text-[11px] text-white/45">{chip.label}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}