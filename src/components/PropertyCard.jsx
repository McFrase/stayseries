import { Link } from 'react-router-dom';
import clsx from 'clsx';
import RatingPill from './RatingPill';
import { formatCurrency } from '@/utils/formatCurrency';

function Stars({ count }) {
  return (
    <span className="property-card__stars" aria-label={`${count} star rating`}>
      {'★'.repeat(count)}
    </span>
  );
}

export default function PropertyCard({ property, variant = 'grid' }) {
  if (!property) return null;

  const { id, name, city, area, rating, stars, price, currency, blurb, images } = property;
  const image = images?.[0];

  return (
    <article className={clsx('property-card', `property-card--${variant}`)}>
      <Link to={`/property/${id}`} className="property-card__media" aria-label={name}>
        {image ? <img src={image} alt={`${name} preview`} /> : <div className="property-card__placeholder" />}
        {variant === 'grid' ? <RatingPill rating={rating} /> : null}
      </Link>
      <div className="property-card__content">
        <header>
          <div className="property-card__title">
            <h3>
              <Link to={`/property/${id}`}>{name}</Link>
            </h3>
            <Stars count={stars} />
          </div>
          <Link
            to={`/search?q=${encodeURIComponent(city)}`}
            className="property-card__location"
          >
            {area}, {city}
          </Link>
        </header>
        <p className="property-card__blurb">{blurb}</p>
        <div className="property-card__footer">
          <RatingPill rating={rating} />
          <div className="property-card__price">
            <span>Starting from</span>
            <strong>{formatCurrency(price, currency)}</strong>
            <small>per night</small>
            <button type="button" className="btn btn-secondary property-card__cta">
              View prices
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

