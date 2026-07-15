import { useMemo, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { athleteNavItems } from "../../data/dashboardNav.js";
import { athletes } from "../../data/athletes.js";
import { bookings } from "../../data/bookings.js";
import { programs } from "../../data/programs.js";
import { coaches } from "../../data/coaches.js";

const currentAthlete = athletes[0];
const coachOf = (id) => coaches.find((c) => c.id === id);
const programTitle = (id) => programs.find((p) => p.id === id)?.title || "برنامج";

const statusTone = { confirmed: "brand", pending: "outline", declined: "neutral" };
const statusLabel = { confirmed: "مؤكّد", pending: "بانتظار الرد", declined: "مرفوض" };

const tabs = [
  { id: "all", label: "الكل" },
  { id: "confirmed", label: "مؤكّدة" },
  { id: "pending", label: "بانتظار الرد" },
  { id: "declined", label: "مرفوضة" },
];

export default function MyBookings() {
  const [activeTab, setActiveTab] = useState("all");

  const myBookings = useMemo(
    () => bookings.filter((b) => b.athleteId === currentAthlete.id),
    []
  );

  const filtered = activeTab === "all" ? myBookings : myBookings.filter((b) => b.status === activeTab);
  const countFor = (id) => (id === "all" ? myBookings.length : myBookings.filter((b) => b.status === id).length);

  return (
    <DashboardLayout navItems={athleteNavItems} title="حجوزاتي" subtitle="جلساتك المحجوزة القادمة والسابقة">
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
            <span className={`text-xs rounded-full px-1.5 ${activeTab === tab.id ? "bg-ink-950/20" : "bg-ink-800"}`}>
              {countFor(tab.id)}
            </span>
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="flex flex-col gap-3">
          {filtered.map((booking) => {
            const coach = coachOf(booking.coachId);
            return (
              <Card key={booking.id} className="p-4 flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center text-ink-950 font-bold text-sm shrink-0">
                  {coach?.name.split(" ")[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{coach?.name}</p>
                  <p className="text-white/40 text-xs mt-1 truncate">
                    {programTitle(booking.programId)} · {coach?.wilaya}
                  </p>
                </div>
                <Badge tone={statusTone[booking.status]}>{statusLabel[booking.status]}</Badge>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState icon="calendar" title="لا توجد حجوزات في هذا التصنيف" description="جرّب/ي اختيار تصنيف آخر من الأعلى." />
      )}
    </DashboardLayout>
  );
}