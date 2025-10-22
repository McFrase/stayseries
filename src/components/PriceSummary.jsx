import { formatCurrency } from '@/utils/formatCurrency';

export default function PriceSummary({
  currency = 'NGN',
  originalPrice,
  discountedPrice,
  taxesAndCharges,
  nights = 1,
}) {
  return (
    <aside className="price-summary">
      <h3>Your price summary</h3>
      <div className="price-summary__row">
        <span>Original price</span>
        <span className="price-summary__strike">{formatCurrency(originalPrice, currency)}</span>
      </div>
      <div className="price-summary__badge">
        <div>
          <p className="price-summary__label">Price</p>
          <p className="price-summary__value">{formatCurrency(discountedPrice, currency)}</p>
        </div>
        <p className="price-summary__details">
          for {nights} night{nights > 1 ? 's' : ''} · includes taxes and charges where applicable
        </p>
      </div>
      <div className="price-summary__row">
        <span>Taxes &amp; charges</span>
        <span>{formatCurrency(taxesAndCharges, currency, { maximumFractionDigits: 2 })}</span>
      </div>
      <p className="price-summary__note">
        You can cancel for free before 24 hours of check-in. Pay when you stay — no prepayment needed.
      </p>
    </aside>
  );
}

