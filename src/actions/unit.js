import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_UNITLIST_SUCCESS,
	ADD_UNIT_SUCCESS,
	DEL_UNIT_SUCCESS,
	UPDATE_UNIT_SUCCESS,
	GET_UNITNAME_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 单元信息
export function getUnitList(id, value = '') {
	return async(dispatch)=>{
		await axios.get('/unit/getUnitList', {params: {building_id: id, value}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_UNITLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addUnit(values) {
	return async(dispatch)=>{
		await axios.post('/unit/addUnit', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_UNIT_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateUnit(values) {
	return async(dispatch)=>{
		await axios.post('/unit/updateUnit', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_UNIT_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteUnit(id) {
	return async(dispatch)=>{
		await axios.post('/unit/deleteUnit', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_UNIT_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getUnitName(building_id) {
	return async(dispatch)=>{
		await axios.get(`/unit/getUnitName?building_id=${building_id}`).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_UNITNAME_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				})
			}
		})
	}
}