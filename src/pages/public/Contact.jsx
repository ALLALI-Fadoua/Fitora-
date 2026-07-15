import { useState } from "react";
import Icon from "../../components/common/Icon.jsx";
import Input from "../../components/common/Input.jsx";
import Button from "../../components/common/Button.jsx";
import Card from "../../components/common/Card.jsx";

const contactInfo = [
  { icon: "location", label: "العنوان", value: "الجزائر العاصمة، الجزائر" },
  { icon: "mail", label: "البريد الإلكتروني", value: "contact@fitora.dz", dir: "ltr" },
  { icon: "check", label: "الهاتف", value: "+213 555 00 00 00", dir: "ltr" },
];

const emptyForm = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(emptyForm);
  const [sent, setSent] = useState(false);

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // USE_MOCK: لا يوجد باك-إند بعد، هذا مجرد محاكاة لإرسال النموذج
    setSent(true);
    setForm(emptyForm);
  };

  return (
    <div className="max-w-6xl mx-auto px-5 lg:px-8 py-16">
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 bg-brand-gradient-soft border border-brand-400/30 rounded-full px-4 py-1.5 text-xs text-brand-400 mb-5">
          <Icon name="location" className="w-3.5 h-3.5" />
          تواصل معنا
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">نحن هنا لمساعدتك</h1>
        <p className="text-white/45 text-sm mt-3">
          لديك سؤال أو اقتراح؟ راسلنا وسيردّ عليك فريقنا في أقرب وقت.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8">
        {/* معلومات التواصل */}
        <div className="flex flex-col gap-4">
          {contactInfo.map((item) => (
            <Card key={item.label} className="p-5 flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
                <Icon name={item.icon} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-white/40 text-xs">{item.label}</p>
                <p className="text-white text-sm font-medium mt-0.5" dir={item.dir}>
                  {item.value}
                </p>
              </div>
            </Card>
          ))}

          <Card className="p-5">
            <p className="text-white/40 text-xs mb-3">ساعات العمل</p>
            <div className="flex items-center justify-between text-sm text-white/70">
              <span>السبت — الخميس</span>
              <span dir="ltr">09:00 — 18:00</span>
            </div>
          </Card>
        </div>

        {/* نموذج التواصل */}
        <Card className="p-7">
          {sent && (
            <div className="mb-5 p-4 bg-brand-gradient-soft border border-brand-400/30 rounded-xl text-brand-400 text-sm flex items-center gap-2">
              <Icon name="check" className="w-4 h-4 shrink-0" />
              تم إرسال رسالتك بنجاح، سنتواصل معك قريبًا.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="الاسم الكامل"
                value={form.name}
                onChange={handleChange("name")}
                required
              />
              <Input
                type="email"
                placeholder="البريد الإلكتروني"
                value={form.email}
                onChange={handleChange("email")}
                required
              />
            </div>
            <Input
              type="text"
              placeholder="موضوع الرسالة"
              value={form.subject}
              onChange={handleChange("subject")}
              required
            />
            <textarea
              placeholder="اكتب رسالتك هنا..."
              value={form.message}
              onChange={handleChange("message")}
              rows={6}
              required
              className="w-full bg-ink-900 border border-ink-600 rounded-xl px-4 py-3 text-white placeholder:text-white/35 focus:border-brand-400/60 transition-colors outline-none resize-none"
            />
            <Button type="submit" variant="primary" size="md" className="w-full sm:w-fit self-end">
              إرسال الرسالة
              <Icon name="arrowLeft" className="w-4 h-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}