import { combineReducers } from 'redux'
import auth from './auth'
import admininfo from './admininfo'

export default combineReducers({
	auth,
	admininfo,
})