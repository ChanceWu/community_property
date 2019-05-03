import actions from '../constants/actions'

const {
	GET_REPAIRLIST_SUCCESS,
	ADD_REPAIR_SUCCESS,
	DEL_REPAIR_SUCCESS,
	UPDATE_REPAIR_SUCCESS,
	GET_REPAIRBYUSER_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_REPAIRLIST_SUCCESS:
			return {
				...state,
				repair: action.data,
				msg: action.msg
			}
		case ADD_REPAIR_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_REPAIR_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_REPAIR_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case GET_REPAIRBYUSER_SUCCESS:
			return {
				...state,
				repair: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}