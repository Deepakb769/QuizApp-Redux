import React, { useEffect, useState } from 'react';
import '../../assets/styles/quizquestion.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentQuestIndex, setSelectedOption, resetQuiz, loadQuestions } from '../../store/action/Action';
import Navbar from '../../Components/Navbar';

const QuizQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { questions, currentQuestIndex, selectedOption } = useSelector((state) => state.quiz);

    useEffect(() => {
        // dispatch(loadQuestions())
        
        if(questions.length === 0){
            dispatch(resetQuiz());
        }
    }, [dispatch, questions.length]);

    const handleOptionSelect = (index) => {
        dispatch(setSelectedOption(index));
    };

    const handleNext = () => {
        if(currentQuestIndex < questions.length - 1){
            dispatch(setCurrentQuestIndex(currentQuestIndex + 1));
        }
        else{
            dispatch(resetQuiz());
            navigate('/leaderboard');
        }
    };

    if(questions.length === 0 ){
        return <div>Loading...</div>
    }
    
    return (
        <>
        <div className="quiz-container">
            <Navbar />

            <div className="progress-indicator">
                Question {currentQuestIndex + 1} of {questions.length}
            </div>

            <div className="question-card">
                <h2>{questions[currentQuestIndex]?.questionText}</h2>
                <p className="supporting-text">{questions[currentQuestIndex]?.supportingText}</p>

                <div className="options-container">
                    {questions[currentQuestIndex].options?.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${selectedOption === index ? 'selected' : ''}`}
                            onClick={() => handleOptionSelect(index)}
                        >
                            <input
                                type="radio"
                                name="answer"
                                id={`option${index}`}
                                checked={selectedOption === index}
                                onChange={() => handleOptionSelect(index)}
                            />
                            <label htmlFor={`option${index}`}>
                                {index + 1}. {option}
                            </label>
                        </div>
                    ))}
                </div>

                <button
                    className="submit-button"
                    onClick={handleNext}
                // disabled={selectedOption === null}
                >
                    {currentQuestIndex === questions.length - 1 ? 'Submit' : 'Submit & Continue →'}
                </button>
            </div>
        </div>
        </>
    );
};

export default QuizQuestion;