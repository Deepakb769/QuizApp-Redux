import React, { useEffect,useState } from 'react';
import '../../assets/styles/quizquestion.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateScore,
    setCurrentQuestIndex,
    // setSelectedOption,
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
    const { user } = useSelector((state) => state.user);
    const { score, questions, currentQuestIndex, selectedOption, loading, error } = useSelector((state) => state.quiz);
    
    const [selectedOptionIndex, setSelectedOptionIndex] = useState({});

    useEffect(() => {
        dispatch(fetchQuestions());
    }, [dispatch]);

    useEffect(() => {
        console.log("Questions in Redux:", questions); // Debugging line
    }, [questions]);

    const handleOptionSelect = (index) => {
        setSelectedOptionIndex(prev => ({
            ...prev,
            [currentQuestIndex]: index
        }))
    };

    const handlePrev = () => {
        if (currentQuestIndex > 0) {
            dispatch(setCurrentQuestIndex(currentQuestIndex - 1));
        }
    };

    const handleNext = () => {
        const selectedOption = selectedOptionIndex[currentQuestIndex];
        if (selectedOption === null) {
            alert("Please select an option before proceeding.");
            return;
        }
        // const currentQuestion = questions[currentQuestIndex];
        // const isCorrect = currentQuestion.options[selectedOption] === currentQuestion.correctAnswer;

        // dispatch(updateScore(isCorrect ? 2 : isCorrect)); // Update score in Redux
        // console.log(updateScore)
    
        if (currentQuestIndex < questions.length - 1) {
            dispatch(setCurrentQuestIndex(currentQuestIndex + 1));
        } else {
            let totalScore = 0;
            questions.forEach((question, index) => {
                const selected = selectedOptionIndex[index];
                if (selected !== undefined && question.options[selected] === question.correctAnswer) {
                    totalScore += 2;
                }
            });

            dispatch(updateScore(totalScore)); // Update score in Redux
            dispatch(saveUserScore(user, totalScore));
            console.log(saveUserScore(user, totalScore))
            navigate('/leaderboard');
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
                                        className={`option ${selectedOptionIndex[currentQuestIndex] === index ? 'selected' : ''}`}
                                        onClick={() => handleOptionSelect(index)}
                                    >
                                        <input
                                            type="radio"
                                            name="answer"
                                            id={`option${index}`}
                                            checked={selectedOptionIndex[currentQuestIndex] === index}
                                            onChange={() => handleOptionSelect(index)}
                                        />
                                        <label htmlFor={`option${index}`}>
                                            {index + 1} {option}
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
