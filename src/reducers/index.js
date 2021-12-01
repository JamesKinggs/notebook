import { combineReducers } from "redux";
import toggleSpanReducer from "./toggleSpan";
import nightThemeReducer from "./nightThemeReducer";

const rootReducer = combineReducers({
  spanReducer: toggleSpanReducer,
  nightReducer: nightThemeReducer,
});

export default rootReducer;
