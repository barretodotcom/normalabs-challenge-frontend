import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import Home from './components/Home'
import RouterContainer from './router/RouterContainer'
import { AuthProvider } from './context/authContext'

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <RouterContainer />
      </div>
    </AuthProvider>
  )
}

export default App
