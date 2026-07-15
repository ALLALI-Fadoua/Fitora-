# Fitora — Frontend

منصة إلكترونية للتدريب الرياضي تربط المدربين بالمتدربين في الجزائر.

## المكدس التقني

- React 18 + Vite
- React Router v6
- Tailwind CSS
- Mock data (بدون باك-إند بعد) عبر `src/data/*` و `AuthContext`

## التشغيل

```bash
npm install
npm run dev
```

## حالة المشروع

تم بناء الأساس (Navbar، Footer، الصفحة الرئيسية بكل أقسامها، نظام التصميم،
الهيكل الكامل للصفحات والمسارات) باستخدام بيانات وهمية. الصفحات التالية
جاهزة كهيكل (placeholder) وتنتظر التصميم والمنطق الفعلي في الدفعة القادمة:

- `pages/public/Coaches.jsx`, `CoachDetails.jsx`, `Programs.jsx`, `About.jsx`, `Contact.jsx`
- كل صفحات `pages/athlete`, `pages/coach`, `pages/admin`

## الشعار

الشعار المرفق (F + عدّاء) لم يُدرج بعد؛ استبدلي `public/logo.svg` بالملف الفعلي
عند جاهزيته — كل الأماكن التي تستخدمه (`Navbar`, `Footer`) تشير بالفعل إلى
`/logo.svg` فلا حاجة لتغيير الكود.

## الهوية البصرية

- التدرج: `from-emerald-400 to-teal-500`
- الخلفية: أسود/رمادي غامق (`ink-950` → `ink-700`)
- الخط: Cairo، اتجاه RTL بالكامل
- الأيقونات: SVG أحادية اللون فقط، بدون أي رموز تعبيرية (emoji)
