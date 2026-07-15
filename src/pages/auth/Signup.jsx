import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { users } from "../../data/users.js";

const ROLES = [
  {
    value: "athlete",
    icon: "dumbbell",
    label: "متدرب",
    labelEn: "Athlete",
    tagline: "حقّق جسمك المثالي مع أفضل المدربين",
    highlight: "مجانًا للمتدربين",
  },
  {
    value: "coach",
    icon: "shield",
    label: "مدرب رياضي",
    labelEn: "Coach",
    tagline: "شارك خبرتك الرياضية وابنِ قاعدة متدربيك",
    highlight: "للمدربين المعتمدين",
  },
];

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "athlete" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const activeRole = ROLES.find((r) => r.value === form.role);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError("");
  };

  const handleRoleSelect = (role) => {
    setForm({ ...form, role });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("جميع الحقول مطلوبة");
      return;
    }
    if (users.find((u) => u.email === form.email)) {
      setError("البريد الإلكتروني مستخدم بالفعل");
      return;
    }

    setLoading(true);
    // USE_MOCK: تسجيل وهمي، سيُستبدل بربط API حقيقي لاحقًا
    setTimeout(() => {
      register(form);
      setLoading(false);
      navigate(form.role === "coach" ? "/coach" : "/athlete", { replace: true });
    }, 500);
  };

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center px-5 py-16 overflow-hidden">
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-gradient opacity-[0.06] blur-3xl rounded-full" />

      <div className="relative w-full max-w-md">
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-brand-gradient-soft border border-brand-400/30 rounded-full px-4 py-1.5 text-xs text-brand-400">
            <Icon name="check" className="w-3.5 h-3.5" />
            انضم لأكبر منصة تدريب رياضي في الجزائر
          </span>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-2">
            ابدأ <span className="text-gradient-brand">رحلتك الرياضية</span>
          </h1>
          <p className="text-white/45 text-sm">أنت مدرب أم متدرب؟ اختر وانطلق</p>
        </div>

        {/* اختيار الدور */}
        <div className="mb-6">
          <div className="flex bg-ink-900 border border-ink-700 rounded-2xl p-1 mb-4">
            {ROLES.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => handleRoleSelect(role.value)}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  form.role === role.value
                    ? "bg-brand-gradient text-ink-950 shadow-brand"
                    : "text-white/50 hover:text-white"
                }`}
              >
                <Icon name={role.icon} className="w-4 h-4" />
                {role.label}
              </button>
            ))}
          </div>

          {activeRole && (
            <div className="bg-ink-900 border border-brand-400/20 rounded-2xl p-5">
              <div className="flex items-center justify-between gap-3 mb-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center shrink-0">
                    <Icon name={activeRole.icon} className="w-5 h-5 text-brand-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-white text-sm">
                      {activeRole.label}
                      <span className="text-white/40 font-normal text-xs"> / {activeRole.labelEn}</span>
                    </p>
                    <p className="text-brand-400 text-xs mt-0.5 truncate">{activeRole.tagline}</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-brand-gradient-soft border border-brand-400/20 text-brand-400 px-2 py-1 rounded-lg whitespace-nowrap shrink-0">
                  {activeRole.highlight}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* البطاقة */}
        <div className="bg-ink-900 border border-ink-700 rounded-3xl p-8 shadow-2xl">
          {error && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="text"
              icon={<Icon name="user" className="w-4 h-4" />}
              placeholder="اسمك الكامل"
              value={form.name}
              onChange={handleChange("name")}
              required
            />
            <Input
              type="email"
              icon={<Icon name="mail" className="w-4 h-4" />}
              placeholder="example@email.com"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                icon={<Icon name="lock" className="w-4 h-4" />}
                placeholder="أدخل كلمة المرور"
                value={form.password}
                onChange={handleChange("password")}
                className="pl-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 left-4 flex items-center text-white/40 hover:text-brand-400 transition-colors"
                aria-label={showPassword ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
              >
                <Icon name={showPassword ? "eyeOff" : "eye"} className="w-4 h-4" />
              </button>
            </div>

            <Button type="submit" variant="primary" size="md" className="w-full mt-1" disabled={loading}>
              {loading ? "جاري إنشاء الحساب..." : form.role === "coach" ? "انضم كمدرب رياضي" : "ابدأ تدريبك الآن"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-5">
          بالتسجيل، أنت توافق على شروط استخدام منصة Fitora
        </p>
        <p className="text-center text-sm text-white/45 mt-3">
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="text-brand-400 font-semibold">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}