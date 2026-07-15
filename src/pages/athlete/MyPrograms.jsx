import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Icon from "../../components/common/Icon.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import { athleteNavItems } from "../../data/dashboardNav.js";
import { athletes } from "../../data/athletes.js";
import { bookings } from "../../data/bookings.js";
import { programs } from "../../data/programs.js";
import { coaches } from "../../data/coaches.js";
import { formatDZD } from "../../utils/format.js";

const currentAthlete = athletes[0];
const coachOf = (id) => coaches.find((c) => c.id === id);

export default function MyPrograms() {
  const myProgramIds = [
    ...new Set(
      bookings
        .filter((b) => b.athleteId === currentAthlete.id && b.status === "confirmed")
        .map((b) => b.programId)
    ),
  ];
  const myPrograms = programs.filter((p) => myProgramIds.includes(p.id));

  return (
    <DashboardLayout navItems={athleteNavItems} title="برامجي" subtitle="البرامج التدريبية المشترك بها">
      {myPrograms.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {myPrograms.map((program) => {
            const coach = coachOf(program.coachId);
            return (
              <Card key={program.id} hoverable className="p-5 flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="text-white font-semibold text-[15px] leading-6">{program.title}</h3>
                  <Badge tone="brand">نشط</Badge>
                </div>

                <p className="text-white/45 text-xs mb-4">مع {coach?.name}</p>

                <div className="grid grid-cols-2 gap-3 text-xs text-white/50 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Icon name="calendar" className="w-3.5 h-3.5" />
                    {program.durationWeeks} أسابيع
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="check" className="w-3.5 h-3.5" />
                    {program.sessionsIncluded} جلسة
                  </span>
                </div>

                <div className="mt-auto pt-4 border-t border-ink-700 flex items-center justify-between">
                  <span className="text-white font-bold text-sm">{formatDZD(program.price)}</span>
                  <span className="text-white/40 text-xs">{coach?.wilaya}</span>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="flex"
          title="لا توجد برامج نشطة بعد"
          description="اشترك في برنامج تدريبي مع أحد المدربين ليظهر هنا."
        />
      )}
    </DashboardLayout>
  );
}