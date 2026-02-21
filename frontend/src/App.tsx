import { useState } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="row">
        <Navbar></Navbar>
      </div>
      <HomePage></HomePage>
    </>
  )
}

export default App
