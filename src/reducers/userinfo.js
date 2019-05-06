import actions from '../constants/actions'

const {
	GET_PERSONINFO_SUCCESS,
	UPDATE_PERSONINFO_SUCCESS,
	GET_FAMILYMEMBER_SUCCESS,
	ADD_FAMILYMEMBER_SUCCESS,
	DEL_FAMILYMEMBER_SUCCESS,
	UPDATE_FAMILYMEMBER_SUCCESS,
	GET_FAMILYMEMBERNUM_SUCCESS,
} = actions;

const initState = {
	msg: '',
	name: '',
	// pwd: '',
	type: '',
}

export default (state={}, action) => {
	switch(action.type) {
		case GET_PERSONINFO_SUCCESS:
			return {
				...state,
				data: action.data
			}
		case UPDATE_PERSONINFO_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case GET_FAMILYMEMBER_SUCCESS:
			return {
				...state,
				members: action.data,
				msg: action.msg
			}
		case ADD_FAMILYMEMBER_SUCCESS:
			return {
				...state,
				members: action.data,
				msg: action.msg
			}
		case DEL_FAMILYMEMBER_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_FAMILYMEMBER_SUCCESS:
			return {
				...state,
				members: action.data,
				msg: action.msg
			}
		case GET_FAMILYMEMBERNUM_SUCCESS:
			return {
				...state,
				membernum: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}