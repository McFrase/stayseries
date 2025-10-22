import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useUi } from '@/context/UiContext';
import { formatCurrencyCode } from '@/utils/formatCurrency';

function Stars({ count }) {
  return (
    <span className="property-card__stars" aria-label={`${count} star rating`}>
      {'★'.repeat(count)}
    </span>
  );
}

function getRatingLabel(value) {
  if (value >= 9) return 'Superb';
  if (value >= 8.5) return 'Excellent';
  if (value >= 8) return 'Very good';
  return 'Good';
}

export default function PropertyCard({
  property,
  variant = 'grid',
  showRating = true,
  showAction = true,
  showStars = true,
}) {
  const { currency: activeCurrency } = useUi();

  if (!property) return null;

  const {
    id,
    name,
    city,
    area,
    rating,
    stars,
    price,
    currency,
    images,
    reviews = 860,
  } = property;

  const image = images?.[0];
  const ratingLabel = getRatingLabel(rating);
  const displayCurrency = activeCurrency || currency;
  const priceLabel = formatCurrencyCode(price, displayCurrency);
  const locationLabel = `${area}, ${city}`;

  return (
    <article className={clsx('property-card', `property-card--${variant}`)}>
      <Link to={`/property/${id}`} className="property-card__media" aria-label={name}>
        {image ? <img src={image} alt={`${name} preview`} /> : <div className="property-card__placeholder" />}
      </Link>
      <div className="property-card__content">
        <div className="property-card__body">
          <div className="property-card__header">
            <h3 className="property-card__name">
              <Link to={`/property/${id}`}>{name}</Link>
            </h3>
           {showStars ? <Stars count={stars} /> : null}
          </div>
          <Link
            to={`/search?q=${encodeURIComponent(city)}`}
            className="property-card__location"
          >
            {locationLabel}
          </Link>
          {showRating ? (
            <div className="property-card__rating">
              <span className="property-card__rating-score">{rating.toFixed(1)}</span>
              <div className="property-card__rating-details">
                <span className="property-card__rating-label">{ratingLabel}</span>
                <span className="property-card__reviews">{`${Number(reviews).toLocaleString()} reviews`}</span>
              </div>
            </div>
          ) : null}
        </div>
        <div className="property-card__divider" aria-hidden="true" />
        <footer className="property-card__footer">
          <div className="property-card__pricing">
            <span className="property-card__price">{priceLabel}</span>
            <span className="property-card__per-night">per night</span>
          </div>
          {showAction ? (
            <button type="button" className="btn btn-secondary property-card__cta">
              View prices
            </button>
          ) : null}
        </footer>
      </div>
    </article>
  );
}
