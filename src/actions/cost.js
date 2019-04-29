import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_COSTLIST_SUCCESS,
	ADD_COST_SUCCESS,
	DEL_COST_SUCCESS,
	UPDATE_COST_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 费用信息
export function getCostList(charge_type) {
	return async(dispatch)=>{
		await axios.get('/cost/getCostList', { params: {charge_type} }).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_COSTLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addCost(values) {
	return async(dispatch)=>{
		await axios.post('/cost/addCost', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_COST_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateCost(values) {
	return async(dispatch)=>{
		await axios.post('/cost/updateCost', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_COST_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteCost(id) {
	return async(dispatch)=>{
		await axios.post('/cost/deleteCost', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_COST_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}