import { Link } from "react-router-dom";
import Icon from "../common/Icon.jsx";
import { categories } from "../../data/categories.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-800 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* عن المنصة */}
        <div className="md:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
            <img src="/logo.svg" alt="Fitora" className="w-8 h-8" />
            <span className="text-lg font-extrabold text-white">Fitora</span>
          </Link>
          <p className="text-sm text-white/50 leading-6">
            منصة إلكترونية تربط المتدربين بأفضل المدربين الرياضيين في الجزائر،
            لحجز جلسات وبرامج تدريبية موثوقة بكل سهولة.
          </p>
        </div>

        {/* روابط سريعة */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">روابط سريعة</h4>
          <ul className="space-y-3 text-sm">
            {[
              { to: "/coaches", label: "تصفح المدربين" },
              { to: "/programs", label: "البرامج التدريبية" },
              { to: "/about", label: "من نحن" },
              { to: "/contact", label: "تواصل معنا" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-white/50 hover:text-brand-400 transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* التصنيفات */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">مجالات التدريب</h4>
          <ul className="space-y-3 text-sm">
            {categories.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link
                  to={`/coaches?category=${c.id}`}
                  className="text-white/50 hover:text-brand-400 transition-colors"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* تواصل معنا */}
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex items-center gap-2">
              <Icon name="location" className="w-4 h-4 text-brand-400 shrink-0" />
              الجزائر العاصمة، الجزائر
            </li>
            <li>contact@fitora.dz</li>
            <li dir="ltr" className="text-right">+213 555 00 00 00</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>© {year} Fitora. جميع الحقوق محفوظة.</p>
          <p>صُنع بشغف في الجزائر</p>
        </div>
      </div>
    </footer>
  );
}
