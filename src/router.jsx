import { createBrowserRouter } from 'react-router-dom';
import App from '@/App';
import HomePage from '@/pages/HomePage';
import SearchResultsPage from '@/pages/SearchResultsPage';
import PropertyDetailsPage from '@/pages/PropertyDetailsPage';
import BookingStep1 from '@/pages/BookingStep1';
import BookingStep2 from '@/pages/BookingStep2';
import AccountDashboardPage from '@/pages/AccountDashboardPage';

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/search',
        element: <SearchResultsPage />,
      },
      {
        path: '/property/:id',
        element: <PropertyDetailsPage />,
      },
      {
        path: '/booking/:id/guest',
        element: <BookingStep1 />,
      },
      {
        path: '/booking/:id/payment',
        element: <BookingStep2 />,
      },
      {
        path: '/account',
        element: <AccountDashboardPage />,
      },
    ],
  },
]);

export default router;
