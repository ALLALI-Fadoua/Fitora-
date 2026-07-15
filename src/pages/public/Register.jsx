import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [role, setRole] = useState("athlete");
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    // USE_MOCK: تسجيل وهمي، سيُستبدل بربط API حقيقي لاحقًا
    register({ ...form, role });
    navigate(role === "coach" ? "/coach" : "/athlete");
  };

  return (
    <div className="max-w-md mx-auto px-5 py-20">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-white">إنشاء حساب جديد</h1>
        <p className="text-white/45 text-sm mt-2">انضم إلى Fitora كمتدرب أو كمدرب</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-6 bg-ink-900 border border-ink-700 rounded-xl p-1">
        {[
          { id: "athlete", label: "متدرب" },
          { id: "coach", label: "مدرب" },
        ].map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setRole(r.id)}
            className={`py-2.5 rounded-lg text-sm font-semibold transition-colors ${
              role === r.id ? "bg-brand-gradient text-ink-950" : "text-white/50 hover:text-white"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="الاسم الكامل"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
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
          إنشاء الحساب
          <Icon name="arrowLeft" className="w-4 h-4" />
        </Button>
      </form>

      <p className="text-center text-sm text-white/45 mt-6">
        لديك حساب بالفعل؟{" "}
        <Link to="/login" className="text-brand-400 font-semibold">
          سجّل الدخول
        </Link>
      </p>
    </div>
  );
}
