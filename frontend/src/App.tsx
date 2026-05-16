import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'
import CartPage from './pages/CartPage/CartPage'

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="row">
          <Navbar></Navbar>
        </div>
        <Routes>

            <Route path="/home" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignupPage/>} />
            <Route path="/cart" element={<CartPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
