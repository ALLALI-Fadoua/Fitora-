export default function Input({ icon = null, className = "", containerClassName = "", ...props }) {
  return (
    <div className={`relative flex items-center ${containerClassName}`}>
      {icon && (
        <span className="absolute inset-y-0 right-4 flex items-center text-white/40 pointer-events-none">
          {icon}
        </span>
      )}
      <input
        className={`w-full bg-ink-900 border border-ink-600 rounded-xl py-3 ${
          icon ? "pr-12 pl-4" : "px-4"
        } text-white placeholder:text-white/35 focus:border-brand-400/60 transition-colors outline-none ${className}`}
        {...props}
      />
    </div>
  );
}
