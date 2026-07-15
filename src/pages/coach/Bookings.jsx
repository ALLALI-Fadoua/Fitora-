import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Button from "../../components/common/Button.jsx";
import Icon from "../../components/common/Icon.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { coachNavItems } from "../../data/dashboardNav.js";
import { coaches } from "../../data/coaches.js";
import { bookings as initialBookings } from "../../data/bookings.js";
import { programs } from "../../data/programs.js";
import { athletes } from "../../data/athletes.js";

const currentCoach = coaches[0];
const athleteName = (id) => athletes.find((a) => a.id === id)?.name || "متدرب";
const programTitle = (id) => programs.find((p) => p.id === id)?.title || "برنامج";

const statusTone = { confirmed: "brand", pending: "outline", declined: "neutral" };
const statusLabel = { confirmed: "مؤكّد", pending: "بانتظار الرد", declined: "مرفوض" };

export default function Bookings() {
  const [bookings, setBookings] = useState(
    initialBookings.filter((b) => b.coachId === currentCoach.id)
  );

  const updateStatus = (id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const pending = bookings.filter((b) => b.status === "pending");
  const others = bookings.filter((b) => b.status !== "pending");

  return (
    <DashboardLayout navItems={coachNavItems} title="الحجوزات" subtitle="راجع وأكّد طلبات الحجز الواردة">
      {bookings.length === 0 ? (
        <EmptyState icon="check" title="لا توجد حجوزات بعد" description="ستظهر هنا طلبات الحجز فور وصولها من المتدربين." />
      ) : (
        <div className="flex flex-col gap-8">
          {pending.length > 0 && (
            <div>
              <h3 className="text-white font-semibold text-sm mb-3">بانتظار الرد ({pending.length})</h3>
              <div className="flex flex-col gap-3">
                {pending.map((booking) => (
                  <Card key={booking.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-ink-700 flex items-center justify-center text-white/70 font-bold text-sm shrink-0">
                        {athleteName(booking.athleteId).split(" ")[0][0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{athleteName(booking.athleteId)}</p>
                        <p className="text-white/40 text-xs mt-1 truncate">{programTitle(booking.programId)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button variant="outline" size="sm" onClick={() => updateStatus(booking.id, "declined")} className="flex-1 sm:flex-none">
                        رفض
                      </Button>
                      <Button variant="primary" size="sm" onClick={() => updateStatus(booking.id, "confirmed")} className="flex-1 sm:flex-none">
                        <Icon name="check" className="w-4 h-4" />
                        قبول
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {others.length > 0 && (
            <div>
              <h3 className="text-white font-semibold text-sm mb-3">سجل الحجوزات</h3>
              <div className="flex flex-col gap-3">
                {others.map((booking) => (
                  <Card key={booking.id} className="p-4 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-ink-700 flex items-center justify-center text-white/70 font-bold text-sm shrink-0">
                      {athleteName(booking.athleteId).split(" ")[0][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{athleteName(booking.athleteId)}</p>
                      <p className="text-white/40 text-xs mt-1 truncate">{programTitle(booking.programId)}</p>
                    </div>
                    <Badge tone={statusTone[booking.status]}>{statusLabel[booking.status]}</Badge>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}