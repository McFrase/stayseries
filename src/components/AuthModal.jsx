import { useEffect, useState } from 'react';
import Modal from './Modal';
import { useUi } from '@/context/UiContext';

const tabLabels = {
  'sign-in': 'Sign in',
  'sign-up': 'Create an account',
};

export default function AuthModal() {
  const { modals, closeModal, authMode, setAuthMode, beginOtpFlow } = useUi();
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (!modals.auth) {
      setEmail('');
    }
  }, [modals.auth]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      return;
    }

    beginOtpFlow(email);
  };

  return (
    <Modal
      isOpen={modals.auth}
      onClose={() => closeModal('auth')}
      size="sm"
      title="Sign in or Create an account"
      labelledBy="auth-modal-title"
    >
      <div className="auth-modal">
        <div className="auth-modal__tabs" role="tablist" aria-label="Authentication tabs">
          {Object.entries(tabLabels).map(([mode, label]) => (
            <button
              key={mode}
              type="button"
              role="tab"
              aria-selected={authMode === mode}
              className={authMode === mode ? 'auth-modal__tab auth-modal__tab--active' : 'auth-modal__tab'}
              onClick={() => setAuthMode(mode)}
            >
              {label}
            </button>
          ))}
        </div>
        <form className="auth-modal__form" onSubmit={onSubmit}>
          <label htmlFor="auth-email" className="auth-modal__label">
            Email address
          </label>
          <input
            id="auth-email"
            type="email"
            className="input"
            placeholder="Enter your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary auth-modal__submit" disabled={!email}>
            Continue with email
          </button>
        </form>
        <div className="auth-modal__divider" role="presentation">
          <span />
          <p>or use one of these options</p>
          <span />
        </div>
        <button type="button" className="btn btn-secondary auth-modal__google">
          Continue with Google
        </button>
        <p className="auth-modal__legal">
          By signing in or creating an account, you agree with our Terms &amp; Conditions and Privacy
          statement.
        </p>
      </div>
    </Modal>
  );
}

