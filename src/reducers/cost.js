import actions from '../constants/actions'

const {
	GET_COSTLIST_SUCCESS,
	ADD_COST_SUCCESS,
	DEL_COST_SUCCESS,
	UPDATE_COST_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_COSTLIST_SUCCESS:
			return {
				...state,
				cost: action.data,
				msg: action.msg
			}
		case ADD_COST_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_COST_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_COST_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		default:
			return state
	}
}