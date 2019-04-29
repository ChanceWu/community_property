import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_GARAGELIST_SUCCESS,
	ADD_GARAGE_SUCCESS,
	DEL_GARAGE_SUCCESS,
	UPDATE_GARAGE_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 楼栋信息
export function getGarageList() {
	return async(dispatch)=>{
		await axios.get('/garage/getGarageList').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_GARAGELIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addGarage(values) {
	return async(dispatch)=>{
		await axios.post('/garage/addGarage', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_GARAGE_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateGarage(values) {
	return async(dispatch)=>{
		await axios.post('/garage/updateGarage', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_GARAGE_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteGarage(id) {
	return async(dispatch)=>{
		await axios.post('/garage/deleteGarage', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_GARAGE_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}