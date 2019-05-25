import actions from '../constants/actions'
const {
	GET_COMPLAINTLIST_SUCCESS,
	ADD_COMPLAINT_SUCCESS,
	DEL_COMPLAINT_SUCCESS,
	UPDATE_COMPLAINT_SUCCESS,
	GET_COMPLAINTBYUSER_SUCCESS,
	GET_COMPLAINTCONTENT_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_COMPLAINTLIST_SUCCESS:
			return {
				...state,
				complaint: action.data,
				msg: action.msg
			}
		case ADD_COMPLAINT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_COMPLAINT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_COMPLAINT_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case GET_COMPLAINTBYUSER_SUCCESS:
			return {
				...state,
				complaint: action.data,
				msg: action.msg
			}
		case GET_COMPLAINTCONTENT_SUCCESS:
			return {
				...state,
				complaintcontent: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}