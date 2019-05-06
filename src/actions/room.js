import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_ROOMLIST_SUCCESS,
	ADD_ROOM_SUCCESS,
	DEL_ROOM_SUCCESS,
	UPDATE_ROOM_SUCCESS,
	GET_ONEROOM_SUCCESS,
	GET_ROOMBYUSESR_SUCCESS,
	GET_ROOMNAME_SUCCESS,
	GET_ROOMNUM_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 房屋信息
export function getRoomList(id) {
	return async(dispatch)=>{
		await axios.get('/room/getRoomList', {params: {unit_id: id}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ROOMLIST_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getOneRoom(id) {
	return async(dispatch)=>{
		await axios.get('/room/getOneRoom', {params: {_id: id}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_ONEROOM_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function addRoom(values) {
	return async(dispatch)=>{
		await axios.post('/room/addRoom', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: ADD_ROOM_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updateRoom(values) {
	return async(dispatch)=>{
		await axios.post('/room/updateRoom', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_ROOM_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteRoom(id) {
	return async(dispatch)=>{
		await axios.post('/room/deleteRoom', {_id: id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_ROOM_SUCCESS,
					msg: res.data.msg,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getRoomByUser(user_name) {
	return async(dispatch)=>{
		await axios.get(`/room/getRoomByUser?user_name=${user_name}`).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_ROOMBYUSESR_SUCCESS,
					data: res.data.data,
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getRoomName(unit_id) {
	return async(dispatch)=>{
		await axios.get(`/room/getRoomName?unit_id=${unit_id}`).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_ROOMNAME_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				})
			}
		})
	}
}

export function getRoomNum(user_name='') {
	return async(dispatch)=>{
		await axios.get('/room/getRoomNum', {params: {user_name}}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_ROOMNUM_SUCCESS,
					data: res.data.data,
					msg: res.data.msg,
				})
			}
		})
	}
}