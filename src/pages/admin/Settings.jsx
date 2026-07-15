import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";
import { adminNavItems } from "../../data/dashboardNav.js";

export default function Settings() {
  const [form, setForm] = useState({
    siteName: "Fitora",
    contactEmail: "contact@fitora.dz",
    contactPhone: "+213 555 00 00 00",
  });
  const [maintenanceMode, setMaintenanceMode] = useState(false);
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
    <DashboardLayout navItems={adminNavItems} title="الإعدادات" subtitle="إعدادات عامة لمنصة Fitora">
      <Card className="p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-white/45 mb-1.5 block">اسم المنصة</label>
            <Input value={form.siteName} onChange={handleChange("siteName")} />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-white/45 mb-1.5 block">البريد الإلكتروني للتواصل</label>
              <Input dir="ltr" value={form.contactEmail} onChange={handleChange("contactEmail")} />
            </div>
            <div>
              <label className="text-xs text-white/45 mb-1.5 block">رقم الهاتف</label>
              <Input dir="ltr" value={form.contactPhone} onChange={handleChange("contactPhone")} />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-ink-800/50 border border-ink-700 rounded-xl mt-2">
            <div>
              <p className="text-white text-sm font-medium">وضع الصيانة</p>
              <p className="text-white/40 text-xs mt-1">تعطيل الوصول المؤقت للمنصة أمام الزوار</p>
            </div>
            <button
              type="button"
              onClick={() => setMaintenanceMode((v) => !v)}
              className={`w-12 h-7 rounded-full transition-colors relative shrink-0 ${
                maintenanceMode ? "bg-brand-gradient" : "bg-ink-700"
              }`}
              aria-label="تبديل وضع الصيانة"
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${
                  maintenanceMode ? "left-1" : "left-6"
                }`}
              />
            </button>
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
    </DashboardLayout>
  );
}