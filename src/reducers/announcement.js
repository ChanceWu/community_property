import actions from '../constants/actions'
const {
	GET_ANNOUNCEMENTLIST_SUCCESS,
	ADD_ANNOUNCEMENT_SUCCESS,
	DEL_ANNOUNCEMENT_SUCCESS,
	UPDATE_ANNOUNCEMENT_SUCCESS,
	GET_ANNOUNCEMENTBYUSER_SUCCESS,
	GET_ONEANNOUNCEMENT_SUCCESS,
	GET_ANNOUNCEMENTLISTBYSTATUS_SUCCESS,

	GET_ANNOUNCEMENTREADLIST_SUCCESS,
	GET_READANNOUNCEMENT_SUCCESS,
	GET_RECVANNOUNCEMENT_SUCCESS,
	GET_ANNOUNCEMENTNUM_SUCCESS,
	GET_ANNOUNCEMENTTOPIC_SUCCESS,
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
		case GET_ANNOUNCEMENTLISTBYSTATUS_SUCCESS:
			return {
				...state,
				announcement: action.data,
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
		case GET_ANNOUNCEMENTREADLIST_SUCCESS:
			return {
				...state,
				unread: action.data.filter(v=>(!v.read)).length,
				msg: action.msg
			}
		case GET_READANNOUNCEMENT_SUCCESS:
			return {
				...state,
				unread: state.unread-action.num,
			}
		case GET_RECVANNOUNCEMENT_SUCCESS:
			return {
				...state,
				data: action.data,
				unread: state.unread+action.num,
			}
		case GET_ANNOUNCEMENTNUM_SUCCESS:
			return {
				...state,
				announcementnum: action.data,
				msg: action.msg
			}
		case GET_ANNOUNCEMENTTOPIC_SUCCESS:
			return {
				...state,
				announcementtopic: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}