const tones = {
  brand: "bg-brand-gradient-soft text-brand-400 border border-brand-400/30",
  neutral: "bg-ink-800 text-white/70 border border-ink-600",
  outline: "bg-transparent text-white/60 border border-ink-600",
};

export default function Badge({ children, tone = "brand", icon = null, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${tones[tone]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
