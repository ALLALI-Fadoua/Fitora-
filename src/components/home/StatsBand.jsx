const stats = [
  { value: "180+", label: "مدرب موثّق" },
  { value: "3,200+", label: "جلسة مكتملة" },
  { value: "48", label: "ولاية مغطّاة" },
  { value: "4.8", label: "متوسط التقييم" },
];

export default function StatsBand() {
  return (
    <section className="border-y border-ink-800 bg-ink-950">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-extrabold text-gradient-brand">{stat.value}</p>
            <p className="text-white/45 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
