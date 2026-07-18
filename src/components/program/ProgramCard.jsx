import { Link } from "react-router-dom";
import Card from "../common/Card.jsx";
import Badge from "../common/Badge.jsx";
import Icon from "../common/Icon.jsx";
import { formatDZD, getInitials } from "../../utils/format.js";

export default function ProgramCard({ program, coach, category }) {
  return (
    <Card hoverable className="p-5 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-white font-semibold text-[15px] leading-6">{program.title}</h3>
        {category && (
          <Badge tone="brand" icon={<Icon name={category.icon} className="w-3.5 h-3.5" />}>
            {category.name}
          </Badge>
        )}
      </div>

      {coach && (
        <Link
          to={`/coaches/${coach.id}`}
          className="flex items-center gap-2.5 mb-4 group/coach w-fit"
        >
          <span className="w-7 h-7 rounded-full bg-brand-gradient flex items-center justify-center text-ink-950 text-[10px] font-bold shrink-0">
            {getInitials(coach.name)}
          </span>
          <span className="text-white/60 text-xs group-hover/coach:text-brand-400 transition-colors">
            {coach.name}
          </span>
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3 text-xs text-white/50 mb-4">
        <span className="flex items-center gap-1.5">
          <Icon name="calendar" className="w-3.5 h-3.5" />
          {program.durationWeeks} أسابيع
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="check" className="w-3.5 h-3.5" />
          {program.sessionsIncluded} جلسة
        </span>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-ink-700">
        <span className="text-white font-bold">{formatDZD(program.price)}</span>
        {coach && (
          <Link
            to={`/coaches/${coach.id}`}
            className="text-brand-400 text-sm font-semibold hover:text-brand-400/80 transition-colors flex items-center gap-1"
          >
            عرض التفاصيل
            <Icon name="arrowLeft" className="w-4 h-4" />
          </Link>
        )}
      </div>
    </Card>
  );
}