import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import promiseMiddleware from 'redux-promise-middleware'

// Reducer
import rootReducer from './reducer';

// Make Logging with Redux-Logger for Debugging
const logger = createLogger({})


// define store
const store = createStore(
	rootReducer,
	applyMiddleware(
		logger,
		promiseMiddleware
	)
)

export default store;