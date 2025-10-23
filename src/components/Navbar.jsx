import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { useUi } from '@/context/UiContext';
import logo from '@/assets/logo.svg'; // <-- put your logo here

// Only "List your property" (removed "Read all reviews")
const actions = [{ label: 'List your property', to: '/#list-property' }];

export default function Navbar() {
  const location = useLocation();
  const { currency, language, openModal, openAuth } = useUi();
  const isAccountRoute = location.pathname.startsWith('/account');

  return (
    <header
      className={clsx(
        'navbar',
        { 'navbar--accent': isAccountRoute }
      )}
    >
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" aria-label="StaySeries home">
          <img src={logo} alt="StaySeries" className="navbar__logo" />
        </Link>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__badge"
            onClick={() => openModal('currency')}
            aria-label={`Change currency, currently ${currency}`}
          >
            <span className="navbar__badge-label">{currency}</span>
          </button>

          <button
            type="button"
            className="navbar__badge"
            onClick={() => openModal('language')}
            aria-label={`Change language, currently ${language}`}
          >
            <span className="navbar__badge-label">{language}</span>
          </button>

          {actions.map((action) => (
            <Link key={action.label} to={action.to} className="navbar__link">
              {action.label}
            </Link>
          ))}

          <button
            type="button"
            className="navbar__link"
            onClick={() => openAuth('sign-in')}
          >
            Sign in
          </button>

          <button
            type="button"
            className="btn btn-secondary navbar__cta"
            onClick={() => openAuth('sign-up')}
          >
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
