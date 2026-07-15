import Icon from "../common/Icon.jsx";
import Card from "../common/Card.jsx";

export default function StatCard({ icon, label, value, trend }) {
  return (
    <Card className="p-5 flex items-start justify-between">
      <div>
        <p className="text-white/45 text-xs">{label}</p>
        <p className="text-2xl font-extrabold text-white mt-2">{value}</p>
        {trend && <p className="text-brand-400 text-xs mt-1.5">{trend}</p>}
      </div>
      <div className="w-10 h-10 rounded-xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 shrink-0">
        <Icon name={icon} className="w-5 h-5" />
      </div>
    </Card>
  );
}
