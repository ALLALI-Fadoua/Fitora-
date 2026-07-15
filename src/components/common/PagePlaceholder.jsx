import Icon from "./Icon.jsx";

export default function PagePlaceholder({ icon = "shield", title, description }) {
  return (
    <div className="max-w-3xl mx-auto px-5 py-24 text-center">
      <div className="w-16 h-16 rounded-2xl bg-brand-gradient-soft border border-brand-400/20 flex items-center justify-center text-brand-400 mx-auto mb-6">
        <Icon name={icon} className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
      <p className="text-white/50 mt-3 leading-7">{description}</p>
    </div>
  );
}
