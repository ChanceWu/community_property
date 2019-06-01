import React from 'react'
import { Input, Button, Radio } from 'antd';
import './form.less'

const RadioGroup = Radio.Group;

class PasswordResetForm extends React.Component {
	render() {
		const data = this.props.data
		return (
			<div>
				<Button type="primary" onClick={this.props.updateInfo}>保 存</Button>
				<div className="form">
					<div className="form-row">
						<div className="label">旧密码:</div>
						<Input onChange={v=>this.props.personInfoFormChange('oldpwd', v.target.value)}/>
					</div>
					<div className="form-row">
						<div className="label">新密码:</div>
						<Input onChange={v=>this.props.personInfoFormChange('newpwd', v.target.value)}/>
					</div>
				</div>
			</div>
		)
	}
}

export default PasswordResetForm