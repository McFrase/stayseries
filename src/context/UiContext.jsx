import { createContext, useCallback, useContext, useMemo, useState } from 'react';

const UiContext = createContext(null);

const initialModals = {
  language: false,
  currency: false,
  auth: false,
  otp: false,
};

export function UiProvider({ children }) {
  const [currency, setCurrencyState] = useState('NGN');
  const [language, setLanguageState] = useState('EN');
  const [modals, setModals] = useState(initialModals);
  const [authMode, setAuthMode] = useState('sign-in');
  const [authEmail, setAuthEmail] = useState('');

  const closeAll = useCallback(() => {
    setModals(initialModals);
  }, []);

  const openModal = useCallback((key) => {
    setModals((prev) => ({ ...initialModals, [key]: true }));
  }, []);

  const closeModal = useCallback((key) => {
    setModals((prev) => ({ ...prev, [key]: false }));
  }, []);

  const setCurrency = useCallback((code) => {
    setCurrencyState(code);
    closeModal('currency');
  }, [closeModal]);

  const setLanguage = useCallback((code) => {
    setLanguageState(code);
    closeModal('language');
  }, [closeModal]);

  const openAuth = useCallback((mode = 'sign-in') => {
    setAuthMode(mode);
    openModal('auth');
  }, [openModal]);

  const beginOtpFlow = useCallback((email) => {
    setAuthEmail(email);
    setModals((prev) => ({ ...prev, auth: false, otp: true }));
  }, []);

  const value = useMemo(() => ({
    currency,
    language,
    modals,
    authMode,
    authEmail,
    setCurrency,
    setLanguage,
    openModal,
    closeModal,
    closeAll,
    openAuth,
    setAuthMode,
    beginOtpFlow,
  }), [
    currency,
    language,
    modals,
    authMode,
    authEmail,
    setCurrency,
    setLanguage,
    openModal,
    closeModal,
    closeAll,
    openAuth,
    setAuthMode,
    beginOtpFlow,
  ]);

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
}

export function useUi() {
  const context = useContext(UiContext);

  if (!context) {
    throw new Error('useUi must be used within a UiProvider');
  }

  return context;
}

