import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import type {RootState} from '../../app/store';
import type {JSX} from 'react';

export default function ProtectedRoute({children}: {children: JSX.Element}) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
