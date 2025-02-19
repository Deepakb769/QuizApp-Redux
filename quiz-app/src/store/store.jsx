import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./reducer/Reducer";

const store = configureStore({
    reducer: {
        quiz : quizReducer,
    }
});

export default store;