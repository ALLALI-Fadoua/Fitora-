import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";
import { athleteNavItems } from "../../data/dashboardNav.js";
import { athletes } from "../../data/athletes.js";
import { getInitials } from "../../utils/format.js";

const currentAthlete = athletes[0];

export default function Profile() {
  const [form, setForm] = useState({
    name: currentAthlete.name,
    wilaya: currentAthlete.wilaya,
    goal: currentAthlete.goal,
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
    <DashboardLayout navItems={athleteNavItems} title="الملف الشخصي" subtitle="عدّل معلوماتك وأهدافك الرياضية">
      <div className="grid lg:grid-cols-[240px_1fr] gap-6">
        <Card className="p-6 flex flex-col items-center text-center h-fit">
          <div className="w-20 h-20 rounded-full bg-brand-gradient flex items-center justify-center text-ink-950 font-bold text-2xl mb-4">
            {getInitials(form.name)}
          </div>
          <p className="text-white font-semibold">{form.name}</p>
          <p className="text-white/40 text-xs mt-1">{form.goal}</p>
        </Card>

        <Card className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-white/45 mb-1.5 block">الاسم الكامل</label>
                <Input value={form.name} onChange={handleChange("name")} />
              </div>
              <div>
                <label className="text-xs text-white/45 mb-1.5 block">الولاية</label>
                <Input value={form.wilaya} onChange={handleChange("wilaya")} />
              </div>
            </div>

            <div>
              <label className="text-xs text-white/45 mb-1.5 block">هدفك الرياضي</label>
              <Input value={form.goal} onChange={handleChange("goal")} />
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