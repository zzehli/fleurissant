import { createContext, useEffect, useReducer, Dispatch, ReactNode } from 'react';
import { Role } from '@/@types';

type AuthState = {
  user: string | null;
  role: Role | null;
  loading: boolean
};


type AuthAction =
  | { type: 'LOGIN', payload: { token: string, role: Role } }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING', payload: boolean }

interface AuthContextProps extends AuthState { dispatch: Dispatch<AuthAction> }

interface AuthContextProviderProps { children: ReactNode }

export const AuthContext = createContext<AuthContextProps | null>(null)

// use reducer function to manage the state of the user
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        user: action.payload.token,
        role: action.payload.role,
        loading: false
      }
    case 'LOGOUT':
      // 'user' is actually the token
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      return { user: null, role: null, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, { user: null, role: null, loading: true })

  useEffect(() => {
    const token = localStorage.getItem('user')
    const role = localStorage.getItem('role') as Role | null

    if (token && role) {
      dispatch({ type: 'LOGIN', payload: { token, role } })
      dispatch({ type: 'SET_LOADING', payload: false })
    } else {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])


  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  )
}

