import { ThemeProvider } from "@/components/theme-provider"
import ProtectedRoute from "@/components/protected-route"
import { Home, Login, Signup, Collection, Product, Cart, NoMatch, AdminLayout, AdminHome, AdminProduct, AdminStock, CustomerOrders } from '@/pages'
import { Routes, Route } from 'react-router'
import { CheckoutSuccess } from "./pages/checkout"
import { RoleObject } from "@/@types"
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route index element={<Home />} />
        <Route path="collection">
          <Route index element={<Collection />} />
          <Route path=":productId" element={<Product />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="checkout">
          <Route path="success" element={<CheckoutSuccess />} />
        </Route>
        <Route path="admin">
          <Route path="login" element={<Login role={RoleObject.ADMIN} />} />
          <Route element={<AdminLayout />}>
            <Route index element={
              <ProtectedRoute role={RoleObject.ADMIN}>
                <AdminHome />
              </ProtectedRoute>
            } />
            <Route path="products">
              <Route index element={
                <ProtectedRoute role={RoleObject.ADMIN}>
                  <AdminProduct />
                </ProtectedRoute>
              } />
              <Route path=":productId">
                <Route path="stocks" element={
                  <ProtectedRoute role={RoleObject.ADMIN}>
                    <AdminStock />
                  </ProtectedRoute>
                } />
              </Route>
            </Route>

          </Route>

        </Route>
        <Route path="customer">
          <Route path="login" element={<Login role={"customer"} />} />
          <Route path="signup" element={<Signup role={"customer"} />} />
          <Route index element={
            <ProtectedRoute role={RoleObject.CUSTOMER}>
              <CustomerOrders />
            </ProtectedRoute>
          } />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
