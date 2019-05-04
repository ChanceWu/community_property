import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_COMPLAINTLIST_SUCCESS,
	ADD_COMPLAINT_SUCCESS,
	DEL_COMPLAINT_SUCCESS,
	UPDATE_COMPLAINT_SUCCESS,
	GET_COMPLAINTBYUSER_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 投诉信息
export function getComplaintList() {
	return async(dispatch)=>{
		await axios.get('/complaint/getComplaintList').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_COMPLAINTLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addComplaint(values) {
	return async(dispatch)=>{
		await axios.post('/complaint/addComplaint', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_COMPLAINT_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateComplaint(values) {
	return async(dispatch)=>{
		await axios.post('/complaint/updateComplaint', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_COMPLAINT_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteComplaint(id) {
	return async(dispatch)=>{
		await axios.post('/complaint/deleteComplaint', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_COMPLAINT_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getComplaintByUser(user_id) {
	return async(dispatch)=>{
		await axios.get('/complaint/getComplaintByUser', {params: {user_id}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_COMPLAINTBYUSER_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}