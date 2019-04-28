import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_OWNERINFO_SUCCESS,
	DEL_OWNER_SUCCESS,
	ERROR_MSG,
} = actions;

function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

export function getOwnerInfoList() {
	return async(dispatch)=>{
		await axios.get('/user/list?type=user').then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_OWNERINFO_SUCCESS,
					data: res.data.data
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function deleteOwner(_id) {
	return async(dispatch)=>{
		await axios.post('/user/deleteOwner', {_id}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: DEL_OWNER_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
