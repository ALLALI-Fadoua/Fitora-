import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Icon from "../../components/common/Icon.jsx";
import Button from "../../components/common/Button.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { adminNavItems } from "../../data/dashboardNav.js";
import { coaches as initialCoaches } from "../../data/coaches.js";
import { getInitials, formatDZD } from "../../utils/format.js";

export default function Coaches() {
  const [coaches, setCoaches] = useState(initialCoaches);

  const toggleVerified = (id) => {
    setCoaches((prev) => prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c)));
  };

  const handleDelete = (id) => {
    setCoaches((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <DashboardLayout navItems={adminNavItems} title="المدربون" subtitle="إدارة حسابات المدربين وتوثيقهم">
      {coaches.length > 0 ? (
        <div className="flex flex-col gap-3">
          {coaches.map((coach) => (
            <Card key={coach.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center text-ink-950 font-bold text-sm shrink-0">
                  {getInitials(coach.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-white text-sm font-semibold truncate">{coach.name}</p>
                    {coach.verified && <Icon name="shield" className="w-3.5 h-3.5 text-brand-400 shrink-0" />}
                  </div>
                  <p className="text-white/40 text-xs mt-1 truncate">
                    {coach.specialty} · {coach.wilaya}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <Badge tone="neutral" icon={<Icon name="star" className="w-3.5 h-3.5 text-brand-400" />}>
                  {coach.rating.toFixed(1)}
                </Badge>
                <span className="text-white/50 text-xs w-24 text-left">{formatDZD(coach.pricePerSession)}</span>
                <Button
                  variant={coach.verified ? "outline" : "primary"}
                  size="sm"
                  onClick={() => toggleVerified(coach.id)}
                >
                  {coach.verified ? "إلغاء التوثيق" : "توثيق"}
                </Button>
                <button
                  onClick={() => handleDelete(coach.id)}
                  className="text-white/40 hover:text-red-400 transition-colors text-xs font-medium"
                >
                  حذف
                </button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="shield" title="لا يوجد مدربون" description="ستظهر هنا طلبات وحسابات المدربين الجدد." />
      )}
    </DashboardLayout>
  );
}