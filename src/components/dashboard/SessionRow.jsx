import Icon from "../common/Icon.jsx";
import Badge from "../common/Badge.jsx";

const statusTone = {
  upcoming: "brand",
  completed: "neutral",
  cancelled: "outline",
};

const statusLabel = {
  upcoming: "قادمة",
  completed: "منتهية",
  cancelled: "ملغاة",
};

export default function SessionRow({ session, athleteName }) {
  return (
    <div className="flex items-center gap-4 p-4 bg-ink-800/50 border border-ink-700 rounded-xl">
      <div className="w-11 h-11 rounded-xl bg-ink-700 flex items-center justify-center text-white/70 font-bold text-sm shrink-0">
        {athleteName.split(" ")[0][0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-semibold truncate">{athleteName}</p>
        <p className="text-white/40 text-xs mt-1 flex items-center gap-1.5">
          <Icon name="calendar" className="w-3.5 h-3.5" />
          {session.date} — {session.time}
        </p>
      </div>
      <Badge tone={statusTone[session.status]}>{statusLabel[session.status]}</Badge>
    </div>
  );
}
