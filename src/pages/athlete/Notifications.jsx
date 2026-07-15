import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Icon from "../../components/common/Icon.jsx";
import Button from "../../components/common/Button.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { athleteNavItems } from "../../data/dashboardNav.js";
import { notifications as initialNotifications } from "../../data/notifications.js";

const CURRENT_USER_ID = "u1";

export default function Notifications() {
  const [notifications, setNotifications] = useState(
    initialNotifications.filter((n) => n.userId === CURRENT_USER_ID)
  );

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <DashboardLayout navItems={athleteNavItems} title="الإشعارات" subtitle="آخر التحديثات المتعلقة بحجوزاتك">
      {notifications.length > 0 ? (
        <>
          {unreadCount > 0 && (
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                تعليم الكل كمقروء
              </Button>
            </div>
          )}
          <div className="flex flex-col gap-3">
            {notifications.map((notif) => (
              <button
                key={notif.id}
                onClick={() => markAsRead(notif.id)}
                className={`w-full flex items-start gap-3 p-4 rounded-xl border text-right transition-colors ${
                  notif.read
                    ? "bg-ink-900 border-ink-700"
                    : "bg-brand-gradient-soft border-brand-400/30"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                    notif.read ? "bg-ink-800 text-white/40" : "bg-brand-gradient text-ink-950"
                  }`}
                >
                  <Icon name="quote" className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${notif.read ? "text-white/60" : "text-white font-medium"}`}>
                    {notif.message}
                  </p>
                </div>
                {!notif.read && <span className="w-2 h-2 rounded-full bg-brand-400 mt-2 shrink-0" />}
              </button>
            ))}
          </div>
        </>
      ) : (
        <EmptyState icon="quote" title="لا توجد إشعارات" description="ستصلك هنا إشعارات تأكيد الحجوزات والتذكيرات." />
      )}
    </DashboardLayout>
  );
}