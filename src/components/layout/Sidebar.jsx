import { NavLink } from "react-router-dom";
import Icon from "../common/Icon.jsx";

// قائمة جانبية ثابتة (fixed) على الحافة اليمنى الحقيقية للشاشة — وليست حافة أي حاوية مُمركزة.
// عرضها هنا (w-64 = 16rem) يجب أن يطابق دائمًا القيمة المستخدمة في DashboardLayout.jsx (md:pr-72)
export default function Sidebar({ items = [] }) {
  return (
    <aside className="hidden md:block fixed top-[72px] right-0 z-30 w-64 h-[calc(100vh-72px)] border-l border-ink-800 bg-ink-950">
      <nav className="h-full overflow-y-auto px-4 pt-6 flex flex-col gap-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            end={item.end}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors shrink-0 ${
                isActive ? "bg-brand-gradient-soft text-brand-400" : "text-white/60 hover:text-white hover:bg-ink-800"
              }`
            }
          >
            {item.icon && <Icon name={item.icon} className="w-[18px] h-[18px] shrink-0" />}
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}