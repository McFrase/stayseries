import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LanguageModal from '@/components/LanguageModal';
import CurrencyModal from '@/components/CurrencyModal';
import AuthModal from '@/components/AuthModal';
import OtpModal from '@/components/OtpModal';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app__main">
        <Outlet />
      </main>
      <Footer />
      <LanguageModal />
      <CurrencyModal />
      <AuthModal />
      <OtpModal />
    </div>
  );
}

