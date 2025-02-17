import { ThemeProvider } from "@/components/theme-provider"
import { Home, Login, Signup } from './pages'
import {Routes, Route} from 'react-router'

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> 
      <Routes>
        <Route index element={<Home />} />
        <Route path="admin">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
