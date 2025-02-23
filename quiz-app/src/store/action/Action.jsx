export const SIGNUP_AUTH = 'quiz/signupAuth'
export const SET_QUESTIONS = 'quiz/setQuestions'
export const SET_CURRENT_QUEST_INDEX = 'quiz/setCurrentQuestIndex'
export const SET_SELECTED_OPTION = 'quiz/setSelectedOption'
export const RESET_QUIZ = 'quiz/resetQuiz'
export const UPDATE_SCORE = 'quiz/updateScore'
export const SIGNUP_USER = "quiz/signupUser";
export const LOGIN_USER = "quiz/loginUser";
export const LOGOUT_USER = "quiz/logoutUser";

// export const signupAuth = () => {
    
// } 

    // const storedQuestions = localStorage.getItem("questionText");

    // if(storedQuestions){
    //      return JSON.parse(storedQuestions)
    // };

    // const defaultQuestions = [
    //     { id: 1, questionText: "Who directed the movie 'Inception'?", supportingText: "Hint: He also directed 'Interstellar'.", options: ["Steven Spielberg", "Christopher Nolan", "James Cameron", "Quentin Tarantino"] },
    //     { id: 2, questionText: "What is the capital of France?", supportingText: "A famous city for romance and art.", options: ["Rome", "Berlin", "Madrid", "Paris"] },
    //     { id: 3, questionText: "Which planet is known as the Red Planet?", supportingText: "It is named after the Roman god of war.", options: ["Earth", "Mars", "Jupiter", "Venus"] },
    //     { id: 4, questionText: "Who wrote 'To Kill a Mockingbird'?", supportingText: "A classic novel about racial injustice.", options: ["J.K. Rowling", "Harper Lee", "Jane Austen", "Mark Twain"] },
    //     { id: 5, questionText: "What is the hardest natural substance on Earth?", supportingText: "It is often used in jewelry.", options: ["Gold", "Platinum", "Diamond", "Silver"] },
    //     { id: 6, questionText: "Which country is famous for the Great Wall?", supportingText: "A historical wonder of the world.", options: ["India", "China", "Egypt", "Brazil"] },
    //     { id: 7, questionText: "What is the smallest prime number?", supportingText: "It is the only even prime number.", options: ["1", "2", "3", "5"] },
    //     { id: 8, questionText: "Who painted the Mona Lisa?", supportingText: "The artist was also an inventor.", options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"] },
    //     { id: 9, questionText: "What is the chemical symbol for water?", supportingText: "It consists of two elements.", options: ["O2", "CO2", "H2O", "NaCl"] },
    //     { id: 10, questionText: "Which continent is the largest by area?", supportingText: "It is home to China and India.", options: ["Africa", "North America", "Asia", "Europe"] }
    // ]

    // localStorage.setItem('questionText', JSON.stringify(defaultQuestions))
    // return defaultQuestions
// }

// export const signupUser = (userData) => {
//   return { type: SIGNUP_USER, payload: userData };
// };

export const signupUser = (userData) => async (dispatch) => {
  try {
      const response = await axios.post("http://localhost:5000/users", userData);
      dispatch({ type: SIGNUP_USER, payload: response.data });
  } catch (error) {
      console.error("Signup failed:", error);
  }
};

// export const loginUser = (email, password) => {
//   return { type: LOGIN_USER, payload: { email, password } };
// };

export const loginUser = (userData) => async (dispatch) => {
  try {
      const response = await axios.get(`${"http://localhost:5000/users"}?email=${userData.email}&password=${userData.password}`);
      if (response.data.length > 0) {
          dispatch({ type: LOGIN_USER, payload: response.data[0] });
      } else {
          console.error("Invalid email or password");
      }
  } catch (error) {
      console.error("Login failed:", error);
  }
};

export const logoutUser = () => {
  return { type: LOGOUT_USER };
};

export const loadQuestions = () => {
    return async (dispatch) => {
      try {
        const response = await fetch("http://localhost:5000/questions");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetching",data)
        dispatch({ type: SET_QUESTIONS, payload: data });
      } catch (error) {
        console.error("Failed to fetch questions:", error);
        // Dispatch an error state if needed
      }
    };
  };

export const saveQuestions = (questions) => {
    localStorage.setItem('questionText', JSON.stringify(questions))
}

export const loadCurrentQuestIndex = () => {
    return parseInt(localStorage.getItem('currentQuestIndex')) || 0;
}

export const setQuestions = (questions) => {
    saveQuestions(questions)
    return { type: SET_QUESTIONS, payload: questions };
}

export const setCurrentQuestIndex = (index) => {
    localStorage.setItem("currentQuestIndex", index.toString())
    return { type: SET_CURRENT_QUEST_INDEX, payload: index }
}

export const setSelectedOption = (option) => {
    return { type: SET_SELECTED_OPTION, payload: option }
}

export const resetQuiz = () => {
    localStorage.removeItem('currentQuestIndex')
    return { type: RESET_QUIZ }
}

export const updateScore = (points) => {
  return { type : UPDATE_SCORE, payload : points }
}
