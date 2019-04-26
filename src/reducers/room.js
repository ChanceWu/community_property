import actions from '../constants/actions'

const {
	GET_ROOMLIST_SUCCESS,
	ADD_ROOM_SUCCESS,
	DEL_ROOM_SUCCESS,
	UPDATE_ROOM_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_ROOMLIST_SUCCESS:
			return {
				...state,
				room: action.data,
				msg: action.msg
			}
		case ADD_ROOM_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_ROOM_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_ROOM_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		default:
			return state
	}
}