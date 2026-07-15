import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { users } from "../../data/users.js";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password) {
      setError("البريد الإلكتروني وكلمة المرور مطلوبان");
      return;
    }

    setLoading(true);
    // USE_MOCK: تحقق محلي من الدور قبل تسجيل الدخول — سيُستبدل بربط API حقيقي لاحقًا
    setTimeout(() => {
      const matchedUser = users.find((u) => u.email === form.email);

      if (!matchedUser) {
        setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
        setLoading(false);
        return;
      }
      if (matchedUser.role !== "admin") {
        setError("هذه المنطقة مخصصة لمسؤولي المنصة فقط");
        setLoading(false);
        return;
      }

      login({ email: form.email });
      navigate("/admin", { replace: true });
    }, 500);
  };

  return (
    <div className="relative min-h-[calc(100vh-72px)] flex items-center justify-center px-5 py-16 overflow-hidden">
      {/* توهج خلفي بألوان الهوية */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-gradient opacity-[0.06] blur-3xl rounded-full" />

      <div className="relative w-full max-w-md">
        {/* أيقونة */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-brand-gradient opacity-20 rounded-2xl blur-xl" />
            <div className="relative w-16 h-16 bg-ink-900 border border-brand-400/30 rounded-2xl flex items-center justify-center">
              <Icon name="shield" className="w-8 h-8 text-brand-400" />
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">إدارة المنصة</h1>
          <p className="text-white/45 text-sm mt-2">الوصول إلى لوحة تحكم Fitora</p>
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
              type="email"
              placeholder="admin@fitora.dz"
              value={form.email}
              onChange={handleChange("email")}
              required
            />
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
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
              {loading ? "جاري الدخول..." : "دخول لوحة التحكم"}
            </Button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-5">
          منطقة محمية — خاصة بمسؤولي منصة Fitora
        </p>
        <p className="text-center text-white/40 text-sm mt-3">
          لست مسؤولًا؟{" "}
          <Link to="/login" className="text-brand-400 font-semibold">
            تسجيل الدخول العادي
          </Link>
        </p>
      </div>
    </div>
  );
}