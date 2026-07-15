import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Badge from "../../components/common/Badge.jsx";
import EmptyState from "../../components/common/EmptyState.jsx";
import { adminNavItems } from "../../data/dashboardNav.js";
import { users as initialUsers } from "../../data/users.js";
import { getInitials } from "../../utils/format.js";

const roleTone = { admin: "brand", coach: "outline", athlete: "neutral" };
const roleLabel = { admin: "إدارة", coach: "مدرب", athlete: "متدرب" };

const tabs = [
  { id: "all", label: "الكل" },
  { id: "athlete", label: "متدربون" },
  { id: "coach", label: "مدربون" },
  { id: "admin", label: "إدارة" },
];

export default function Users() {
  const [users, setUsers] = useState(initialUsers);
  const [activeTab, setActiveTab] = useState("all");

  const filtered = activeTab === "all" ? users : users.filter((u) => u.role === activeTab);
  const countFor = (id) => (id === "all" ? users.length : users.filter((u) => u.role === id).length);

  const handleDelete = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <DashboardLayout navItems={adminNavItems} title="المستخدمون" subtitle="إدارة حسابات المتدربين والمدربين والإدارة">
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
          {filtered.map((user) => (
            <Card key={user.id} className="p-4 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-brand-gradient flex items-center justify-center text-ink-950 font-bold text-sm shrink-0">
                {getInitials(user.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-semibold truncate">{user.name}</p>
                <p className="text-white/40 text-xs mt-1 truncate" dir="ltr">
                  {user.email}
                </p>
              </div>
              <Badge tone={roleTone[user.role]}>{roleLabel[user.role]}</Badge>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-white/40 hover:text-red-400 transition-colors text-xs font-medium shrink-0"
              >
                حذف
              </button>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState icon="users" title="لا يوجد مستخدمون في هذا التصنيف" description="جرّب/ي اختيار تصنيف آخر من الأعلى." />
      )}
    </DashboardLayout>
  );
}