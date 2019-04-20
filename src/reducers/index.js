import { combineReducers } from 'redux'
import auth from './auth'
import admininfo from './admininfo'
import userinfo from './userinfo'

export default combineReducers({
	auth,
	admininfo,
	userinfo,
})