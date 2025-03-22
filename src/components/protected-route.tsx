import React, { useEffect } from "react"
import { useAuthContext } from "@/hooks"
import { useNavigate } from "react-router";
import { jwtDecode } from 'jwt-decode';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading, dispatch } = useAuthContext()
  const navigate = useNavigate()

  const isTokenExpired = (token: string) => {
    console.log('check token')
    try {
      const decoded = jwtDecode(token);
      if (!decoded.exp) {
        return true;
      }
      return decoded.exp < Math.floor(Date.now() / 1000);
    } catch (error) {
      return true; // If error in decoding, assume expired
    }
  };

  const handleLogout = () => {
    // localStorage.removeItem("jwtToken");
    // setUser(null);
    dispatch({ type: 'LOGOUT' })
    navigate("/admin/login"); // Redirect to login page
  };

  useEffect(() => {
    const token = localStorage.getItem('user')
    if (!user && !loading) {
      console.log('user not found');
      navigate('/admin/login')
    } else if (user && isTokenExpired(user)) {
      handleLogout()
    }
  }, [user, loading, navigate]);
  return user ? children : null
}

export default ProtectedRoute