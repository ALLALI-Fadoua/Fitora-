// دوال مساعدة عامة تُستخدم عبر المكونات
export const formatDZD = (amount) => `${amount.toLocaleString("ar-DZ")} دج`;

export const getInitials = (name = "") =>
  name.trim().split(" ").slice(0, 2).map((w) => w[0]).join("");

// يتحقق أن المسار يطابق البادئة كمقطع كامل (وليس مجرد تطابق نصي جزئي)،
// حتى لا يُعامَل "/coaches" كأنه يبدأ بـ "/coach" خطأً.
export const matchesRoutePrefix = (pathname, prefix) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);