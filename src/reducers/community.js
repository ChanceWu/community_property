import actions from '../constants/actions'

const {
	GET_COMMUNITYLIST_SUCCESS,
	ADD_COMMUNITY_SUCCESS,
	DEL_COMMUNITY_SUCCESS,
	UPDATE_COMMUNITY_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_COMMUNITYLIST_SUCCESS:
			return {
				...state,
				community: action.data,
				msg: action.msg
			}
		case ADD_COMMUNITY_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_COMMUNITY_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_COMMUNITY_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		default:
			return state
	}
}