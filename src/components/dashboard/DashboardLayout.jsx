import { NavLink } from "react-router-dom";
import Sidebar from "../layout/Sidebar.jsx";
import Header from "../layout/Header.jsx";
import Icon from "../common/Icon.jsx";

// شريط تنقّل أفقي قابل للتمرير يظهر فقط تحت md (بديل الـ Sidebar على الجوال)
function MobileTabs({ items }) {
  return (
    <div className="md:hidden -mx-5 px-5 mb-2 flex gap-2 overflow-x-auto pb-3">
      {items.map((item) => (
        <NavLink
          key={item.to}
          end={item.end}
          to={item.to}
          className={({ isActive }) =>
            `shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              isActive
                ? "bg-brand-gradient text-ink-950 border-transparent"
                : "border-ink-600 text-white/60 hover:text-white hover:border-ink-500"
            }`
          }
        >
          {item.icon && <Icon name={item.icon} className="w-4 h-4" />}
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

// الـ Sidebar ثابت على حافة الشاشة الحقيقية (fixed)، لذا لا نستخدم "max-w-7xl mx-auto" هنا
// (ذلك كان يُمركز الكتلة كلها ويترك فراغًا بين الـ Sidebar وحافة الشاشة الفعلية).
// بدلًا من ذلك: md:pr-72 يحجز بالضبط عرض الـ Sidebar (w-64) + هامش تنفّس (2rem)،
// والمحتوى يمتد على كل ما تبقّى من العرض ويتجاوب تلقائيًا مع حجم الشاشة.
export default function DashboardLayout({ navItems, title, subtitle, children }) {
  return (
    <div className="w-full pl-5 lg:pl-8 pr-5 md:pr-72">
      <Sidebar items={navItems} />
      <div className="w-full max-w-[1700px] pb-20">
        <Header title={title} subtitle={subtitle} />
        <MobileTabs items={navItems} />
        {children}
      </div>
    </div>
  );
}