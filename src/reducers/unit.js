import actions from '../constants/actions'

const {
	GET_UNITLIST_SUCCESS,
	ADD_UNIT_SUCCESS,
	DEL_UNIT_SUCCESS,
	UPDATE_UNIT_SUCCESS,
	GET_UNITNAME_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_UNITLIST_SUCCESS:
			return {
				...state,
				unit: action.data,
				msg: action.msg
			}
		case ADD_UNIT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_UNIT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_UNIT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case GET_UNITNAME_SUCCESS:
			return {
				...state,
				unitName: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}