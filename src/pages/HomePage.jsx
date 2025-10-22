import { Link } from 'react-router-dom';
import properties from '@/data/properties.json';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';

const categories = [
  {
    label: 'Hotels',
    description: 'Perfect for stays with concierge service',
    image: 'src/assets/hotel.png',
    query: 'hotel',
  },
  {
    label: 'Apartments',
    description: 'Homely comfort with more room to relax',
    image: 'src/assets/apartments.png',
    query: 'apartment',
  },
  {
    label: 'Resorts',
    description: 'Full-service destinations with daily activities',
    image: 'src/assets/resorts.png',
    query: 'resort',
  },
  {
    label: 'Villas',
    description: 'Private escapes with luxurious amenities',
    image: 'src/assets/villas.png',
    query: 'villa',
  },
];

const moreAccommodation = [
  { label: 'Lagos', count: '1,211 properties', image: '/assets/city-lagos.jpg' },
  { label: 'Abuja', count: '876 properties', image: '/assets/city-abuja.jpg' },
  { label: 'Port Harcourt', count: '452 properties', image: '/assets/city-portharcourt.jpg' },
  { label: 'Ibadan', count: '301 properties', image: '/assets/city-ibadan.jpg' },
];

const trending = [
  { label: 'Lagos', image: '/assets/trending-lagos.jpg' },
  { label: 'Dubai', image: '/assets/trending-dubai.jpg' },
  { label: 'London', image: '/assets/trending-london.jpg' },
  { label: 'Accra', image: '/assets/trending-accra.jpg' },
  { label: 'Makkah', image: '/assets/trending-mecca.jpg' },
];

const highlights = [
  { title: 'Book now, pay at the property', description: 'FREE cancellation on most rooms' },
  { title: '2+ million properties worldwide', description: 'Hotels, villas, houses, apartments and more…' },
  { title: 'Trusted customer service 24/7', description: 'We’re always here to help' },
];

export default function HomePage() {
  const featured = properties.slice(0, 4);

  return (
    <div className="home">
      <section className="home-hero">
        <video
          className="home-hero__video"
          src="./src/assets/Stayseries Web Hero Video.mp4"
          poster="/assets/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
        >
          <track kind="captions" />
        </video>
        <div className="home-hero__overlay">
          <div className="container home-hero__container">
            <div className="home-hero__copy">
              <h1>Find your next stay</h1>
              <p>Search low prices on hotels, homes and much more.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="home-search">
        <div className="container home-search__inner">
          <SearchBar className="home-search__bar" />
        </div>
      </section>

      <section className="home__section">
        <div className="container">
          <h2 className="section-heading">Browse by property type</h2>
          <p className="section-subtitle">Find the best stay for your trip, whatever the budget or occasion.</p>
          <div className="home__categories">
            {categories.map((category) => (
              <Link
                key={category.label}
                to={`/search?q=${encodeURIComponent(category.query)}`}
                className="home__category-card"
              >
                <img src={category.image} alt={`${category.label} category`} />
                <div>
                  <h3>{category.label}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section">
        <div className="container">
          <div className="home__header">
            <h2 className="section-heading">Stay at our top unique properties</h2>
            <p className="section-subtitle">From castles and villas to boats and igloos, we've got it all</p>
          </div>
          <div className="home__grid">
            {featured.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                variant="grid"
                showAction={false}
                showStars={false}
              />
            ))}
          </div>
        </div>
      </section>



      <section className="home__section">
        <div className="container">
          <h2 className="section-heading">More accommodation</h2>
          <p className="section-subtitle">Dive into our world of apartments, villas, and other unique stays.</p>
          <div className="home__cities">
            {moreAccommodation.map((city) => (
              <Link key={city.label} to={`/search?q=${encodeURIComponent(city.label)}`} className="home__city-card">
                <img src={city.image} alt={`${city.label} skyline`} />
                <div>
                  <h3>{city.label}</h3>
                  <p>{city.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section home__section--alt">
        <div className="container">
          <h2 className="section-heading">Trending destinations</h2>
          <p className="section-subtitle">Most popular choices for travellers from Nigeria.</p>
          <div className="home__trending">
            {trending.map((item) => (
              <Link key={item.label} to={`/search?q=${encodeURIComponent(item.label)}`} className="home__trend-card">
                <img src={item.image} alt={`${item.label} destination`} />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section">
        <div className="container home__highlights">
          {highlights.map((highlight) => (
            <div key={highlight.title} className="home__highlight-card">
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
