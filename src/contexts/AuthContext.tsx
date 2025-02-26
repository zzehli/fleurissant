import { createContext, useEffect, useReducer, Dispatch, ReactNode } from 'react';

type User = {
  user: string | null;
}

type AuthState = {
  user: string | null;
  loading: boolean
};


type AuthAction = 
| { type: 'LOGIN', payload: string } 
| { type: 'LOGOUT' }
| { type: 'SET_LOADING', payload: boolean}

interface AuthContextProps { user: string | null, dispatch: Dispatch<AuthAction>}

interface AuthContextProviderProps { children: ReactNode}

export const AuthContext = createContext<AuthContextProps | null>(null)

// use reducer function to manage the state of the user
export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, loading: false }
    case 'LOGOUT':
      return { user: null, loading: false }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {user: null, loading: true})

  useEffect(() => {
    console.log('user', localStorage.getItem('user'))
    const token = localStorage.getItem('user')!
    if (token){
      dispatch({ type: 'LOGIN', payload: token })
      dispatch({ type: 'SET_LOADING', payload: false})
    }
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}

