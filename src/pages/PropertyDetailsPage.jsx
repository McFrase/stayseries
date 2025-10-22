import { Link, useNavigate, useParams } from 'react-router-dom';
import properties from '@/data/properties.json';
import SearchBar from '@/components/SearchBar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Gallery from '@/components/Gallery';
import RatingPill from '@/components/RatingPill';
import AmenityBadge from '@/components/AmenityBadge';
import ReviewsSummary from '@/components/ReviewsSummary';
import PriceSummary from '@/components/PriceSummary';

const testimonials = [
  {
    name: 'Tolu Jayasimi',
    location: 'Nigeria',
    comment:
      'The rooms are a perfect size with elegant details. Staff were attentive and the lounge bar felt very exclusive.',
  },
  {
    name: 'Amara O.',
    location: 'Nigeria',
    comment: 'Loved the location and the rooftop pool. Concierge team made sure every detail was taken care of.',
  },
  {
    name: 'Chuka I.',
    location: 'Nigeria',
    comment:
      'Clean rooms, comfortable beds, and excellent breakfast spread. Highly recommend for a city weekend getaway.',
  },
];

const availabilityRows = [
  {
    room: 'Executive Room with Lounge Access',
    guests: '4 guests maximum',
  },
  {
    room: 'King Suite City View',
    guests: '3 guests maximum',
  },
  {
    room: 'Deluxe Twin Room',
    guests: '2 guests maximum',
  },
];

export default function PropertyDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((item) => item.id === id) ?? properties[0];

  if (!property) {
    return (
      <div className="container property-details__not-found">
        <p>Property unavailable.</p>
      </div>
    );
  }

  const { name, stars, city, area, rating, price, currency, blurb, amenities, images } = property;

  const breadcrumbItems = [
    { label: 'Home', to: '/' },
    { label: 'Hotels', to: '/search' },
    { label: city, to: `/search?q=${encodeURIComponent(city)}` },
    { label: area },
  ];

  return (
    <div className="property-details">
      <section className="property-details__hero">
        <div className="container">
          <Breadcrumbs items={breadcrumbItems} />
          <SearchBar dense className="property-details__search" />
        </div>
      </section>

      <section className="container property-details__header">
        <div>
          <h1>{name}</h1>
          <div className="property-details__meta">
            <span className="property-details__stars" aria-label={`${stars}-star property`}>
              {'★'.repeat(stars)}
            </span>
            <Link to={`/search?q=${encodeURIComponent(area)}`} className="property-details__location">
              {area}, {city}
            </Link>
            <button type="button" className="btn btn-ghost property-details__map-link">
              Show on map
            </button>
          </div>
        </div>
        <RatingPill rating={rating} />
      </section>

      <section className="container property-details__layout">
        <div className="property-details__main">
          <Gallery images={images} />

          <div className="property-details__section">
            <h2>Highlights</h2>
            <div className="property-details__highlights">
              {amenities.map((amenity) => (
                <AmenityBadge key={amenity} label={amenity} />
              ))}
            </div>
          </div>

          <div className="property-details__section">
            <h2>About this stay</h2>
            <p>{blurb}</p>
            <p>
              Guests enjoy day spa facilities, a fitness centre, a year-round outdoor swimming pool, and a lush
              garden. Additional amenities include a terrace, steam room, and wellness packages designed for a
              restorative retreat.
            </p>
          </div>

          <div className="property-details__section property-details__availability">
            <header>
              <h2>Availability</h2>
              <SearchBar dense />
            </header>
            <table>
              <thead>
                <tr>
                  <th scope="col">Room type</th>
                  <th scope="col">Guests</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {availabilityRows.map((row) => (
                  <tr key={row.room}>
                    <td>{row.room}</td>
                    <td>{row.guests}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => navigate(`/booking/${id}/guest`)}
                      >
                        Show prices
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReviewsSummary
            average={rating}
            totalReviews={860}
            testimonials={testimonials}
          />
        </div>

        <aside className="property-details__aside">
          <div className="property-details__rating-card">
            <div>
              <p className="property-details__rating-label">Very good</p>
              <p className="property-details__rating-score">{rating.toFixed(1)}</p>
              <p className="property-details__rating-meta">800+ reviews</p>
            </div>
            <q>
              The rooms are a good size with all the necessary furnishings, such as a work desk and a small couch.
              Internet was also really good!
            </q>
            <span className="property-details__guest">— Guest review</span>
          </div>

          <div className="property-details__map">
            <p>Map placeholder</p>
            <span>Map data ©2025</span>
          </div>

          <PriceSummary
            currency={currency}
            originalPrice={price * 1.08}
            discountedPrice={price}
            taxesAndCharges={price * 0.12}
          />
        </aside>
      </section>
    </div>
  );
}
