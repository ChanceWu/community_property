import actions from '../constants/actions'

const {
	GET_CHARGELIST_SUCCESS,
	ADD_CHARGE_SUCCESS,
	DEL_CHARGE_SUCCESS,
	UPDATE_CHARGE_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_CHARGELIST_SUCCESS:
			return {
				...state,
				charge: action.data,
				msg: action.msg
			}
		case ADD_CHARGE_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_CHARGE_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_CHARGE_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		default:
			return state
	}
}