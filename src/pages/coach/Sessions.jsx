import { useMemo, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import SessionRow from "../../components/dashboard/SessionRow.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { coachNavItems } from "../../data/dashboardNav.js";
import { coaches } from "../../data/coaches.js";
import { sessions } from "../../data/sessions.js";
import { athletes } from "../../data/athletes.js";

// ملاحظة: نعرض بيانات المدرب الأول (c1) كنموذج توضيحي إلى حين ربط API حقيقي
const currentCoach = coaches[0];
const athleteName = (id) => athletes.find((a) => a.id === id)?.name || "متدرب";

const tabs = [
  { id: "all", label: "الكل" },
  { id: "upcoming", label: "قادمة" },
  { id: "completed", label: "منتهية" },
  { id: "cancelled", label: "ملغاة" },
];

export default function Sessions() {
  const [activeTab, setActiveTab] = useState("all");

  const coachSessions = useMemo(
    () => sessions.filter((s) => s.coachId === currentCoach.id),
    []
  );

  const filtered = useMemo(() => {
    if (activeTab === "all") return coachSessions;
    return coachSessions.filter((s) => s.status === activeTab);
  }, [activeTab, coachSessions]);

  const countFor = (id) =>
    id === "all" ? coachSessions.length : coachSessions.filter((s) => s.status === id).length;

  return (
    <DashboardLayout navItems={coachNavItems} title="الجلسات" subtitle="إدارة جلساتك التدريبية القادمة والمنتهية">
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeTab === tab.id
                ? "bg-brand-gradient text-ink-950 border-transparent"
                : "border-ink-600 text-white/60 hover:text-white hover:border-ink-500"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs rounded-full px-1.5 ${
                activeTab === tab.id ? "bg-ink-950/20" : "bg-ink-800"
              }`}
            >
              {countFor(tab.id)}
            </span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((session) => (
            <SessionRow key={session.id} session={session} athleteName={athleteName(session.athleteId)} />
          ))}
        </div>
      ) : (
        <EmptyState icon="calendar" title="لا توجد جلسات في هذا التصنيف" description="جرّب/ي اختيار تصنيف آخر من الأعلى." />
      )}
    </DashboardLayout>
  );
}
