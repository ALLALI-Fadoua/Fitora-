// عناصر القائمة الجانبية لكل لوحة تحكم — مصدر واحد يُستخدم في كل الصفحات لتفادي التكرار
export const coachNavItems = [
  { to: "/coach", label: "الرئيسية", icon: "shield", end: true },
  { to: "/coach/sessions", label: "الجلسات", icon: "calendar" },
  { to: "/coach/programs", label: "البرامج التدريبية", icon: "flex" },
  { to: "/coach/bookings", label: "الحجوزات", icon: "check" },
  { to: "/coach/reviews", label: "التقييمات", icon: "star" },
  { to: "/coach/profile", label: "الملف الشخصي", icon: "users" },
];

export const athleteNavItems = [
  { to: "/athlete", label: "الرئيسية", icon: "shield", end: true },
  { to: "/athlete/bookings", label: "حجوزاتي", icon: "calendar" },
  { to: "/athlete/programs", label: "برامجي", icon: "flex" },
  { to: "/athlete/favorites", label: "المفضلة", icon: "star" },
  { to: "/athlete/notifications", label: "الإشعارات", icon: "quote" },
  { to: "/athlete/profile", label: "الملف الشخصي", icon: "users" },
];

export const adminNavItems = [
  { to: "/admin", label: "الرئيسية", icon: "shield", end: true },
  { to: "/admin/users", label: "المستخدمون", icon: "users" },
  { to: "/admin/coaches", label: "المدربون", icon: "dumbbell" },
  { to: "/admin/categories", label: "التصنيفات", icon: "flex" },
  { to: "/admin/programs", label: "البرامج", icon: "calendar" },
  { to: "/admin/bookings", label: "الحجوزات", icon: "check" },
  { to: "/admin/reviews", label: "التقييمات", icon: "star" },
  { to: "/admin/settings", label: "الإعدادات", icon: "shield" },
];
