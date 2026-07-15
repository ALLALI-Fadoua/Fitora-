const variants = {
  primary:
    "bg-brand-gradient text-ink-950 font-semibold shadow-brand hover:brightness-110 active:brightness-95",
  outline:
    "border border-ink-600 text-white hover:border-brand-400/60 hover:bg-ink-800",
  ghost: "text-white/80 hover:text-white hover:bg-ink-800",
};

const sizes = {
  sm: "text-sm px-4 py-2",
  md: "text-[15px] px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  as: Component = "button",
  className = "",
  ...props
}) {
  return (
    <Component
      className={`inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}
