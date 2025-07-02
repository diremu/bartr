import {Routes, Route} from 'react-router'
import Landing from './Landing.jsx'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Navbar from './components/Navbar.jsx'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Landing />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
