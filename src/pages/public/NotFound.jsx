import { Link } from "react-router-dom";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-5 py-28 text-center">
      <p className="text-gradient-brand text-6xl font-extrabold mb-4">404</p>
      <h1 className="text-2xl font-bold text-white">الصفحة غير موجودة</h1>
      <p className="text-white/50 mt-3">الرابط الذي حاولت الوصول إليه غير متوفر أو تم نقله.</p>
      <Button as={Link} to="/" variant="primary" size="md" className="mt-7">
        العودة للرئيسية
        <Icon name="arrowLeft" className="w-4 h-4" />
      </Button>
    </div>
  );
}
