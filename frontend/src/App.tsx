import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage/SignupPage'

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
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
