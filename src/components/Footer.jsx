import { Link } from 'react-router-dom';
import { useUi } from '@/context/UiContext';

const footerColumns = [
  {
    title: 'About',
    links: ['About StaySeries', 'How we work', 'Careers', 'Corporate contact'],
  },
  {
    title: 'Terms & Settings',
    links: ['Privacy & cookies', 'Terms and conditions', 'Accessibility statement', 'Partner dispute'],
  },
  {
    title: 'Partners',
    links: ['Partner help', 'List your property', 'Earnings & payouts', 'Become an affiliate'],
  },
  {
    title: 'Guest Support',
    links: ['Help Center', 'How to book', 'Contact us', 'Cancellation policy'],
  },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const { currency, language } = useUi();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__grid">
          {footerColumns.map((column) => (
            <div key={column.title} className="footer__column">
              <h4>{column.title}</h4>
              <ul>
                {column.links.map((item) => (
                  <li key={item}>
                    <Link to="/">{item}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer__column footer__column--newsletter">
            <h4>Social & Newsletter</h4>
            <form>
              <label htmlFor="newsletter-email" className="sr-only">
                Enter your email
              </label>
              <input id="newsletter-email" className="input" placeholder="Enter your email" type="email" />
              <button type="submit" className="btn btn-secondary">
                Sign in
              </button>
            </form>
            <div className="footer__socials">
              {socials.map((item) => (
                <a key={item.label} href={item.href} aria-label={item.label}>
                  {item.label.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer__meta">
          <div className="footer__meta-left">
            <span>{currency}</span>
            <span>{language}</span>
            <span aria-label="Help">?</span>
          </div>
          <p>
            StaySeries is part of Stay Series, the number one online real estate services. Copyright © 2025
            StaySeries™. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

