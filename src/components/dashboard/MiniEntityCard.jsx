import Card from "../common/Card.jsx";

// بطاقة مصغّرة تُستخدم كبديل بصري لعناصر القوائم (متدرب/مدرب/حجز...) داخل شبكة بدل صف طويل
export default function MiniEntityCard({ initials, title, subtitle, badge, gradient = true }) {
  return (
    <Card hoverable className="p-4 flex items-center gap-3">
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
          gradient ? "bg-brand-gradient text-ink-950" : "bg-ink-700 text-white/70"
        }`}
      >
        {initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{title}</p>
        {subtitle && <p className="text-white/40 text-xs mt-0.5 truncate">{subtitle}</p>}
      </div>
      {badge}
    </Card>
  );
}