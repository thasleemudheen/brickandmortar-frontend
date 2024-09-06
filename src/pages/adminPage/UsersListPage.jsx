import CommonTable from '@/components/common/CommonTable';
import AdminBlockUser from '@/services/admin/AdminBlockUser';
import instance from '@/utils/Axios';
import React, { useEffect, useState } from 'react';

export default function UsersListPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch users from the backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                const response = await instance.get('/admin/users', { withCredentials: true });
                console.log('Fetched users:', response);
                const usersWithKey = response.data.users.map(user => ({ ...user, key: user._id }));
                setUsers(usersWithKey);
            } catch (error) {
                console.error('Error fetching users:', error);
                setError('Failed to fetch users. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleBlockUser = async (id) => {
        try {
            const response = await AdminBlockUser(id);
            if (response.status === 200) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user._id === id ? { ...user, isBlocked: !user.isBlocked } : user
                    )
                );
            } else {
                setError('Failed to update user status. Please try again.');
            }
        } catch (error) {
            setError('An error occurred. Please try again.');
        } 
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'userEmail',
            key: 'userEmail',
        },
        {
            title: 'Phone',
            dataIndex: 'userPhone',
            key: 'userPhone',
        },
        {
            title: 'Status',
            dataIndex: 'isBlocked',
            key: 'isBlocked',
            render: (isBlocked) => (isBlocked ? 'blocked' : 'active'),
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <button
                    className={`px-6 py-2 rounded ${
                        record.isBlocked ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                    }`}
                    onClick={() => handleBlockUser(record._id)}
                >
                    {record.isBlocked ? 'Unblock' : 'Block'}
                </button>
            ),
            width: 120,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center lg:w-full bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-6">User List</h1>
            <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-6xl">
                    <CommonTable columns={columns} data={users} scroll={{ x: 800 }} />
            </div>
        </div>
    );
}
