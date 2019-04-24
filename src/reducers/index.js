import { combineReducers } from 'redux'
import auth from './auth'
import admininfo from './admininfo'
import userinfo from './userinfo'
import house from './house'
import community from './community'

export default combineReducers({
	auth,
	admininfo,
	userinfo,
	house,
	community,
})