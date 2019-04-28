import actions from '../constants/actions'

const {
	GET_OWNERINFO_SUCCESS,
	DEL_OWNER_SUCCESS,
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
		default:
			return state
	}
}