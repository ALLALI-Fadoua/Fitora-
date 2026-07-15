import Icon from "./Icon.jsx";

export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-ink-900 border border-ink-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors"
            aria-label="إغلاق"
          >
            <Icon name="close" className="w-5 h-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
