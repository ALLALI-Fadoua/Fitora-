import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import Modal from "../../components/common/Modal.jsx";
import Icon from "../../components/common/Icon.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { coachNavItems } from "../../data/dashboardNav.js";
import { coaches } from "../../data/coaches.js";
import { programs as initialPrograms } from "../../data/programs.js";
import { formatDZD } from "../../utils/format.js";

const currentCoach = coaches[0];

const emptyForm = { title: "", durationWeeks: "", price: "", sessionsIncluded: "" };

export default function Programs() {
  const [programs, setPrograms] = useState(
    initialPrograms.filter((p) => p.coachId === currentCoach.id)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleAdd = (e) => {
    e.preventDefault();
    const newProgram = {
      id: `p-local-${Date.now()}`,
      coachId: currentCoach.id,
      title: form.title,
      durationWeeks: Number(form.durationWeeks) || 0,
      price: Number(form.price) || 0,
      sessionsIncluded: Number(form.sessionsIncluded) || 0,
      subscribersCount: 0,
      status: "active",
    };
    setPrograms((prev) => [newProgram, ...prev]);
    setForm(emptyForm);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout navItems={coachNavItems} title="البرامج التدريبية" subtitle="أنشئ وأدر برامجك التدريبية">
      <div className="flex justify-end mb-6">
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Icon name="flex" className="w-4 h-4" />
          برنامج جديد
        </Button>
      </div>

      {programs.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((program) => (
            <Card key={program.id} hoverable className="p-5 flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-3">
                <h3 className="text-white font-semibold text-[15px] leading-6">{program.title}</h3>
                <Badge tone="brand">نشط</Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-white/50 mb-4">
                <span className="flex items-center gap-1.5">
                  <Icon name="calendar" className="w-3.5 h-3.5" />
                  {program.durationWeeks} أسابيع
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="check" className="w-3.5 h-3.5" />
                  {program.sessionsIncluded} جلسة
                </span>
                <span className="flex items-center gap-1.5 col-span-2">
                  <Icon name="users" className="w-3.5 h-3.5" />
                  {program.subscribersCount || 0} مشترك
                </span>
              </div>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink-700">
                <span className="text-white font-bold">{formatDZD(program.price)}</span>
                <button
                  onClick={() => handleDelete(program.id)}
                  className="text-white/40 hover:text-red-400 transition-colors text-xs font-medium"
                >
                  حذف
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="flex"
          title="لا توجد برامج بعد"
          description="أنشئ أول برنامج تدريبي ليظهر للمتدربين على المنصة."
          action={
            <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
              إنشاء برنامج
            </Button>
          }
        />
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="برنامج تدريبي جديد">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <Input
            placeholder="عنوان البرنامج"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="المدة (أسابيع)"
              value={form.durationWeeks}
              onChange={(e) => setForm({ ...form, durationWeeks: e.target.value })}
              required
            />
            <Input
              type="number"
              placeholder="عدد الجلسات"
              value={form.sessionsIncluded}
              onChange={(e) => setForm({ ...form, sessionsIncluded: e.target.value })}
              required
            />
          </div>
          <Input
            type="number"
            placeholder="السعر (دج)"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
          />
          <Button type="submit" variant="primary" size="md" className="w-full mt-1">
            إضافة البرنامج
          </Button>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
