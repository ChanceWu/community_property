import actions from '../constants/actions'

const {
	GET_OWNERINFO_SUCCESS,
	DEL_OWNER_SUCCESS,
	GET_OWNERNAME_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_OWNERINFO_SUCCESS:
			return {
				...state,
				data: action.data
			}
		case DEL_OWNER_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case GET_OWNERNAME_SUCCESS:
			return {
				...state,
				ownername: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}