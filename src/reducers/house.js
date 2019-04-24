import actions from '../constants/actions'

const {
	GET_HOUSEINFO_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_HOUSEINFO_SUCCESS:
			return {
				...state,
				house: action.data,
				msg: action.msg
			}
		default:
			return state
	}
}