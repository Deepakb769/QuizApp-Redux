import React, { useEffect, useState } from 'react';
import '../../assets/styles/quizquestion.css';
import { useNavigate } from 'react-router-dom';

const QuizQuestion = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestIndex, setCurrentQuestIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();

    // Initialize or load questions from localStorage
    useEffect(() => {
        // Load or initialize questions
        const storedQuestions = JSON.parse(localStorage.getItem('questions'));
        const storedIndex = parseInt(localStorage.getItem('currentQuestIndex')) || 0;

        if (!storedQuestions) {
            // Create default questions if none exist
            const defaultQuestions = Array.from({ length: 10 }, (_, index) => ({
                id: index + 1,
                questionText: index === 0 ? "Who is the director of Man of Steel?" : `Question ${index + 1}`,
                supportingText: index === 0 ? "Supporting Text" : `Supporting Text for question ${index + 1}`,
                options: ["Option 1", "Option 2", "Option 3", "Option 4"],
            }));

            localStorage.setItem('questions', JSON.stringify(defaultQuestions));
            setQuestions(defaultQuestions)
        } else {
            setQuestions(storedQuestions);
        }

        setCurrentQuestIndex(storedIndex);
        setIsLoaded(true);
    }, []);

    const handleOptionSelect = (optionIndex) => {
        setSelectedOption(optionIndex);
    };

    const handleNext = () => {
        if (currentQuestIndex < questions.length - 1) {
            const newIndex = currentQuestIndex + 1;
            setCurrentQuestIndex(newIndex);
            setSelectedOption(null);
            localStorage.setItem('currentQuestIndex', newIndex.toString());
        }
        else {
            localStorage.removeItem('currentQuestIndex')
            console.log('Navigating to Leaderboard')
            navigate('/leaderboard')
        }
    };

    if (!isLoaded || questions.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="quiz-container">
            <header>
                <h1>techpasthshala</h1>
            </header>

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
    );
};

export default QuizQuestion;