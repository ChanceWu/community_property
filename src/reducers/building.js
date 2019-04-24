import actions from '../constants/actions'

const {
	GET_BUILDINGLIST_SUCCESS,
	ADD_BUILDING_SUCCESS,
	DEL_BUILDING_SUCCESS,
	UPDATE_BUILDING_SUCCESS,
} = actions;

export default (state={}, action) => {
	switch(action.type) {
		case GET_BUILDINGLIST_SUCCESS:
			return {
				...state,
				building: action.data,
				msg: action.msg
			}
		case ADD_BUILDING_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case UPDATE_BUILDING_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		case DEL_BUILDING_SUCCESS:
			return {
				...state,
				msg: action.msg
			}
		default:
			return state
	}
}