export default function Card({ children, className = "", hoverable = false, as: Component = "div" }) {
  return (
    <Component
      className={`bg-ink-900 border border-ink-700 rounded-2xl ${
        hoverable ? "transition-all duration-300 hover:border-brand-400/40 hover:-translate-y-1 hover:shadow-brand" : ""
      } ${className}`}
    >
      {children}
    </Component>
  );
}
