import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'

function App() {

  return (
    <>
      <div className="row">
        <Navbar></Navbar>
      </div>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
