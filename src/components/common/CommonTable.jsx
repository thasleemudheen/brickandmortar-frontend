import React from 'react'
import { Table } from 'antd'
export default function CommonTable({columns,data,rowSelection}) {
  return (
    <div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  )
}
