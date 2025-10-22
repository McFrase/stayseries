const popularFilters = [
  'Breakfast included',
  'Free cancellation',
  '5-star stays',
  'Pool access',
  'Apartments',
];

const ratings = ['9+ Superb', '8+ Very good', '7+ Good'];

const amenities = [
  'Free WiFi',
  'Parking',
  'Airport shuttle',
  'Spa and wellness centre',
  'Fitness centre',
  'Family rooms',
];

export default function FiltersSidebar() {
  return (
    <aside className="filters">
      <section className="filters__section">
        <h3>Popular filters</h3>
        <div className="filters__list">
          {popularFilters.map((filter) => (
            <label key={filter} className="filters__option">
              <input type="checkbox" />
              <span>{filter}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="filters__section">
        <h3>Price range (per night)</h3>
        <div className="filters__range">
          <input type="range" min={50000} max={900000} step={10000} defaultValue={400000} />
          <div className="filters__range-inputs">
            <label>
              Min
              <input type="number" className="input" defaultValue={75000} />
            </label>
            <label>
              Max
              <input type="number" className="input" defaultValue={650000} />
            </label>
          </div>
        </div>
      </section>

      <section className="filters__section">
        <h3>Guest rating</h3>
        <div className="filters__list">
          {ratings.map((rating) => (
            <label key={rating} className="filters__option">
              <input type="radio" name="rating" />
              <span>{rating}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="filters__section">
        <h3>Amenities</h3>
        <div className="filters__list">
          {amenities.map((amenity) => (
            <label key={amenity} className="filters__option">
              <input type="checkbox" />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
}

