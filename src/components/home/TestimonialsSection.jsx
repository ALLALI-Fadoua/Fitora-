import { reviews } from "../../data/reviews.js";
import ReviewCard from "../review/ReviewCard.jsx";

export default function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 lg:px-8 py-14">
      <div className="text-center max-w-lg mx-auto mb-10">
        <h2 className="text-2xl font-bold text-white">ماذا يقول متدربونا؟</h2>
        <p className="text-white/45 text-sm mt-2">تجارب حقيقية من متدربين وصلوا لأهدافهم مع Fitora</p>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </section>
  );
}
