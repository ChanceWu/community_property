import actions from '../constants/actions'

const {
	GET_PERSONINFO_SUCCESS,
	UPDATE_PERSONINFO_SUCCESS,
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
		default:
			return state
	}
}