import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import properties from '@/data/properties.json';
import SearchBar from '@/components/SearchBar';
import PropertyCard from '@/components/PropertyCard';

const categories = [
  {
    label: 'Hotels',
    description: 'Perfect for stays with concierge service',
    image: '/assets/hotel.png',
    query: 'hotel',
  },
  {
    label: 'Apartments',
    description: 'Homely comfort with more room to relax',
    image: '/assets/apartments.png',
    query: 'apartment',
  },
  {
    label: 'Resorts',
    description: 'Full-service destinations with daily activities',
    image: '/assets/resorts.png',
    query: 'resort',
  },
  {
    label: 'Villas',
    description: 'Private escapes with luxurious amenities',
    image: '/assets/villas.png',
    query: 'villa',
  },
];

const moreAccommodation = [
  { label: 'Lagos', count: '1,311 properties', image: '/assets/lagos.jpg' },
  { label: 'Ikeja', count: '259 properties', image: '/assets/ikeja.png' },
  { label: 'Abuja', count: '976 properties', image: '/assets/abuja.png' },
  { label: 'Lekki', count: '1,019 properties', image: '/assets/lekki.png' },
  { label: 'Ibadan', count: '241 properties', image: '/assets/ibadan.png' },
  { label: 'Benin City', count: '103 properties', image: '/assets/benin.jpg' },
];

const trending = [
  { label: 'Lagos', image: '/assets/trending-lagos.png', row: 1 },
  { label: 'Ikeja', image: '/assets/trending-ikeja.png', row: 1 },
  { label: 'Abuja', image: '/assets/trending-abuja.png', row: 2 },
  { label: 'London', image: '/assets/trending-london.png', row: 2 },
  { label: 'Makkah', image: '/assets/trending-mecca.png', row: 2 },
];

const highlights = [
  {
    title: 'Secure your stay instantly',
    description: 'FREE cancellation within 48 hours',
    image: '/assets/book now.png',
  },
  {
    title: '2+ million properties worldwide',
    description: 'Hotels, guest houses, apartments, and more...',
    image: '/assets/2m+ properties.png',
  },
  {
    title: 'Trusted customer service you can rely on, 24/7',
    description: "We're always here to help",
    image: '/assets/trusted support.png',
  },
];

const offers = [
  {
    id: 'offer-quick-escape',
    title: 'Quick escape. Quality time',
    description: 'Save up to 20% with a Getaway Deal.',
    cta: 'Save on stays',
    image: '/assets/offer-1.png',
    alt: 'Couple enjoying a boat cruise together',
  },
  {
    id: 'offer-holiday-home',
    eyebrow: 'Holiday rentals',
    title: 'Live the dream in a holiday home',
    description: 'Choose from houses, villas, chalets and more.',
    cta: 'Book yours',
    image: '/assets/offer-2.png',
    alt: 'Interior of a bright holiday home kitchen',
  },
  {
    id: 'offer-flexible-work',
    eyebrow: 'Business travel',
    title: 'Stay flexible on your next work trip',
    description: 'Unlock corporate-ready stays with flexible cancellation.',
    cta: 'See work stays',
    image: '/assets/offer-1.png',
    alt: 'Professional working on a laptop while travelling',
  },
];

