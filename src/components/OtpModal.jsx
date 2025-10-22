import { useEffect, useRef, useState } from 'react';
import Modal from './Modal';
import { useUi } from '@/context/UiContext';

const DIGIT_COUNT = 4;

export default function OtpModal() {
  const { modals, closeModal, authEmail, closeAll } = useUi();
  const [digits, setDigits] = useState(Array(DIGIT_COUNT).fill(''));
  const inputsRef = useRef([]);

  useEffect(() => {
    if (!modals.otp) {
      setDigits(Array(DIGIT_COUNT).fill(''));
    }
  }, [modals.otp]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) {
      return;
    }
    const next = [...digits];
    next[index] = value;
    setDigits(next);

    if (value && index < DIGIT_COUNT - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (digits.some((digit) => digit === '')) {
      return;
    }

    closeAll();
  };

  const filled = digits.every((digit) => digit !== '');

  return (
    <Modal
      isOpen={modals.otp}
      onClose={() => closeModal('otp')}
      size="sm"
      title="Verify your email address"
      labelledBy="otp-modal-title"
    >
      <form className="otp-modal" onSubmit={onSubmit}>
        <p className="otp-modal__subtitle">
          We sent a verification code to <strong>{authEmail}</strong>. Enter this code to continue.
        </p>
        <div className="otp-modal__inputs">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputsRef.current[index] = node;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="input otp-modal__input"
              value={digit}
              onChange={(event) => handleChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
              aria-label={`Digit ${index + 1}`}
            />
          ))}
        </div>
        <button type="submit" className="btn btn-primary" disabled={!filled}>
          Verify email
        </button>
        <div className="otp-modal__links">
          <button type="button" className="btn btn-ghost otp-modal__link">
            Request new code
          </button>
          <button type="button" className="btn btn-ghost otp-modal__link" onClick={() => closeModal('otp')}>
            Back to sign in
          </button>
        </div>
      </form>
    </Modal>
  );
}

