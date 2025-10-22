import { useNavigate, useParams } from 'react-router-dom';
import properties from '@/data/properties.json';
import RatingPill from '@/components/RatingPill';
import PriceSummary from '@/components/PriceSummary';

export default function BookingStep2() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((item) => item.id === id) ?? properties[0];

  const onSubmit = (event) => {
    event.preventDefault();
    navigate('/account');
  };

  return (
    <div className="booking booking--step">
      <div className="container booking__container">
        <div className="booking__progress">
          <div className="booking__progress-item booking__progress-item--done">Your selection</div>
          <div className="booking__progress-item booking__progress-item--done">Your details</div>
          <div className="booking__progress-item booking__progress-item--current">Finish booking</div>
        </div>

        <div className="booking__layout">
          <aside className="booking__summary">
            <figure className="booking__summary-media">
              <img src={property.images[0]} alt={property.name} />
            </figure>
            <div className="booking__summary-body">
              <div className="booking__summary-header">
                <h2>{property.name}</h2>
                <span className="booking__summary-stars">{'★'.repeat(property.stars)}</span>
              </div>
              <a href="#map" className="booking__summary-link">
                {property.area}, {property.city}
              </a>
              <RatingPill rating={property.rating} />
              <p className="booking__summary-copy">{property.blurb}</p>
              <div className="booking__details-card">
                <h3>Your booking details</h3>
                <ul>
                  <li>
                    <span>Check-in</span>
                    <strong>Mon 1 Sept 2025</strong>
                  </li>
                  <li>
                    <span>Check-out</span>
                    <strong>Tue 2 Sept 2025</strong>
                  </li>
                  <li>
                    <span>Total length of stay</span>
                    <strong>1 night</strong>
                  </li>
                  <li>
                    <span>You selected</span>
                    <strong>1 room for 2 adults</strong>
                  </li>
                </ul>
              </div>
              <PriceSummary
                currency={property.currency}
                originalPrice={property.price * 1.05}
                discountedPrice={property.price}
                taxesAndCharges={property.price * 0.12}
              />
            </div>
          </aside>

          <section className="booking__form">
            <h1>How would you like to pay?</h1>
            <p>The property will handle payment. The date you’ll be charged depends on your booking conditions.</p>
            <div className="booking__info-card">
              <h3>Pay when you stay</h3>
              <ul>
                <li>No prepayment needed.</li>
                <li>Pay directly to the property in {property.currency}.</li>
                <li>Free cancellation up to 24 hours before check-in.</li>
              </ul>
            </div>
            <form onSubmit={onSubmit} className="booking-form booking-form--payment">
              <label htmlFor="card-name">
                Cardholder&apos;s name
                <input id="card-name" className="input" placeholder="Name on the card" required />
              </label>
              <label htmlFor="card-number">
                Cardholder&apos;s number
                <input
                  id="card-number"
                  className="input"
                  placeholder="1234 5678 9012 3456"
                  inputMode="numeric"
                  maxLength={19}
                  required
                />
              </label>
              <div className="booking-form__row">
                <label htmlFor="card-expiry">
                  Expiry date
                  <input id="card-expiry" className="input" placeholder="MM / YY" required />
                </label>
                <label htmlFor="card-cvc">
                  CVC
                  <input id="card-cvc" className="input" placeholder="123" inputMode="numeric" maxLength={4} required />
                </label>
              </div>
              <div className="booking-form__actions">
                <button type="button" className="btn btn-secondary">
                  Check your booking
                </button>
                <button type="submit" className="btn btn-primary">
                  Finalise booking
                </button>
              </div>
            </form>
            <button type="button" className="btn btn-ghost booking-form__link">
              What are my booking conditions?
            </button>
          </section>
        </div>
      </div>
    </div>
  );
}
