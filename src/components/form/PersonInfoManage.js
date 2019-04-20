import React from 'react'
import { Collapse, Input, Button, Radio, Icon } from 'antd';
import FamilyMember from './FamilyMember'
import PersonInfoForm from './PersonInfoForm'
import './form.less'

const RadioGroup = Radio.Group;
const Panel = Collapse.Panel;

class PersonInfoManage extends React.Component {
	render() {
		const genExtra = () => (
		  <Icon
		    type="setting"
		    onClick={(event) => {
		      // If you don't want click extra trigger collapse, you can prevent this:
		      event.stopPropagation();
		    }}
		  />
		);
		return (
			<Collapse defaultActiveKey={['1','2']}>
			    <Panel header="基本信息" key="1" extra={genExtra()}>
			      	<PersonInfoForm  data={this.props.data} handleChange={this.props.handleChange} updateInfo={this.props.updateInfo}/>
			    </Panel>
			    <Panel header="家庭成员列表" key="2" extra={genExtra()}>
			      	<FamilyMember />
			    </Panel>
			    {/*<Panel header="This is panel header 3" key="3" extra={genExtra()}>
			      	<div>3</div>
			    </Panel>*/}
		  	</Collapse>
		)
	}
}

export default PersonInfoManage