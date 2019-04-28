import React from 'react'
import { Table, Tag } from 'antd';

class InfoList extends React.Component {
  render() {
    const columns = [
      {
        title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
      },
      { title: '性别', width: 100, dataIndex: 'gender', key: 'gender' },
      { title: '联系电话', dataIndex: 'telephone', key: 'telephone' },
      { title: '年龄', dataIndex: 'age', key: 'age' },
      { title: '证件类型', dataIndex: 'idtype', key: 'idtype' },
      { title: '身份证号码', dataIndex: 'idnumber', key: 'idnumber' },
      { title: '籍贯', dataIndex: 'nativeplace', key: 'nativeplace' },
      {
        title: '操作',
        key: 'operation',
        fixed: 'right',
        width: 100,
        render: (text, record) => (
          <span>
            {/*<Tag color="blue" onClick={()=>{this.showUpdateModal(record)}}>修改</Tag>
            <Divider type="vertical" />*/}
            <Tag color="red" onClick={()=>{this.props.deleteOwner(record.key)}}>删除</Tag>
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
    
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      }
    };
    return (
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} scroll={{ x: 1300 }} />
    )
  }
}

export default InfoList
