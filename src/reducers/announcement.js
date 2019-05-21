import actions from '../constants/actions'
const {
	GET_ANNOUNCEMENTLIST_SUCCESS,
	ADD_ANNOUNCEMENT_SUCCESS,
	DEL_ANNOUNCEMENT_SUCCESS,
	UPDATE_ANNOUNCEMENT_SUCCESS,
	GET_ANNOUNCEMENTBYUSER_SUCCESS,
	GET_ONEANNOUNCEMENT_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_ANNOUNCEMENTLIST_SUCCESS:
			return {
				...state,
				announcement: action.data,
				msg: action.msg
			}
		case GET_ONEANNOUNCEMENT_SUCCESS:
			return {
				...state,
				oneannouncement: action.data,
				msg: action.msg
			}
		case ADD_ANNOUNCEMENT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_ANNOUNCEMENT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_ANNOUNCEMENT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case GET_ANNOUNCEMENTBYUSER_SUCCESS:
			return {
				...state,
				announcement: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}