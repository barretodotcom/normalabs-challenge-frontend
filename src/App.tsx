import { useState } from 'react'
import './index.css'
import Header from './components/Header'
import RouterContainer from './router/RouterContainer'
import { AuthContext, AuthProvider } from './context/authContext'
import MessageBox from './components/MessageBox'
import { useContext } from 'react'

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <RouterContainer />
        <MessageBox />
      </AuthProvider>
    </div>
  )
}

export default App
