import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_PERSONINFO_SUCCESS,
	UPDATE_PERSONINFO_SUCCESS,
	ERROR_MSG,
} = actions;

function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

export function getPersonInfo(id) {
	return dispatch=>{
		axios.get('/user/list', {params: {_id: id}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				console.log(res)
				dispatch({
					type: GET_PERSONINFO_SUCCESS,
					data: res.data.data
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function updatePersonInfo(values) {
	return dispatch=>{
		axios.post('/user/updatePersonInfo', {...values}).then(res=>{
			if (res.status===200&&res.data.code===0) {
				dispatch({
					type: UPDATE_PERSONINFO_SUCCESS,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}
