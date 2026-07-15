import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout.jsx";
import Card from "../../components/common/Card.jsx";
import Button from "../../components/common/Button.jsx";
import Input from "../../components/common/Input.jsx";
import Modal from "../../components/common/Modal.jsx";
import Icon from "../../components/common/Icon.jsx";
import { adminNavItems } from "../../data/dashboardNav.js";
import { categories as initialCategories } from "../../data/categories.js";

const emptyForm = { name: "", nameEn: "" };

export default function Categories() {
  const [categories, setCategories] = useState(initialCategories);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const handleAdd = (e) => {
    e.preventDefault();
    const newCategory = {
      id: `cat-local-${Date.now()}`,
      name: form.name,
      nameEn: form.nameEn,
      icon: "flex",
      coachesCount: 0,
    };
    setCategories((prev) => [newCategory, ...prev]);
    setForm(emptyForm);
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <DashboardLayout navItems={adminNavItems} title="التصنيفات" subtitle="إدارة مجالات التدريب المعروضة على المنصة">
      <div className="flex justify-end mb-6">
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Icon name="flex" className="w-4 h-4" />
          تصنيف جديد
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="p-5 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 mb-3">
              <Icon name={category.icon} className="w-6 h-6" />
            </div>
            <p className="text-white text-sm font-semibold">{category.name}</p>
            <p className="text-white/40 text-xs mt-1" dir="ltr">
              {category.nameEn}
            </p>
            <p className="text-white/40 text-xs mt-2">{category.coachesCount} مدرب</p>
            <button
              onClick={() => handleDelete(category.id)}
              className="text-white/40 hover:text-red-400 transition-colors text-xs font-medium mt-3"
            >
              حذف
            </button>
          </Card>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="تصنيف جديد">
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <Input
            placeholder="الاسم بالعربية"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            placeholder="Name in English"
            dir="ltr"
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
            required
          />
          <Button type="submit" variant="primary" size="md" className="w-full mt-1">
            إضافة التصنيف
          </Button>
        </form>
      </Modal>
    </DashboardLayout>
  );
}