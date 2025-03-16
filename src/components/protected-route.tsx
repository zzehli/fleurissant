import React, { useEffect } from "react"
import { useAuthContext } from "@/hooks"
import { useNavigate } from "react-router";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({children}: ProtectedRouteProps) => {
    const { user, loading } = useAuthContext()
    const navigate = useNavigate()
    useEffect(() => {
        if (!user && !loading) {
          console.log('user not found');
          navigate('/admin/login');
        }
      }, [user, loading, navigate]);
    return children
}

export default ProtectedRoute