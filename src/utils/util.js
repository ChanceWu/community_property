export function getRedirectPath({type}) {
	// 根据用户信息 返回跳转地址
	let url = (type === 'admin') ? '/admin' : '/user';
	
	return url
}