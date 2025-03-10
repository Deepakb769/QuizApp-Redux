import React from "react";
import { configureStore } from "@reduxjs/toolkit";
// import quizReducer from "./reducer/Reducer";
import questionReducer from "./questions/questionReducer";
import userReducer from "./users/userReducer";
import createSagaMiddleware from "redux-saga";
// import rootSaga from "./rootSaga";
import { watchLogin } from "./users/userSaga";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        quiz : questionReducer,
        user : userReducer
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(watchLogin)

export default store;