import actions from '../constants/actions'

const {
	GET_PAYURL_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_PAYURL_SUCCESS:
			return {
				...state,
				pay: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}