export default function HomePage() {
  const featured = properties.slice(0, 4);
  const guestFavorites = properties.slice(4, 8);

  const [offerIndex, setOfferIndex] = useState(0);
  const [offersPerView, setOffersPerView] = useState(2);
  const [offerStep, setOfferStep] = useState(0);
  const offerViewportRef = useRef(null);
  const offerCardRef = useRef(null);

  const recalcOfferLayout = useCallback(() => {
    const viewport = offerViewportRef.current;
    const card = offerCardRef.current;
    if (!viewport || !card) return;

    const cardWidth = card.offsetWidth;
    const computed = window.getComputedStyle(card);
    const marginRight = parseFloat(computed.marginRight) || 0;

    setOfferStep(cardWidth + marginRight);

    const viewportWidth = viewport.offsetWidth;
    const cardsVisible = Math.max(
      1,
      Math.floor((viewportWidth + marginRight) / (cardWidth + marginRight)),
    );
    setOffersPerView(cardsVisible);
  }, []);

  useEffect(() => {
    const handleResize = () => recalcOfferLayout();
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [recalcOfferLayout]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      recalcOfferLayout();
    }, 120);
    return () => window.clearTimeout(timer);
  }, [recalcOfferLayout]);

  useEffect(() => {
    setOfferIndex((prev) => Math.min(prev, Math.max(0, offers.length - offersPerView)));
  }, [offersPerView]);

  const maxOfferIndex = Math.max(0, offers.length - offersPerView);

  const handleOfferPrev = () => {
    setOfferIndex((prev) => {
      if (maxOfferIndex === 0) return 0;
      return prev === 0 ? maxOfferIndex : prev - 1;
    });
  };

  const handleOfferNext = useCallback(() => {
    setOfferIndex((prev) => {
      if (maxOfferIndex === 0) return 0;
      return prev >= maxOfferIndex ? 0 : prev + 1;
    });
  }, [maxOfferIndex]);

  useEffect(() => {
    if (maxOfferIndex === 0) return undefined;

    const interval = window.setInterval(() => {
      handleOfferNext();
    }, 6000);

    return () => window.clearInterval(interval);
  }, [handleOfferNext, maxOfferIndex]);

  const offerTrackStyle = offerStep > 0 ? { transform: `translateX(-${offerIndex * offerStep}px)` } : undefined;
  const navDisabled = maxOfferIndex === 0;

  return (
    <div className="home">
      <section className="home-hero">
        <video
          className="home-hero__video"
          src="/assets/Stayseries Web Hero Video.mp4"
          poster="/assets/hero fallback.jpg"
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
                  <p>{category.description}</p>
                  <span>Explore {category.label.toLowerCase()}</span>
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
            <p className="section-subtitle">From castles and villas to boats and igloos, we have it all.</p>
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
        <div className="container home-offers">
          <div className="home-offers__header">
            <div>
              <h2 className="section-heading home-offers__title">Offers</h2>
              <p className="home-offers__subtitle">Promotions, deals and special offers for you</p>
            </div>
            <div className="home-offers__nav">
              <button
                type="button"
                onClick={handleOfferPrev}
                disabled={navDisabled}
                aria-label="Previous offer"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={handleOfferNext}
                disabled={navDisabled}
                aria-label="Next offer"
              >
                ›
              </button>
            </div>
          </div>
          <div className="home-offers__viewport" ref={offerViewportRef}>
            <div className="home-offers__track" style={offerTrackStyle}>
              {offers.map((offer, index) => (
                <article
                  key={offer.id}
                  className="home-offers__card"
                  ref={index === 0 ? offerCardRef : null}
                >
                  <div className="home-offers__content">
                    {offer.eyebrow ? <span className="home-offers__eyebrow">{offer.eyebrow}</span> : null}
                    <h3 className="home-offers__card-title">{offer.title}</h3>
                    <p className="home-offers__description">{offer.description}</p>
                    <button type="button" className="btn btn-accent home-offers__cta">
                      {offer.cta}
                    </button>
                  </div>
                  <div className="home-offers__image">
                    <img src={offer.image} alt={offer.alt} loading="lazy" onLoad={recalcOfferLayout} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="home__section">
        <div className="container">
          <h2 className="section-heading">Homes guests love</h2>
          <p className="section-subtitle">Stay where travellers cannot stop talking about the experience.</p>
          <div className="home__grid">
            {guestFavorites.map((property) => (
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

      <section className="home__section">
        <div className="container home__highlights">
          {highlights.map((highlight) => (
            <div key={highlight.title} className="home__highlight-card">
              <div className="home__highlight-image">
                <img src={highlight.image} alt="" aria-hidden="true" />
              </div>
              <div className="home__highlight-body">
                <h3>{highlight.title}</h3>
                <p>{highlight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home__section home__section--alt">
        <div className="container">
          <h2 className="section-heading">Trending destinations</h2>
          <p className="section-subtitle">Most popular choices for travellers from Nigeria.</p>
          <div className="home__trending">
            <div className="home__trending-row home__trending-row-1">
              {trending
                .filter((item) => item.row === 1)
                .map((item) => (
                  <Link
                    key={item.label}
                    to={`/search?q=${encodeURIComponent(item.label)}`}
                    className="home__trend-card"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(179, 150, 109, 0.64) 32.96%, rgba(115, 115, 115, 0) 100%), url('${item.image}')`,
                    }}
                  >
                    <span className="home__trend-label">{item.label}</span>
                  </Link>
                ))}
            </div>
            <div className="home__trending-row home__trending-row-2">
              {trending
                .filter((item) => item.row === 2)
                .map((item) => (
                  <Link
                    key={item.label}
                    to={`/search?q=${encodeURIComponent(item.label)}`}
                    className="home__trend-card"
                    style={{
                      backgroundImage: `linear-gradient(180deg, rgba(179, 150, 109, 0.64) 32.96%, rgba(115, 115, 115, 0) 100%), url('${item.image}')`,
                    }}
                  >
                    <span className="home__trend-label">{item.label}</span>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

