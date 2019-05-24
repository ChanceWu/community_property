import React from 'react'
import { Table, Tag, Button, Form } from 'antd';
import UserManageModal from '../modal/UserManageModal'
import SearchButton from '../button/SearchButton'

class AdminMemberTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    }
  }
  showAddModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleAddOk = (e) => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addAdmin(values)
        this.setState({
          visible: false,
        });
      }
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
        visible: false,
    });
  }
  render() {
    const columns = [
      {
        title: '姓名', dataIndex: 'name', key: 'name'
      },
      { title: '性别', dataIndex: 'gender', key: 'gender' },
      { title: '联系电话', dataIndex: 'telephone', key: 'telephone' },
      { title: '年龄', dataIndex: 'age', key: 'age' },
      { title: '证件类型', dataIndex: 'idtype', key: 'idtype' },
      { title: '身份证号码', dataIndex: 'idnumber', key: 'idnumber' },
      { title: '籍贯', dataIndex: 'nativeplace', key: 'nativeplace' },
      {
        title: '操作',
        key: 'operation',
        render: (text, record) => (
          <span>
            {/*<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
            <Divider type="vertical" />*/}
            <Tag color="red" onClick={()=>{this.props.deleteAdmin(record.key)}}>删除</Tag>
          </span>
        ),
      },
    ];
    const data = [];
    if (this.props.data) {
      this.props.data.forEach(v=>{
        data.push({
          key: v._id,
          name:  v.name,
          gender: v.gender?'男':'女',
          telephone: v.telephone||'',
          age: v.age||'',
          idtype: '身份证',
          idnumber: v.idnumber||'',
          nativeplace: v.nativeplace||'',
        })
      })
    }
    
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Button className="management_button" type="primary" onClick={this.showAddModal}>新增</Button>
        <SearchButton handleSearch={this.props.handleSearch} />
        <Table columns={columns} dataSource={data} scroll={{ x: 800 }} />

        <UserManageModal
          title='新增'
          visible={this.state.visible}
          handleOk={this.handleAddOk}
          handleCancel={this.handleCancel}
          getFieldDecorator={getFieldDecorator}
          isAdmin={true}
        />
      </div>
    )
  }
}

export default Form.create()(AdminMemberTable)
