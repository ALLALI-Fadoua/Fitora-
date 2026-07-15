import { Link } from "react-router-dom";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import StatusDonutChart from "../../components/dashboard/StatusDonutChart.jsx";
import MiniEntityCard from "../../components/dashboard/MiniEntityCard.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import Icon from "../../components/common/Icon.jsx";
import { adminNavItems } from "../../data/dashboardNav.js";
import { coaches } from "../../data/coaches.js";
import { athletes } from "../../data/athletes.js";
import { bookings } from "../../data/bookings.js";
import { programs } from "../../data/programs.js";
import { reviews } from "../../data/reviews.js";
import { users } from "../../data/users.js";
import { getInitials } from "../../utils/format.js";

const coachName = (id) => coaches.find((c) => c.id === id)?.name || "مدرب";
const athleteName = (id) => athletes.find((a) => a.id === id)?.name || "متدرب";

const statusTone = { confirmed: "brand", pending: "outline", declined: "neutral" };
const statusLabel = { confirmed: "مؤكّد", pending: "بانتظار الرد", declined: "مرفوض" };

const roleTone = { admin: "brand", coach: "outline", athlete: "neutral" };
const roleLabel = { admin: "إدارة", coach: "مدرب", athlete: "متدرب" };

export default function Dashboard() {
  const pendingBookings = bookings.filter((b) => b.status === "pending");
  const unverifiedCoaches = coaches.filter((c) => !c.verified);
  const recentUsers = [...users].slice(-6).reverse();
  const recentBookings = [...bookings].slice(-6).reverse();
  const recentReviews = [...reviews].slice(-3).reverse();

  const usersChartData = [
    { name: "متدربون", value: athletes.length, color: "#34d399" },
    { name: "مدربون", value: coaches.length, color: "#0d9488" },
    { name: "إدارة", value: users.filter((u) => u.role === "admin").length, color: "#3f4647" },
  ];

  const bookingsChartData = [
    { name: "مؤكّدة", value: bookings.filter((b) => b.status === "confirmed").length, color: "#34d399" },
    { name: "بانتظار الرد", value: bookings.filter((b) => b.status === "pending").length, color: "#0d9488" },
    { name: "مرفوضة", value: bookings.filter((b) => b.status === "declined").length, color: "#3f4647" },
  ];

  return (
    <DashboardLayout navItems={adminNavItems} title="لوحة تحكم الإدارة" subtitle="نظرة عامة على نشاط المنصة">
      {/* بطاقات الإحصائيات الرئيسية */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard icon="users" label="إجمالي المتدربين" value={athletes.length} />
        <StatCard icon="dumbbell" label="إجمالي المدربين" value={coaches.length} />
        <StatCard icon="flex" label="البرامج النشطة" value={programs.length} />
        <StatCard icon="check" label="إجمالي الحجوزات" value={bookings.length} />
      </div>

      {/* رسوم بيانية للتوزيع */}
      <div className="grid sm:grid-cols-2 gap-6 mb-6">
        <StatusDonutChart title="توزيع المستخدمين" data={usersChartData} />
        <StatusDonutChart title="توزيع الحجوزات حسب الحالة" data={bookingsChartData} />
      </div>

      {/* بطاقات تنبيه تحتاج متابعة */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <Link
          to="/admin/bookings"
          className="flex items-center gap-3 p-4 bg-ink-900 border border-ink-700 rounded-2xl hover:border-brand-400/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
            <Icon name="calendar" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{pendingBookings.length} حجوزات بانتظار الرد</p>
            <p className="text-white/40 text-xs mt-0.5">راجعها من صفحة الحجوزات</p>
          </div>
        </Link>

        <Link
          to="/admin/coaches"
          className="flex items-center gap-3 p-4 bg-ink-900 border border-ink-700 rounded-2xl hover:border-brand-400/40 transition-colors"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
            <Icon name="shield" className="w-5 h-5" />
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{unverifiedCoaches.length} مدربين بانتظار التوثيق</p>
            <p className="text-white/40 text-xs mt-0.5">راجعهم من صفحة المدربين</p>
          </div>
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* آخر المستخدمين — بطاقات بدل قائمة */}
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">آخر المستخدمين المسجّلين</h3>
            <Link to="/admin/users" className="text-brand-400 text-xs font-semibold hover:text-brand-400/80">
              عرض الكل
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {recentUsers.map((user) => (
              <MiniEntityCard
                key={user.id}
                initials={getInitials(user.name)}
                title={user.name}
                subtitle={user.email}
                badge={<Badge tone={roleTone[user.role]}>{roleLabel[user.role]}</Badge>}
              />
            ))}
          </div>
        </Card>

        {/* آخر التقييمات */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">آخر التقييمات</h3>
            <Link to="/admin/reviews" className="text-brand-400 text-xs font-semibold hover:text-brand-400/80">
              الكل
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            {recentReviews.map((review) => (
              <div key={review.id} className="pb-4 border-b border-ink-700 last:border-0 last:pb-0">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white text-sm font-semibold">{review.athleteName}</span>
                  <Badge tone="neutral" icon={<Icon name="star" className="w-3.5 h-3.5 text-brand-400" />}>
                    {review.rating}
                  </Badge>
                </div>
                <p className="text-white/50 text-xs leading-6">{review.text}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* آخر الحجوزات — بطاقات بدل قائمة */}
      <Card className="p-5 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">آخر الحجوزات</h3>
          <Link to="/admin/bookings" className="text-brand-400 text-xs font-semibold hover:text-brand-400/80">
            عرض الكل
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {recentBookings.map((booking) => (
            <MiniEntityCard
              key={booking.id}
              initials={athleteName(booking.athleteId).split(" ")[0][0]}
              title={athleteName(booking.athleteId)}
              subtitle={`مع ${coachName(booking.coachId)}`}
              badge={<Badge tone={statusTone[booking.status]}>{statusLabel[booking.status]}</Badge>}
            />
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
}