import Icon from "../common/Icon.jsx";

// شريط علوي مبسّط للوحات التحكم (المتدرب/المدرب/الإدارة) — سيُطوَّر لاحقًا
export default function Header({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between py-6 border-b border-ink-800 mb-6">
      <div>
        <h1 className="text-xl font-bold text-white">{title}</h1>
        {subtitle && <p className="text-sm text-white/50 mt-1">{subtitle}</p>}
      </div>
      <button className="relative text-white/60 hover:text-white transition-colors" aria-label="الإشعارات">
        <Icon name="shield" className="w-5 h-5" />
      </button>
    </div>
  );
}
