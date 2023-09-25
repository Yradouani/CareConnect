import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user.reducer";
import appointmentReducer from "./appointment.reducer";

const rootReducer = combineReducers({
    //REDUCERS
    userReducer,
    appointmentReducer
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;