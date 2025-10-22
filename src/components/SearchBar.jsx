import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import clsx from 'clsx';

import bedIcon from '@/assets/bed.svg';
import calendarIcon from '@/assets/calendar.svg';
import userIcon from '@/assets/users.svg';

const defaultGuests = { adults: 2, children: 0, rooms: 1 };

function guestsToString({ adults, children, rooms }) {
  return `${adults} adults • ${children} children • ${rooms} room${rooms > 1 ? 's' : ''}`;
}

export default function SearchBar({ className, dense = false }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const initialGuests = useMemo(
    () => ({
      adults: Number(params.get('adults')) || defaultGuests.adults,
      children: Number(params.get('children')) || defaultGuests.children,
      rooms: Number(params.get('rooms')) || defaultGuests.rooms,
    }),
    [params]
  );

  const [destination, setDestination] = useState(params.get('q') || '');
  const [dateRange, setDateRange] = useState(params.get('dates') || '');
  const [guests, setGuests] = useState(initialGuests);

  const [openGuests, setOpenGuests] = useState(false);
  const guestsFieldRef = useRef(null);
  const guestsPopoverRef = useRef(null);

  useEffect(() => {
    setDestination(params.get('q') || '');
    setDateRange(params.get('dates') || '');
    setGuests(initialGuests);
  }, [params, initialGuests]);

  // Close guests popover on outside click
  useEffect(() => {
    if (!openGuests) return;
    const onDocClick = (e) => {
      if (
        guestsPopoverRef.current &&
        !guestsPopoverRef.current.contains(e.target) &&
        guestsFieldRef.current &&
        !guestsFieldRef.current.contains(e.target)
      ) {
        setOpenGuests(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [openGuests]);

  const onSubmit = (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (destination) searchParams.set('q', destination);
    if (dateRange) searchParams.set('dates', dateRange);
    searchParams.set('adults', guests.adults);
    searchParams.set('children', guests.children);
    searchParams.set('rooms', guests.rooms);

    navigate({ pathname: '/search', search: searchParams.toString() });
  };

  const step = (key, delta, min = 0, max = 30) => {
    setGuests((g) => {
      const next = Math.min(max, Math.max(min, (g[key] ?? 0) + delta));
      if (key === 'adults' && next < 1) return { ...g, adults: 1 };
      if (key === 'rooms' && next < 1) return { ...g, rooms: 1 };
      return { ...g, [key]: next };
    });
  };

  return (
    <form
      className={clsx('search-bar', { 'search-bar--dense': dense }, className)}
      onSubmit={onSubmit}
      role="search"
      aria-label="Stay search"
    >
      {/* Destination */}
      <div className={clsx('search-bar__field', 'has-icon')}>
        <img src={bedIcon} alt="" aria-hidden className="search-bar__icon" />
        <input
          id="search-destination"
          type="text"
          placeholder="Where are you going?"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="search-bar__input"
        />
        {destination && (
          <button
            type="button"
            aria-label="Clear destination"
            className="search-bar__clear"
            onClick={() => setDestination('')}
          >
            ×
          </button>
        )}
      </div>

      {/* Dates */}
      <div className={clsx('search-bar__field', 'has-icon')}>
        <img src={calendarIcon} alt="" aria-hidden className="search-bar__icon" />
        <input
          id="search-dates"
          type="text"
          placeholder="Check-in date — Check-out date"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="search-bar__input"
        />
      </div>

      {/* Guests / Rooms dropdown */}
      <div
        ref={guestsFieldRef}
        className={clsx('search-bar__field', 'has-icon', 'is-menu')}
      >
        <img src={userIcon} alt="" aria-hidden className="search-bar__icon" />
        <button
          type="button"
          className="search-bar__menu"
          aria-expanded={openGuests}
          aria-controls="guests-popover"
          onClick={() => setOpenGuests((v) => !v)}
        >
          {guestsToString(guests)}
          <span className="search-bar__chev">▾</span>
        </button>

        {openGuests && (
          <div
            id="guests-popover"
            ref={guestsPopoverRef}
            className="search-bar__popover"
            role="dialog"
            aria-label="Select guests and rooms"
          >
            <div className="search-bar__row">
              <span>Adults</span>
              <div className="search-bar__steppers">
                <button type="button" onClick={() => step('adults', -1, 1)} aria-label="Decrease adults">−</button>
                <span>{guests.adults}</span>
                <button type="button" onClick={() => step('adults', +1)} aria-label="Increase adults">+</button>
              </div>
            </div>

            <div className="search-bar__row">
              <span>Children</span>
              <div className="search-bar__steppers">
                <button type="button" onClick={() => step('children', -1, 0)} aria-label="Decrease children">−</button>
                <span>{guests.children}</span>
                <button type="button" onClick={() => step('children', +1)} aria-label="Increase children">+</button>
              </div>
            </div>

            <div className="search-bar__row">
              <span>Rooms</span>
              <div className="search-bar__steppers">
                <button type="button" onClick={() => step('rooms', -1, 1)} aria-label="Decrease rooms">−</button>
                <span>{guests.rooms}</span>
                <button type="button" onClick={() => step('rooms', +1)} aria-label="Increase rooms">+</button>
              </div>
            </div>

            <hr className="search-bar__hr" />
            <div className="search-bar__foot">
              <div className="search-bar__note">
                Travelling with pets? <span className="search-bar__muted">Assistance animals aren’t considered pets.</span>
              </div>
              <button type="button" className="btn btn-secondary" onClick={() => setOpenGuests(false)}>
                Done
              </button>
            </div>
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary search-bar__submit">
        Search
      </button>

      <span className="sr-only">Press search to view matching properties</span>
    </form>
  );
}
