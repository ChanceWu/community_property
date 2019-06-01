import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_CHARGELIST_SUCCESS,
	ADD_CHARGE_SUCCESS,
	ADD_CHARGEBATCHGENERATION_SUCCESS,
	DEL_CHARGE_SUCCESS,
	UPDATE_CHARGE_SUCCESS,
	GET_CHARGEBYUSER_SUCCESS,
	GET_CHARGEMONEY_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 费用信息
export function getChargeList(value='') {
	return async(dispatch)=>{
		await axios.get('/charge/getChargeList', {params: {value}}).then(res=>{
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

export function addChargeBatchGeneration(values) {
	return async(dispatch)=>{
		await axios.post('/charge/addChargeBatchGeneration', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_CHARGEBATCHGENERATION_SUCCESS,
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

export function getChargeByUser(user_name, value='') {
	return async(dispatch)=>{
		await axios.get('/charge/getChargeByUser', {params: {user_name, value}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_CHARGEBYUSER_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getChargeMoney(user_name) {
	return async(dispatch)=>{
		await axios.get('/charge/getChargeMoney', {params: {user_name}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_CHARGEMONEY_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
