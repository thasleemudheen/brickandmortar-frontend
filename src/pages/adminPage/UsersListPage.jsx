import CommonTable from '@/components/common/CommonTable'
import AdminBlockUser from '@/services/admin/AdminBlockUser'
import instance from '@/utils/Axios'
import React, { useEffect, useState } from 'react'

export default function UsersListPage() {
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const userList=async()=>{
            const response=await instance.get('/admin/users')
            const usersWithKey = response.data.users.map(user => ({ ...user, key: user._id }));

            setUsers(usersWithKey)
        }
        userList()
    },[])
     
    const handleBlockUser=async(id)=>{
        console.log(id)
        const response=await AdminBlockUser(id)
    }
    const columns = [
        {
          title: 'Username',
          dataIndex: 'userName',
          key: 'userName',
          responsive: ['xs', 'sm', 'md', 'lg'], 
          width: 150,
        },
        {
          title: 'Email',
          dataIndex: 'userEmail',
          key: 'email',
          responsive: ['xs', 'sm', 'md', 'lg'],
          width: 200,
        },
        {
          title: 'Phone',
          dataIndex: 'userPhone',
          key: 'phone',
          responsive: ['md', 'lg'],
          width: 150,
        },
        {
          title: 'status',
          dataIndex: 'isBlocked',
          key: 'isBlocked',
          render: (isBlocked) => (isBlocked ? 'active' : 'not Active'),
          width: 100,
        },
        {
          title: 'Action',
          key: 'action',
          render: (text, record) => (
            <button
              className={`px-6 py-2  rounded ${
                record.isBlocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
              }`}
              onClick={() => handleBlockUser(record._id)}
            >
              {record.isBlocked ? 'Blockuser' : 'unBlock'}
            </button>
          ),
          width: 120,
        },
      ];
  return (
    <div className="min-h-screen flex flex-col items-center justify-center lg:w-full bg-gray-100 p-4">
    <h1 className="text-3xl font-bold mb-6">User List</h1>
    <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
      <CommonTable
        columns={columns}
        data={users}
        scroll={{ x: 800 }} 
      />
    </div>
  </div>
  )
}
