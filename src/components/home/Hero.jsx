import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../common/Icon.jsx";
import Button from "../common/Button.jsx";

// صور خلفية حرة الاستخدام تجاريًا (Unsplash License — لا حاجة لإسناد الحقوق)
// لاستبدالها بصورك الخاصة: ضعي ملفاتك في src/assets/images واستوردي مساراتها هنا بدل الروابط
const heroImages = [
  {
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1920&q=80",
    alt: "تدريب رفع الأثقال",
  },
  {
    url: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?auto=format&fit=crop&w=1920&q=80",
    alt: "تدريب الجري وقوة التحمل",
  },
  {
    url: "https://images.unsplash.com/photo-1616279969096-54b228f5f103?auto=format&fit=crop&w=1920&q=80",
    alt: "تدريب اليوغا",
  },
];

const stats = [
  { value: "+15K", label: "متدرب نشط" },
  { value: "+180", label: "مدرب لياقة محترف" },
  { value: "+340", label: "برنامج رياضي" },
  { value: "+1,200", label: "جلسة تدريب متاحة" },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* خلفية متبدّلة من صور حقيقية، بمعالجة لونية توحّدها مع هوية المنصة */}
      <div className="absolute inset-0">
        {heroImages.map((img, i) => (
          <div
            key={img.url}
            role="img"
            aria-label={img.alt}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1800ms] ease-in-out grayscale-[20%] brightness-[0.5] contrast-[1.08]"
            style={{ backgroundImage: `url(${img.url})`, opacity: i === activeIndex ? 1 : 0 }}
          />
        ))}
      </div>

      {/* تعتيم + صبغة بألوان الهوية لضمان وضوح النص واتساق الألوان بين الصور */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/50 via-transparent to-ink-950" />
      <div className="absolute inset-0 bg-brand-gradient opacity-[0.08] mix-blend-color" />

      <div className="relative w-full max-w-5xl mx-auto px-5 lg:px-8 py-24 flex flex-col items-center text-center">
        {/* شارة علوية */}
        <span className="inline-flex items-center gap-2.5 bg-ink-900/70 border border-ink-600 backdrop-blur-sm rounded-full px-5 py-2 text-sm text-white/80">
          منصة التدريب الرياضي واللياقة البدنية الذكية
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75 animate-ping" />
            <span className="relative inline-flex w-2 h-2 rounded-full bg-brand-400" />
          </span>
        </span>

        {/* العنوان الرئيسي */}
        <h1 className="mt-7 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.2] text-white max-w-3xl">
          طوّر جسمك مع <span className="text-gradient-brand">أفضل مدربي اللياقة</span>
        </h1>

        {/* النص التوضيحي */}
        <p className="mt-6 text-white/60 text-lg leading-8 max-w-2xl">
          جلسات تدريب رياضي احترافية، برامج تغذية معتمدة، ومدربون متخصصون —
          كل ما تحتاجه لتحقيق هدفك الرياضي في مكان واحد.
        </p>

        {/* أزرار الدعوة لاتخاذ إجراء */}
        <div className="mt-9 flex flex-col sm:flex-row items-center gap-4">
          <Button as={Link} to="/programs" variant="outline" size="lg">
            استكشف البرامج الرياضية
          </Button>
          <Button as={Link} to="/coaches" variant="primary" size="lg">
            احجز جلسة تدريب الآن
            <Icon name="arrowLeft" className="w-4 h-4" />
          </Button>
        </div>

        {/* شريط الإحصائيات */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-extrabold text-brand-400">{stat.value}</p>
              <p className="text-white/55 text-sm mt-1.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* مؤشرات الصور */}
        <div className="mt-10 flex items-center gap-2">
          {heroImages.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setActiveIndex(i)}
              aria-label={img.alt}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-6 bg-brand-400" : "w-1.5 bg-white/25 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
