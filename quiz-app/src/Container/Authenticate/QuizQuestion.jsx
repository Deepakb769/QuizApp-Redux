import React, { useEffect } from 'react';
import '../../assets/styles/quizquestion.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateScore,
    setCurrentQuestIndex,
    setSelectedOption,
    resetQuiz,
    fetchQuestions,
    saveUserScore,
} from '../../store/questions/questionAction';
import Navbar from '../../Components/Navbar';
import ProgressBar from '../../Components/ProgressBar';
import { toast } from 'react-toastify';

const QuizQuestion = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {user} = useSelector((state) => state.user);
    const { scoreSaveCompleted } = useSelector((state) => state.user);
    const { score, questions, currentQuestIndex, selectedOption, loading, error } = useSelector((state) => state.quiz);

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    useEffect(() => {
        if (scoreSaveCompleted) {
          dispatch(resetQuiz());
          navigate('/leaderboard');
          // Reset the completion flag
          dispatch({ type: "RESET_SCORE_SAVE_FLAG" });
        }
      }, [scoreSaveCompleted, dispatch, navigate]);

    const handleOptionSelect = (index) => {
        dispatch(setSelectedOption(index));
    };

    const handlePrev = () => {
        if (currentQuestIndex > 0) {
            dispatch(setCurrentQuestIndex(currentQuestIndex - 1));
        }
    };

    const handleNext = () => {
        if(selectedOption === null){
          alert("Please select an option before proceeding.")
          return;
        }
        
        const currentQuestion = questions[currentQuestIndex];
        const isCorrect = currentQuestion.options[selectedOption] === currentQuestion.correctAnswer;
      
        // Set score directly for this session
        const newScore = isCorrect ? score + 2 : score;

        console.log(currentQuestIndex);
        console.log(score)
        console.log(newScore)
        
        if (currentQuestIndex < questions.length - 1) {
          dispatch(setCurrentQuestIndex(currentQuestIndex + 1));
          dispatch(setSelectedOption(null))
          dispatch(updateScore(isCorrect ? 2 : 0)); // Update with new value
          
        } else {
            try {
                dispatch(saveUserScore(user, newScore)); // Wait for the score to save
                // dispatch(resetQuiz());
                navigate('/leaderboard');
            } catch (error) {
                console.error("Failed to save score:", error);
                // Handle error (e.g., show a message)
            }
        }
      };

    return (
        <div className="quiz-container">
            <Navbar />
            <div className="quiz-play">
                {loading && <p>Loading questions...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!loading && !error && questions.length === 0 && <p>No questions found.</p>}
                {!loading && questions.length > 0 && (
                    <>
                        <div className="progress-indicator">
                            Question {currentQuestIndex + 1} of {questions.length}
                            <ProgressBar />
                        </div>

                        <div className="question-card">
                            <h2>{currentQuestIndex + 1}. {questions[currentQuestIndex]?.questionText}</h2>
                            <p className="supporting-text">{questions[currentQuestIndex]?.supportingText}</p>

                            <div className="options-container">
                                {questions[currentQuestIndex]?.options?.map((option, index) => (
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

                            {currentQuestIndex > 0 && (
                                <button className='previous-btn' onClick={handlePrev}>
                                    Previous
                                </button>
                            )}


                            <button
                                className="submit-button"
                                onClick={handleNext}
                            >
                                {currentQuestIndex === questions.length - 1 ? 'Submit' : 'Submit & Continue →'}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default QuizQuestion;
