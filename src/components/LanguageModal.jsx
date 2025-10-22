import Modal from './Modal';
import { useUi } from '@/context/UiContext';

const languages = [
  { code: 'EN', name: 'English (EN)' },
  { code: 'FR', name: 'Français (FR)' },
  { code: 'PT', name: 'Português (PT)' },
  { code: 'ES', name: 'Español (ES)' },
  { code: 'DE', name: 'Deutsch (DE)' },
];

export default function LanguageModal() {
  const { modals, language, setLanguage, closeModal } = useUi();

  return (
    <Modal
      size="sm"
      isOpen={modals.language}
      onClose={() => closeModal('language')}
      title="Choose your language"
      labelledBy="language-modal-title"
    >
      <div className="modal-list">
        {languages.map((item) => (
          <label key={item.code} className="modal-option">
            <input
              type="radio"
              name="language"
              value={item.code}
              checked={language === item.code}
              onChange={() => setLanguage(item.code)}
            />
            <span>{item.name}</span>
          </label>
        ))}
      </div>
    </Modal>
  );
}

