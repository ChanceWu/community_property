import actions from '../constants/actions'

const {
	GET_GARAGELIST_SUCCESS,
	ADD_GARAGE_SUCCESS,
	DEL_GARAGE_SUCCESS,
	UPDATE_GARAGE_SUCCESS,
	GET_GARAGEBYUSER_SUCCESS,
	GET_GARAGENUM_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_GARAGELIST_SUCCESS:
			return {
				...state,
				garage: action.data,
				msg: action.msg
			}
		case ADD_GARAGE_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_GARAGE_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_GARAGE_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case GET_GARAGEBYUSER_SUCCESS:
			return {
				...state,
				garage: action.data,
				msg: action.msg
			}
		case GET_GARAGENUM_SUCCESS:
			return {
				...state,
				garagenum: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}