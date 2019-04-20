import React from 'react'
import { Table } from 'antd';

const columns = [
  {
    title: '姓名', width: 100, dataIndex: 'name', key: 'name', fixed: 'left',
  },
  {
    title: '性别', width: 100, dataIndex: 'gender', key: 'gender', fixed: 'left',
  },
  { title: '联系电话', dataIndex: 'telephone', key: 'telephone' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '证件类型', dataIndex: 'idtype', key: 'idtype' },
  { title: '身份证号码', dataIndex: 'idnumber', key: 'idnumber' },
  { title: '籍贯', dataIndex: 'nativeplace', key: 'nativeplace' },
  { title: 'Column 6', dataIndex: 'address', key: '6' },
  { title: 'Column 7', dataIndex: 'address', key: '7' },
  { title: 'Column 8', dataIndex: 'address', key: '8' },
  {
    title: '操作',
    key: 'operation',
    fixed: 'right',
    width: 100,
    render: () => <a href="javascript:;">action</a>,
  },
];

// const data = [{
//   key: '1',
//   name: 'John Brown',
//   gender: '男',
//   address: 'New York Park',
// }, {
//   key: '2',
//   name: 'Jim Green',
//   gender: '女',
//   address: 'London Park',
// }];

class InfoList extends React.Component {
  render() {
    console.log(this.props)
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
          address: 'New York Park',
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
