import React from 'react'
import { useSelector } from 'react-redux'

const ProgressBar = () => {
    const {currentQuestIndex, questions} = useSelector((state) => state.quiz)
    const progress = ((currentQuestIndex)/ questions.length) * 100;

  return (
    <>
      <div className="progress-container" style={{width : '100%',}}>
        <div className="progress-bar" style={{width : `${progress}%`, height: '100%'}}></div>
      </div>
    </>
  )
}

export default ProgressBar
