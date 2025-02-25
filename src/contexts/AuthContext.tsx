import { createContext, useEffect, useReducer, Dispatch, ReactNode } from 'react';

interface User {
  authorization: string;
}

interface AuthState {
  user: User | null
}

type AuthAction = 
| { type: 'LOGIN', payload: User } 
| { type: 'LOGOUT' };

interface AuthContextProps { user: User | null, dispatch: Dispatch<AuthAction>}

interface AuthContextProviderProps { children: ReactNode}

export const AuthContext = createContext<AuthContextProps | null>(null)

// use reducer function to manage the state of the user
export const authReducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, {user: null})

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')!)
    if (user){
      dispatch({ type: 'LOGIN', payload: user })
    }
  }, [])

  console.log('AuthContext state:', state)

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )
}

