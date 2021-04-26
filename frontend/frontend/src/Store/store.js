import { createStore ,combineReducers} from 'redux';
import userReducer from '../Store/Reducers/user'
 const reducer=combineReducers({userReducer})
 const store=createStore(reducer)
 window.store=store;
 export default store;


