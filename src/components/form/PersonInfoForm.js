import React from 'react'
import { Input, Button, Radio  } from 'antd';
import './form.less'

const RadioGroup = Radio.Group;

class PersonInfoForm extends React.Component {
	render() {
		const data = this.props.data
		console.log(data)
		return (
			<div>
				<Button type="primary" onClick={this.props.saveInfo}>保 存</Button>
				<div className="form">
					<div className="form-row">
						<div className="label">姓 名:</div>
						<Input value={data.name} onChange={v=>this.props.handleChange('name', v.target.value)}/>
					</div>
					<div className="form-row">
						<div className="label">性 别:</div>
						<RadioGroup value={data.gender} onChange={v=>this.props.handleChange('gender', v.target.value)}>
					        <Radio value={true}>男</Radio>
					        <Radio value={false}>女</Radio>
				      	</RadioGroup>
					</div>
					<div className="form-row">
						<div className="label">年 龄:</div>
						<Input value={data.age} onChange={v=>this.props.handleChange('age', v.target.value)}/>
					</div>
					<div className="form-row">
						<div className="label">联系电话:</div>
						<Input value={data.telephone} onChange={v=>this.props.handleChange('telephone', v.target.value)}/>
					</div>
					<div className="form-row">
						<div className="label">证件类型:</div>
						<Input value='身份证'/>
					</div>
					<div className="form-row">
						<div className="label">证件号码:</div>
						<Input value={data.idnumber} onChange={v=>this.props.handleChange('idnumber', v.target.value)}/>
					</div>
					<div className="form-row">
						<div className="label">籍 贯:</div>
						<Input value={data.nativeplace} onChange={v=>this.props.handleChange('nativeplace', v.target.value)}/>
					</div>
				</div>
			</div>
			
		)
	}
}

export default PersonInfoForm