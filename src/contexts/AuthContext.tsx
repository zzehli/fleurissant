import { createContext, useEffect, useReducer, Dispatch, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';

type AuthState = {
  user: string | null;
  loading: boolean
};


type AuthAction =
  | { type: 'LOGIN', payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING', payload: boolean }

interface AuthContextProps extends AuthState { dispatch: Dispatch<AuthAction> }

interface AuthContextProviderProps { children: ReactNode }

export const AuthContext = createContext<AuthContextProps | null>(null)

// use reducer function to manage the state of the user
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  console.log(action)
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, loading: false }
    case 'LOGOUT':
      localStorage.removeItem('user')
      return { user: null, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, loading: true })
  const navigate = useNavigate()

  // const isTokenExpired = (token: string) => {
  //   console.log('check token')
  //   try {
  //     const decoded = jwtDecode(token);
  //     if (!decoded.exp) {
  //       return true;
  //     }
  //     return decoded.exp < Math.floor(Date.now() / 1000);
  //   } catch (error) {
  //     return true; // If error in decoding, assume expired
  //   }
  // };

  // // Logout function
  // const handleLogout = () => {
  //   localStorage.removeItem("jwtToken");
  //   // setUser(null);
  //   dispatch({ type: 'LOGOUT' })
  //   navigate("/admin/login"); // Redirect to login page
  // };

  useEffect(() => {
    // console.log('user', localStorage.getItem('user'))
    const token = localStorage.getItem('user')!

    if (token) {
      console.log('user', jwtDecode(token))
      dispatch({ type: 'LOGIN', payload: token })
      dispatch({ type: 'SET_LOADING', payload: false })
    } else {
      dispatch({ type: 'LOGOUT' })
    }
  }, [])

  // console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

