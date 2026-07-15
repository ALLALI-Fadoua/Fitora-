import { Link } from "react-router-dom";
import Icon from "../common/Icon.jsx";
import Badge from "../common/Badge.jsx";
import Card from "../common/Card.jsx";

const initialsOf = (name) => name.trim().split(" ").slice(0, 2).map((w) => w[0]).join("");

export default function CoachCard({ coach }) {
  return (
    <Card hoverable className="p-5 flex flex-col">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-gradient flex items-center justify-center text-ink-950 font-bold text-lg shrink-0">
          {initialsOf(coach.name)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h3 className="text-white font-semibold text-[15px] truncate">{coach.name}</h3>
            {coach.verified && <Icon name="shield" className="w-4 h-4 text-brand-400 shrink-0" />}
          </div>
          <p className="text-white/45 text-xs mt-1 truncate">{coach.specialty}</p>
          <p className="text-white/35 text-xs mt-1 flex items-center gap-1">
            <Icon name="location" className="w-3.5 h-3.5" />
            {coach.wilaya}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge tone="neutral" icon={<Icon name="star" className="w-3.5 h-3.5 text-brand-400" />}>
          {coach.rating.toFixed(1)} ({coach.reviewsCount})
        </Badge>
        <Badge tone="outline">{coach.sessionsCount} جلسة</Badge>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-ink-700">
        <div>
          <span className="text-white font-bold text-lg">{coach.pricePerSession.toLocaleString("ar-DZ")}</span>
          <span className="text-white/40 text-xs"> دج / الجلسة</span>
        </div>
        <Link
          to={`/coaches/${coach.id}`}
          className="text-brand-400 text-sm font-semibold hover:text-brand-400/80 transition-colors flex items-center gap-1"
        >
          عرض الملف
          <Icon name="arrowLeft" className="w-4 h-4" />
        </Link>
      </div>
    </Card>
  );
}
