import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";
import { coachNavItems } from "../../data/dashboardNav.js";
import { coaches } from "../../data/coaches.js";
import { getInitials } from "../../utils/format.js";

const currentCoach = coaches[0];

export default function Profile() {
  const [form, setForm] = useState({
    name: currentCoach.name,
    specialty: currentCoach.specialty,
    wilaya: currentCoach.wilaya,
    pricePerSession: currentCoach.pricePerSession,
    bio: currentCoach.bio,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // USE_MOCK: لا يوجد باك-إند بعد، الحفظ محلي فقط لهذه الجلسة
    setSaved(true);
  };

  return (
    <DashboardLayout navItems={coachNavItems} title="الملف الشخصي" subtitle="عدّل معلوماتك المهنية وصورتك التعريفية">
      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <Card className="p-6 flex flex-col items-center text-center h-fit">
          <div className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center text-ink-950 font-bold text-2xl mb-4">
            {getInitials(form.name)}
          </div>
          <p className="text-white font-semibold">{form.name}</p>
          <p className="text-white/40 text-xs mt-1">{form.specialty}</p>
          <div className="flex items-center gap-1 mt-3 text-brand-400 text-sm">
            <Icon name="star" className="w-4 h-4" />
            {currentCoach.rating.toFixed(1)}
            <span className="text-white/30">({currentCoach.reviewsCount})</span>
          </div>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/45 mb-1.5 block">الاسم الكامل</label>
                <Input value={form.name} onChange={handleChange("name")} />
              </div>
              <div>
                <label className="text-xs text-white/45 mb-1.5 block">التخصص</label>
                <Input value={form.specialty} onChange={handleChange("specialty")} />
              </div>
              <div>
                <label className="text-xs text-white/45 mb-1.5 block">الولاية</label>
                <Input value={form.wilaya} onChange={handleChange("wilaya")} />
              </div>
              <div>
                <label className="text-xs text-white/45 mb-1.5 block">سعر الجلسة (دج)</label>
                <Input type="number" value={form.pricePerSession} onChange={handleChange("pricePerSession")} />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/45 mb-1.5 block">نبذة عنك</label>
              <textarea
                value={form.bio}
                onChange={handleChange("bio")}
                rows={4}
                className="w-full bg-ink-900 border border-ink-600 rounded-xl px-4 py-3 text-white placeholder:text-white/35 focus:border-brand-400/60 transition-colors outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-4 mt-2">
              <Button type="submit" variant="primary" size="md">
                حفظ التغييرات
              </Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-brand-400 text-sm">
                  <Icon name="check" className="w-4 h-4" />
                  تم الحفظ
                </span>
              )}
            </div>
          </form>
        </Card>
      </div>
    </DashboardLayout>
  );
}
