import Icon from "../common/Icon.jsx";

const steps = [
  {
    number: "01",
    icon: "search",
    title: "ابحث عن مدربك",
    text: "تصفّح المدربين حسب المجال، المدينة، والتقييمات، واختر من يناسب أهدافك.",
  },
  {
    number: "02",
    icon: "calendar",
    title: "احجز جلستك",
    text: "اختر الموعد المناسب لك وأكّد الحجز مباشرة عبر المنصة.",
  },
  {
    number: "03",
    icon: "flex",
    title: "ابدأ التدريب",
    text: "تابع برنامجك مع مدربك وتتبّع تقدمك خطوة بخطوة نحو هدفك.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="bg-ink-900/40 border-y border-ink-800">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 py-16">
        <div className="text-center max-w-lg mx-auto mb-12">
          <h2 className="text-2xl font-bold text-white">كيف تعمل Fitora؟</h2>
          <p className="text-white/45 text-sm mt-2">ثلاث خطوات بسيطة تفصلك عن أول جلسة تدريبية</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((step) => (
            <div key={step.number} className="relative bg-ink-900 border border-ink-700 rounded-2xl p-7">
              <span className="text-5xl font-extrabold text-white/[0.06] absolute top-4 left-6 select-none">
                {step.number}
              </span>
              <div className="relative w-12 h-12 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 mb-5">
                <Icon name={step.icon} className="w-6 h-6" />
              </div>
              <h3 className="relative text-white font-semibold text-lg mb-2">{step.title}</h3>
              <p className="relative text-white/50 text-sm leading-6">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
