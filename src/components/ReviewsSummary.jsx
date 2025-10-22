export default function ReviewsSummary({
  average = 8.5,
  totalReviews = 860,
  breakdown = {
    Staff: 8.2,
    Facilities: 8.2,
    Cleanliness: 8.4,
    Comfort: 8.3,
    'Value for money': 8.1,
    'Free WiFi': 8.0,
  },
  testimonials = [],
}) {
  const entries = Object.entries(breakdown);

  return (
    <section className="reviews-summary">
      <header className="reviews-summary__header">
        <div>
          <h3>Guest reviews</h3>
          <p>See what other guests loved about their stay.</p>
        </div>
        <div className="reviews-summary__score">
          <strong>{average.toFixed(1)}</strong>
          <span>Very good · {totalReviews} reviews</span>
        </div>
      </header>
      <div className="reviews-summary__grid">
        {entries.map(([label, score]) => (
          <div key={label} className="reviews-summary__item">
            <div className="reviews-summary__item-top">
              <span>{label}</span>
              <span>{score.toFixed(1)}</span>
            </div>
            <div className="reviews-summary__bar">
              <span style={{ width: `${(score / 10) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="reviews-summary__testimonials">
        {(testimonials.length ? testimonials : defaultTestimonials).map((review) => (
          <article key={review.name} className="reviews-summary__card">
            <header>
              <h4>{review.name}</h4>
              <span>{review.location}</span>
            </header>
            <p>{review.comment}</p>
            <button type="button" className="btn btn-ghost reviews-summary__link">
              Read more
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

const defaultTestimonials = [
  {
    name: 'Tolu Jayasimi',
    location: 'Nigeria',
    comment:
      'The rooms are a good size with all the necessary furnishings, such as a work desk and a small couch. Internet was also really good!',
  },
  {
    name: 'Adaobi N.',
    location: 'Nigeria',
    comment:
      'Excellent location and staff were very helpful throughout our stay. Breakfast buffet was also top-notch.',
  },
  {
    name: 'Chidi E.',
    location: 'Nigeria',
    comment:
      'Loved the ambience and the amenities. The spa treatment was the highlight and I would definitely book again.',
  },
];

