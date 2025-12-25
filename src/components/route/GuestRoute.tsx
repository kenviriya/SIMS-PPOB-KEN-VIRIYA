import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import type {JSX} from 'react';
import type {RootState} from '../../app/store';

export default function GuestRoute({children}: {children: JSX.Element}) {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
