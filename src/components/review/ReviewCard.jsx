import Icon from "../common/Icon.jsx";
import Card from "../common/Card.jsx";

export default function ReviewCard({ review }) {
  return (
    <Card className="p-6 flex flex-col h-full">
      <Icon name="quote" className="w-6 h-6 text-brand-400/50 mb-4" />
      <p className="text-white/70 text-[15px] leading-7 flex-1">{review.text}</p>
      <div className="flex items-center justify-between mt-5 pt-4 border-t border-ink-700">
        <span className="text-white font-semibold text-sm">{review.athleteName}</span>
        <span className="flex items-center gap-1 text-brand-400 text-sm">
          <Icon name="star" className="w-4 h-4" />
          {review.rating}
        </span>
      </div>
    </Card>
  );
}
