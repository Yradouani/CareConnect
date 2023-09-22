import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import appointmentReducer from "./appointment.reducer";

export default combineReducers({
    //REDUCERS
    userReducer,
    appointmentReducer
})