import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // USE_MOCK: تسجيل دخول وهمي، سيُستبدل بربط API حقيقي لاحقًا
    const loggedInUser = login(form);
    const destinations = { coach: "/coach", athlete: "/athlete", admin: "/admin" };
    navigate(destinations[loggedInUser?.role] || "/");
  };

  return (
    <div className="max-w-md mx-auto px-5 py-20">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">تسجيل الدخول</h1>
        <p className="text-white/45 text-sm mt-2">مرحبًا بعودتك إلى Fitora</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="البريد الإلكتروني"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          type="password"
          placeholder="كلمة المرور"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <Button type="submit" variant="primary" size="md" className="mt-2 w-full">
          تسجيل الدخول
          <Icon name="arrowLeft" className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-center text-sm text-white/45 mt-6">
        ليس لديك حساب؟{" "}
        <Link to="/register" className="text-brand-400 font-semibold">
          سجّل الآن
        </Link>
      </p>

      <div className="mt-6 bg-ink-900 border border-ink-700 rounded-xl p-4 text-xs text-white/40 leading-6">
        <p className="text-white/55 font-semibold mb-1">للتجربة بدون حساب حقيقي (بيانات وهمية):</p>
        <p>amine@example.com ← يفتح مساحة المدرب</p>
        <p>khaled@example.com ← يفتح مساحة المتدرب</p>
        <p>admin@fitora.dz ← يفتح مساحة الإدارة</p>
        <p className="mt-1">أي كلمة مرور تعمل حاليًا.</p>
      </div>
    </div>
  );
}
