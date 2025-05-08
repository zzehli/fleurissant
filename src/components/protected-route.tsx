import React, { useEffect } from "react"
import { useAuthContext } from "@/hooks"
import { useNavigate } from "react-router";
import { jwtDecode } from 'jwt-decode';
import { Role } from "@/@types";

interface ProtectedRouteProps {
  children: React.ReactNode;
  role: Role
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const { user, role: userRole, loading, dispatch } = useAuthContext()
  const navigate = useNavigate()

  const isTokenExpired = (token: string) => {
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) {
        return true;
      }
      return decoded.exp < Math.floor(Date.now() / 1000);
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // If error in decoding, assume expired
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate(`/${role}/login`); // Redirect to login page
  };

  useEffect(() => {
    if (!user && !loading) {
      console.log('user not found');
      navigate(`/${role}/login`)
    } else if (user && isTokenExpired(user)) {
      handleLogout()
    } else if (user && userRole !== role) {
      // Redirect if user's role doesn't match the required role
      console.log('unauthorized role');
      handleLogout()
    }
  }, [user, userRole, loading, navigate]);

  return user && userRole === role ? children : null
}

export default ProtectedRoute