const defaultLocaleByCurrency = {
  NGN: 'en-NG',
  USD: 'en-US',
  GBP: 'en-GB',
  EUR: 'de-DE',
  GHS: 'en-GH',
};

export function formatCurrency(amount, currency = 'NGN', options = {}) {
  if (amount === undefined || amount === null) {
    return '';
  }

  const locale = defaultLocaleByCurrency[currency] ?? 'en-GB';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: options.maximumFractionDigits ?? 0,
    minimumFractionDigits: options.minimumFractionDigits ?? 0,
  }).format(amount);
}

export function formatCurrencyCode(amount, currency = 'NGN') {
  if (amount === undefined || amount === null) {
    return '';
  }

  const locale = defaultLocaleByCurrency[currency] ?? 'en-GB';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    currencyDisplay: 'code',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount);
}
