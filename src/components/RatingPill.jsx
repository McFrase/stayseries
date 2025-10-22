function getLabel(rating) {
  if (rating >= 9) return 'Superb';
  if (rating >= 8.5) return 'Excellent';
  if (rating >= 8) return 'Very good';
  return 'Good';
}

export default function RatingPill({ rating, label }) {
  return (
    <span className="rating-pill">
      <strong>{Number(rating).toFixed(1)}</strong>
      <span>{label ?? getLabel(rating)}</span>
    </span>
  );
}

