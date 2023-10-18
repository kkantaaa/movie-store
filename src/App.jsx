import { useState } from 'react'
import LandingPage from './pages/landingPage'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LandingPage/>
    </>
  )
}

export default App
