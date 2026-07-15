import Icon from "./Icon.jsx";

export default function EmptyState({ icon = "search", title, description, action = null }) {
  return (
    <div className="flex flex-col items-center text-center py-16 px-6">
      <div className="w-14 h-14 rounded-2xl bg-ink-800 border border-ink-600 flex items-center justify-center mb-4 text-white/40">
        <Icon name={icon} className="w-6 h-6" />
      </div>
      <h4 className="text-white font-semibold mb-1">{title}</h4>
      {description && <p className="text-white/50 text-sm max-w-sm mb-4">{description}</p>}
      {action}
    </div>
  );
}
