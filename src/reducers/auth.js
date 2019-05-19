import actions from '../constants/actions'
import { getRedirectPath } from '../utils/util'
const {
	LOAD_DATA_SUCCESS,
	AUTH_SUCCESS,
	ERROR_MSG,
	LOGOUT_SUCCESS
} = actions;

const initState = {
	redirectTo: '',
	msg: '',
	name: '',
	// pwd: '',
	type: '',
	telephone: '',
	idnumber: '',
}

export default (state=localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):initState, action) => {
	console.log(state)
	switch(action.type) {
		case LOAD_DATA_SUCCESS:
			return {
				...state,
				redirectTo: getRedirectPath(action.payload),
				...action.payload
			}
		case AUTH_SUCCESS:
			return {
				...state,
				redirectTo: getRedirectPath(action.payload),
				msg: action.msg,
				...action.payload
			}
		case ERROR_MSG:
			return {
				...state,
				msg: action.msg
			}
		case LOGOUT_SUCCESS:
			return {
				...initState,
				redirectTo: '/login'
			}
		default:
			return state
	}
}