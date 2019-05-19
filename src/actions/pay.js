import axios from 'axios';
import actions from '../constants/actions';

const {
	GET_PAYURL_SUCCESS,
	GET_NOTIFYURL_SUCCESS,

	ERROR_MSG,
} = actions;


function errorMsg(msg) {
	return {msg, type: ERROR_MSG}
}

// 维修信息
export function getPayUrl(query) {
	return async(dispatch)=>{
		await axios.get('/pay/getPayUrl', {params: {...query}}).then(res=>{
			if (res.status==200&&res.data.code===0) {
				dispatch({
					type: GET_PAYURL_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				});
			} else {
				dispatch(errorMsg(res.data.msg))
			}
		})
	}
}

export function getNotifyUrl() {
	return async(dispatch)=>{
		await axios.post('/pay/getNotifyUrl').then(res=>{
			console.log(res)
			/*if (res.status===200&&res.data.code===0) {
				dispatch({
					type: GET_NOTIFYURL_SUCCESS,
					data: res.data.data,
					msg: res.data.msg
				})
			} else {
				dispatch(errorMsg((res.data.msg)))
			}*/
		})
	}
}