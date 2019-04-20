import actions from '../constants/actions'

const {
	GET_OWNERINFO_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_OWNERINFO_SUCCESS:
			return {
				...state,
				data: action.data
			}
		default:
			return state
	}
}