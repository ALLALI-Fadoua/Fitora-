import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { adminNavItems } from "../../data/dashboardNav.js";
import { programs as initialPrograms } from "../../data/programs.js";
import { coaches } from "../../data/coaches.js";
import { formatDZD } from "../../utils/format.js";

const coachName = (id) => coaches.find((c) => c.id === id)?.name || "مدرب";

export default function Programs() {
  const [programs, setPrograms] = useState(initialPrograms);

  const handleDelete = (id) => {
    setPrograms((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <DashboardLayout navItems={adminNavItems} title="البرامج التدريبية" subtitle="نظرة عامة على كل البرامج المنشورة على المنصة">
      {programs.length > 0 ? (
        <div className="flex flex-col gap-3">
          {programs.map((program) => (
            <Card key={program.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{program.title}</p>
                <p className="text-white/40 text-xs mt-1 truncate">
                  {coachName(program.coachId)} · {program.durationWeeks} أسابيع · {program.subscribersCount || 0} مشترك
                </p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <Badge tone="brand">نشط</Badge>
                <span className="text-white font-semibold text-sm w-24 text-left">{formatDZD(program.price)}</span>
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
        <EmptyState icon="flex" title="لا توجد برامج" description="ستظهر هنا كل البرامج التي ينشئها المدربون." />
      )}
    </DashboardLayout>
  );
}