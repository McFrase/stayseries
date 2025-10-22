import avatar from '@/assets/account-avatar.jpg';
import { useUi } from '@/context/UiContext';

const cards = [
  {
    title: 'Payment information',
    items: ['Rewards & Wallets', 'Payment methods', 'Transactions'],
  },
  {
    title: 'Manage account',
    items: ['Personal details', 'Security settings', 'Other travellers'],
  },
  {
    title: 'Preferences',
    items: ['Customisation preferences', 'Email preference'],
  },
  {
    title: 'Travel activity',
    items: ['Trips & bookings', 'Saved lists', 'My reviews'],
  },
  {
    title: 'Help & support',
    items: ['Contact customer service', 'Safety resource centre', 'Dispute resolution'],
  },
  {
    title: 'Legal & privacy',
    items: ['Privacy & data management', 'Content guidelines'],
  },
  {
    title: 'Property management',
    items: ['List your property'],
  },
];

export default function AccountDashboardPage() {
  const { currency, language } = useUi();

  return (
    <div className="account">
      <section className="account__hero">
        <div className="container account__hero-inner">
          <div className="account__profile">
            <img src={avatar} alt="Fopefoluwa Ehiozai" />
            <div>
              <p>Hi, Fopefoluwa</p>
              <span>Wed, 27th August, 2025</span>
            </div>
          </div>
          <div className="account__meta">
            <span>{currency}</span>
            <span>{language}</span>
            <span>?</span>
          </div>
        </div>
      </section>

      <section className="container account__grid">
        {cards.map((card) => (
          <article key={card.title} className="account__card">
            <h3>{card.title}</h3>
            <ul>
              {card.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
    </div>
  );
}
