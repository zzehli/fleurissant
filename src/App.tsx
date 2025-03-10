import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from "@/components/protected-route"
import { Home, Login, Signup, Collection, Product } from '@/pages'
import {Routes, Route} from 'react-router'
import { AdminLayout, AdminHome } from './pages/admin'

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme"> 
      <Routes>
        <Route index element={<Home />} />
        <Route path="collection">
          <Route index element={<Collection/>}/>
          <Route path=":productId" element={<Product/>}/>
        </Route>
        <Route path="admin">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<AdminLayout/>}>
              <Route index element={
                <ProtectedRoute>
                <AdminHome/>
                </ProtectedRoute>
                }/> 
          </Route>

        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
