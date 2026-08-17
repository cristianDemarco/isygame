import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import CartPage from './pages/CartPage/CartPage'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import ProtectedRoute from './components/guards/ProtectedRoute'
import MainLayout from './layouts/MainLayout'

function App() {
  return (
    <>
        <Routes>
            <Route element={<MainLayout/>}>
              <Route path="/home" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/signup" element={<SignupPage/>} />
              <Route path="/cart" element={<CartPage/>} />
              <Route path="*" element={<NotFound/>} />
            </Route>

            <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole='ROLE_ADMIN'>
                  <AdminDashboard></AdminDashboard>
              </ProtectedRoute>
            }
            />
        </Routes>
    </>
  )
}

export default App
