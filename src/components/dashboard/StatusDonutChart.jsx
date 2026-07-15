import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import Card from "../common/Card.jsx";

// دائري (Donut) لعرض توزيع البيانات حسب الحالة — بديل بصري لقوائم الأرقام الجافة
// data: [{ name: "قادمة", value: 3, color: "#34d399" }, ...]
export default function StatusDonutChart({ title, data, total }) {
  const sum = total ?? data.reduce((acc, d) => acc + d.value, 0);

  return (
    <Card className="p-5">
      <h3 className="text-white font-semibold mb-4">{title}</h3>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32 shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={38}
                outerRadius={60}
                paddingAngle={sum > 0 ? 3 : 0}
                stroke="none"
              >
                {data.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#0d0f10",
                  border: "1px solid #1f2324",
                  borderRadius: 10,
                  fontSize: 12,
                  color: "#fff",
                }}
                itemStyle={{ color: "#fff" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xl font-extrabold text-white">{sum}</span>
            <span className="text-[10px] text-white/40">الإجمالي</span>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2.5 min-w-0">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2.5 text-sm">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
              <span className="text-white/60 flex-1 truncate">{entry.name}</span>
              <span className="text-white font-semibold">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}