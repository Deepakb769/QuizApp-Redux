import React, { useEffect, useState } from 'react'

const QuizQuestion = () => {
    const [question, setQuestion] = useState([]);
    const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const storedQuestion = JSON.parse(localStorage.getItem('questions'))
        const storeIndex = parseInt(localStorage.getItem('currentQuestIndex')) || 0;

        if(!storedQuestion){
            const defaultQuestion = Array.from({ length : 10 }, (_,index) => ({
              id : index + 1,
              questionText: index === 0 ? "Who is the director of Man of Steel?" : `Question ${index + 1}`,
              supportingText: index === 0 ? "Supporting Text" : `Supporting Text for question ${index + 1}`
            })) 

            localStorage.setItem('questions', JSON.stringify(defaultQuestion));
            setQuestion(defaultQuestion)
          }
          else{
            setQuestion(storedQuestion);
        }

        setCurrentQuestIndex(storeIndex);
        setIsLoaded(true);
    },[])

    const handleNext = () => {
        if(currentQuestIndex < question.length - 1){
            const newIndex = currentQuestIndex + 1;
            setCurrentQuestIndex(newIndex);
            localStorage.setItem('currentQuestIndex',newIndex.toString())
        }
    } 

    if(!isLoaded || question.length === 0) return <div>Loading...</div>

  return (
    <>
      <div className="leaderboard-title">
        <h1>Questions {currentQuestIndex + 1} of {question.length}</h1>
      </div>
      
      <div className="question-cards">
        <h2>{question[currentQuestIndex]?.questionText}</h2>
        <p>{question[currentQuestIndex]?.supportingText}</p>
      </div>
      <button onClick={handleNext} disabled={currentQuestIndex >= question.length - 1}>Submit & Continue</button>
    </>
  )
}

export default QuizQuestion
