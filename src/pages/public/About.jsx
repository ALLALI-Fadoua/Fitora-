import Icon from "../../components/common/Icon.jsx";
import CtaBanner from "../../components/home/CtaBanner.jsx";

const values = [
  {
    icon: "shield",
    title: "الثقة والموثوقية",
    text: "كل مدرب على المنصة يمرّ بمراجعة قبل التوثيق، لضمان تجربة تدريب آمنة وموثوقة.",
  },
  {
    icon: "flex",
    title: "برامج مصمّمة لهدفك",
    text: "من خسارة الوزن إلى بناء العضلات، نوفّر تنوعًا يغطي كل الأهداف الرياضية.",
  },
  {
    icon: "location",
    title: "قريبون منك",
    text: "مدربون في مختلف ولايات الجزائر، لتجدي/تجد من يناسب مدينتك.",
  },
  {
    icon: "star",
    title: "تقييمات حقيقية",
    text: "آراء المتدربين السابقين تساعدك على اختيار المدرب المناسب بثقة.",
  },
];

const stats = [
  { value: "+180", label: "مدرب موثّق" },
  { value: "+15K", label: "متدرب نشط" },
  { value: "48", label: "ولاية مغطّاة" },
  { value: "4.8", label: "متوسط التقييم" },
];

export default function About() {
  return (
    <div>
      {/* المقدمة */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[420px] h-[420px] rounded-full bg-brand-gradient opacity-[0.08] blur-[110px]" />
        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 pt-20 pb-16 text-center">
          <span className="inline-flex items-center gap-2 bg-brand-gradient-soft border border-brand-400/30 rounded-full px-4 py-1.5 text-xs text-brand-400 mb-6">
            <Icon name="shield" className="w-3.5 h-3.5" />
            من نحن
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            نربط الجزائر <span className="text-gradient-brand">بأفضل مدربيها</span>
          </h1>
          <p className="text-white/55 text-lg leading-8 mt-6 max-w-2xl mx-auto">
            Fitora منصة جزائرية متخصصة في التدريب الرياضي، صُممت لتكون حلقة وصل
            بين المدربين الرياضيين والمتدربين في بيئة رقمية واحدة — تبسّط رحلة
            البحث عن المدرب المناسب، وتوفّر وسيلة سهلة وموثوقة لحجز الجلسات
            والانضمام إلى البرامج التدريبية.
          </p>
        </div>
      </section>

      {/* الإحصائيات */}
      <section className="border-y border-ink-800 bg-ink-900/40">
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-extrabold text-gradient-brand">{stat.value}</p>
              <p className="text-white/45 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* رسالتنا */}
      <section className="max-w-7xl mx-auto px-5 lg:px-8 py-16 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">رسالتنا</h2>
          <p className="text-white/55 leading-8">
            نؤمن بأن الوصول إلى تدريب رياضي احترافي يجب أن يكون سهلاً ومتاحًا
            للجميع. لهذا بنينا Fitora: مساحة رقمية تجمع المدربين الرياضيين
            الموثوقين والمتدربين الطموحين، وتزيل العوائق التقليدية في البحث
            والحجز والمتابعة.
          </p>
          <p className="text-white/55 leading-8 mt-4">
            سواء كنت تسعى لتحسين لياقتك البدنية، بناء العضلات، خسارة الوزن، أو
            تطوير أدائك الرياضي — ستجد على المنصة مدربًا يفهم هدفك ويرافقك
            خطوة بخطوة نحو تحقيقه.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {values.map((value) => (
            <div key={value.title} className="bg-ink-900 border border-ink-700 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 mb-3">
                <Icon name={value.icon} className="w-5 h-5" />
              </div>
              <h3 className="text-white font-semibold text-sm mb-1.5">{value.title}</h3>
              <p className="text-white/45 text-xs leading-6">{value.text}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}