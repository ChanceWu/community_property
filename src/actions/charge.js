import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_CHARGELIST_SUCCESS,
	ADD_CHARGE_SUCCESS,
	DEL_CHARGE_SUCCESS,
	UPDATE_CHARGE_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 费用信息
export function getChargeList() {
	return async(dispatch)=>{
		await axios.get('/charge/getChargeList').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_CHARGELIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addCharge(values) {
	return async(dispatch)=>{
		await axios.post('/charge/addCharge', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_CHARGE_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateCharge(values) {
	return async(dispatch)=>{
		await axios.post('/charge/updateCharge', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_CHARGE_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteCharge(id) {
	return async(dispatch)=>{
		await axios.post('/charge/deleteCharge', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_CHARGE_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}