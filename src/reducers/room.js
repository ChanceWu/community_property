import actions from '../constants/actions'

const {
	GET_ROOMLIST_SUCCESS,
	ADD_ROOM_SUCCESS,
	DEL_ROOM_SUCCESS,
	UPDATE_ROOM_SUCCESS,
	GET_ONEROOM_SUCCESS,
	GET_ROOMBYUSESR_SUCCESS,
	GET_ROOMNAME_SUCCESS,
	GET_ROOMNUM_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_ROOMLIST_SUCCESS:
			return {
				...state,
				room: action.data,
				msg: action.msg
			}
		case GET_ONEROOM_SUCCESS:
			return {
				...state,
				oneroom: action.data,
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
		case GET_ROOMBYUSESR_SUCCESS:
			return {
				...state,
				room: action.data
			}
		case GET_ROOMNAME_SUCCESS:
			return {
				...state,
				roomName: action.data,
				msg: action.msg
			}
		case GET_ROOMNUM_SUCCESS:
			return {
				...state,
				roomnum: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}