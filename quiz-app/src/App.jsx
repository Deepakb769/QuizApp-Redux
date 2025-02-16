import './App.css'
import { BrowserRouter , Routes, Route } from 'react-router-dom'
import Signup from './Container/Authenticate/Signup'
import Login from './Container/Authenticate/Login'
import QuizQuestion from './Container/Authenticate/QuizQuestion'
import Leaderboard from './Container/Authenticate/Leaderboard'
import { useState } from 'react'

function App() {
  

  return (
    // <>
    //   <Signup />
    //   <Login/>
    //   <QuizQuestion />
    //   <Leaderboard />
    // </>
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/quizquestion' element={<QuizQuestion/>}/>
          <Route path='/leaderboard' element={<Leaderboard/>}/>
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
