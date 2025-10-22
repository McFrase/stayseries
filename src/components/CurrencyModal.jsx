import Modal from './Modal';
import { useUi } from '@/context/UiContext';

const currencies = [
  { code: 'NGN', name: 'Nigerian Naira (₦)' },
  { code: 'USD', name: 'US Dollar ($)' },
  { code: 'GBP', name: 'British Pound (£)' },
  { code: 'EUR', name: 'Euro (€)' },
  { code: 'GHS', name: 'Ghanaian Cedi (₵)' },
];

export default function CurrencyModal() {
  const { modals, currency, setCurrency, closeModal } = useUi();

  return (
    <Modal
      size="sm"
      isOpen={modals.currency}
      onClose={() => closeModal('currency')}
      title="Choose your currency"
      labelledBy="currency-modal-title"
    >
      <div className="modal-list">
        {currencies.map((item) => (
          <label key={item.code} className="modal-option">
            <input
              type="radio"
              name="currency"
              value={item.code}
              checked={currency === item.code}
              onChange={() => setCurrency(item.code)}
            />
            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </Modal>
  );
}

