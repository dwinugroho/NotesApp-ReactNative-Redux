import { combineReducers } from 'redux';

// import all reducers
import notes from './notes';
import category from './category';

//combine with combineReducers
const appReducers = combineReducers({
	notes,
	category
})

export default appReducers;