import { watchSignupUser } from "./users/userSaga";
import { watchQuestionsSaga } from "./questions/questionSaga";
import { all } from "axios";

export default function* rootSaga(){
    yield all([ 
        watchSignupUser()
    ])
}