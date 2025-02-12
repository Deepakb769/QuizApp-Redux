import './App.css'
import { BrowserRouter, Router,  } from 'react-router-dom'
import Signup from './Container/Authenticate/Signup'
import Login from './Container/Authenticate/Login'
import QuizQuestion from './Container/Authenticate/QuizQuestion'
import Leaderboard from './Container/Authenticate/Leaderboard'

function App() {
  return (
    <>
      <Signup />
      <Login/>
      <QuizQuestion />
      <Leaderboard />
    </>
  )
}

export default App
