import { combineReducers } from 'redux'
import auth from './auth'
import admininfo from './admininfo'
import userinfo from './userinfo'
import house from './house'
import community from './community'
import building from './building'
import unit from './unit'
import room from './room'
import cost from './cost'

export default combineReducers({
	auth,
	admininfo,
	userinfo,
	house,
	community,
	building,
	unit,
	room,
	cost,
})