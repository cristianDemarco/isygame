import { useState } from 'react'
import Navbar from './components/Navbar'
import ProductLine from './components/ProductsLines'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="row">
        <Navbar></Navbar>
      </div>
      <ProductLine></ProductLine>
    </>
  )
}

export default App
