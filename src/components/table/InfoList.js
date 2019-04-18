import React from 'react'
import { Table } from 'antd';

const columns = [
  {
    title: '姓名', width: 100, dataIndex: 'name', key: '1', fixed: 'left',
  },
  {
    title: '性别', width: 100, dataIndex: 'gender', key: '2', fixed: 'left',
  },
  { title: '姓名', dataIndex: 'name', key: 'name' },
  { title: '性别', dataIndex: 'gender', key: 'gender' },
  { title: 'Column 3', dataIndex: 'address', key: '3' },
  { title: 'Column 4', dataIndex: 'address', key: '4' },
  { title: 'Column 5', dataIndex: 'address', key: '5' },
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
          key: `${v.name}`,
          name:  `${v.name}`,
          gender: '男',
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
