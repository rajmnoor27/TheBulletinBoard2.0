import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
