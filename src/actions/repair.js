import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_REPAIRLIST_SUCCESS,
	ADD_REPAIR_SUCCESS,
	DEL_REPAIR_SUCCESS,
	UPDATE_REPAIR_SUCCESS,
	GET_REPAIRBYUSER_SUCCESS,
	GET_REPAIRCONTENT_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 维修信息
export function getRepairList(value='') {
	return async(dispatch)=>{
		await axios.get('/repair/getRepairList', {params: {value}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_REPAIRLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addRepair(values) {
	return async(dispatch)=>{
		await axios.post('/repair/addRepair', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_REPAIR_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateRepair(values) {
	return async(dispatch)=>{
		await axios.post('/repair/updateRepair', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_REPAIR_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteRepair(id) {
	return async(dispatch)=>{
		await axios.post('/repair/deleteRepair', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_REPAIR_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getRepairByUser(user_id, value='') {
	return async(dispatch)=>{
		await axios.get('/repair/getRepairByUser', {params: {user_id, value}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_REPAIRBYUSER_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getRepairContent(user_id='') {
	return async(dispatch)=>{
		await axios.get(`/repair/getRepairContent?user_id=${user_id}`).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_REPAIRCONTENT_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
