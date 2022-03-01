import cartAction from "./cartreducer";
import authAction from "../auth/reducer";

import {combineReducers} from 'redux'


//combine reducer
const rootReducer=combineReducers({cartAction, authAction})

export default rootReducer;
