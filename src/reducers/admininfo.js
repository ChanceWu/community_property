import actions from '../constants/actions'

const {
	GET_OWNERINFO_SUCCESS,
} = actions;

const initState = {
	msg: '',
	name: '',
	// pwd: '',
	type: '',
}

export default (state={}, action) => {
	switch(action.type) {
		case GET_OWNERINFO_SUCCESS:
			console.log(action)
			return {
				...state,
				data: action.data
			}
		default:
			return state
	}
}