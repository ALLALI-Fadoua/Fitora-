import { createContext, useContext, useState } from "react";
import { users } from "../data/users.js";

const USE_MOCK = true; // عند ربط الـ API الحقيقي، بدّلي هذا العلم وطبقة الخدمات المرتبطة به
const STORAGE_KEY = "fitora_mock_user";

const AuthContext = createContext(null);

// تُبقي الجلسة بعد تحديث الصفحة (بديل مؤقت لتوكن حقيقي إلى حين ربط API)
const readStoredUser = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser);

  const persist = (nextUser) => {
    setUser(nextUser);
    if (nextUser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const login = ({ email }) => {
    if (USE_MOCK) {
      const found = users.find((u) => u.email === email) || users[0];
      persist(found);
      return found;
    }
    // TODO: استدعاء API حقيقي لتسجيل الدخول
    return null;
  };

  const register = ({ name, email, role }) => {
    if (USE_MOCK) {
      const newUser = { id: `u${Date.now()}`, name, email, role };
      persist(newUser);
      return newUser;
    }
    // TODO: استدعاء API حقيقي للتسجيل
    return null;
  };

  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth يجب أن يُستخدم داخل AuthProvider");
  return ctx;
}