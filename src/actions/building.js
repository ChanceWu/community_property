import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_BUILDINGLIST_SUCCESS,
	ADD_BUILDING_SUCCESS,
	DEL_BUILDING_SUCCESS,
	UPDATE_BUILDING_SUCCESS,
	GET_BUILDINGNAME_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 楼栋信息
export function getBuildingList(id, value = '') {
	return async(dispatch)=>{
		await axios.get('/building/getBuildingList', {params: {community_id: id, value}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_BUILDINGLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addBuilding(values) {
	return async(dispatch)=>{
		await axios.post('/building/addBuilding', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_BUILDING_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateBuilding(values) {
	return async(dispatch)=>{
		await axios.post('/building/updateBuilding', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_BUILDING_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteBuilding(id) {
	return async(dispatch)=>{
		await axios.post('/building/deleteBuilding', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_BUILDING_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getBuildingName(community_id) {
	return async(dispatch)=>{
		await axios.get(`/building/getBuildingName?community_id=${community_id}`).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_BUILDINGNAME_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				})
			}
		})
	}
}