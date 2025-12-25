import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import ProtectedRoute from './components/route/ProtectedRoute';
import GuestRoute from './components/route/GuestRoute';
import AccountPage from './pages/Account';
import TransactionPage from './pages/Transaction';
import TopupPage from './pages/Topup';
import PurchasePage from './pages/Purchase';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/login',
        element: (
          <GuestRoute>
            <LoginPage />
          </GuestRoute>
        ),
      },
      {
        path: '/register',
        element: (
          <GuestRoute>
            <RegisterPage />
          </GuestRoute>
        ),
      },
      {
        path: '/account',
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/transaction',
        element: (
          <ProtectedRoute>
            <TransactionPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/topup',
        element: (
          <ProtectedRoute>
            <TopupPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/purchase/:serviceCode',
        element: (
          <ProtectedRoute>
            <PurchasePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
