import { Link } from "react-router-dom";
import Button from "../common/Button.jsx";
import Icon from "../common/Icon.jsx";

export default function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink-900 border border-ink-700 px-8 py-14 text-center">
        <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-brand-gradient opacity-[0.12] blur-[100px]" />
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white max-w-xl mx-auto leading-snug">
            هل أنت مدرب رياضي؟ انضم إلى Fitora ووسّع قاعدة عملائك
          </h2>
          <p className="text-white/50 mt-3 max-w-md mx-auto">
            أنشئ ملفك الاحترافي، انشر برامجك التدريبية، وادِر جلساتك من مكان واحد.
          </p>
          <Button as={Link} to="/signup" variant="primary" size="lg" className="mt-7">
            سجّل كمدرب الآن
            <Icon name="arrowLeft" className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
