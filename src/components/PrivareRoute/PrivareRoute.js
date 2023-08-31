import { Navigate } from 'react-router-dom';
import { store } from '../../redux/store';
export const PrivateRoute = ({ children }) => {
  const isAuth = store.getState().isAuth;
  const role = store.getState().role;
  return isAuth && role ? children : <Navigate to="/login" />;
};
