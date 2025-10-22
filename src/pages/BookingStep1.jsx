import { useNavigate, useParams } from 'react-router-dom';
import properties from '@/data/properties.json';
import RatingPill from '@/components/RatingPill';
import PriceSummary from '@/components/PriceSummary';

const countries = ['Nigeria', 'Ghana', 'United Kingdom', 'United States', 'United Arab Emirates'];

export default function BookingStep1() {
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find((item) => item.id === id) ?? properties[0];

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`/booking/${id}/payment`);
  };

  return (
    <div className="booking booking--step">
      <div className="container booking__container">
        <div className="booking__progress">
          <div className="booking__progress-item booking__progress-item--done">Your selection</div>
          <div className="booking__progress-item booking__progress-item--current">Your details</div>
          <div className="booking__progress-item">Finish booking</div>
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
            <h1>Your details</h1>
            <p>Enter the details of the guest staying at {property.name}.</p>
            <form onSubmit={handleSubmit} className="booking-form">
              <div className="booking-form__row">
                <label htmlFor="first-name">
                  First name
                  <input id="first-name" className="input" placeholder="First name" required />
                </label>
                <label htmlFor="last-name">
                  Last name
                  <input id="last-name" className="input" placeholder="Last name" required />
                </label>
              </div>

              <div className="booking-form__row">
                <label htmlFor="email">
                  Email address
                  <input id="email" type="email" className="input" placeholder="you@example.com" required />
                </label>
                <label htmlFor="phone">
                  Phone number
                  <div className="booking-form__phone">
                    <select className="input booking-form__code" defaultValue="+234">
                      <option value="+234">NG +234</option>
                      <option value="+233">GH +233</option>
                      <option value="+971">AE +971</option>
                      <option value="+44">UK +44</option>
                    </select>
                    <input id="phone" type="tel" className="input" placeholder="Phone number" required />
                  </div>
                </label>
              </div>

              <label htmlFor="country">
                Country/Region
                <select id="country" className="input" defaultValue={countries[0]}>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
              </label>

              <fieldset className="booking-form__fieldset">
                <legend>Who are you booking for?</legend>
                <label>
                  <input type="radio" name="booking-for" defaultChecked />
                  I am the main guest
                </label>
                <label>
                  <input type="radio" name="booking-for" />
                  Booking is for someone else
                </label>
              </fieldset>

              <fieldset className="booking-form__fieldset">
                <legend>Are you travelling for work?</legend>
                <label>
                  <input type="radio" name="work-trip" defaultChecked />
                  Yes
                </label>
                <label>
                  <input type="radio" name="work-trip" />
                  No
                </label>
              </fieldset>

              <label htmlFor="arrival-time">
                Your arrival time (optional)
                <select id="arrival-time" className="input" defaultValue="">
                  <option value="">Please select</option>
                  <option value="15:00">15:00 - Standard check-in</option>
                  <option value="17:00">17:00 - Evening arrival</option>
                  <option value="21:00">21:00 - Late arrival</option>
                  <option value="00:00">00:00 - After midnight</option>
                </select>
              </label>

              <button type="submit" className="btn btn-primary booking-form__submit">
                Find details
              </button>
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
