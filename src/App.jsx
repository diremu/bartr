import {Routes, Route} from 'react-router'
import Landing from './Landing.jsx'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </>
  )
}

export default App
