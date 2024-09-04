import CommonTable from '@/components/common/CommonTable';
import instance from '@/utils/Axios';
import React, { useEffect, useState } from 'react';

export default function VendorsListPage() {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await instance.get('/admin/vendors', {
                    withCredentials: true,
                });
                console.log(response.data.vendors);
                setVendors(response.data.vendors);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };
        fetchVendors();
    }, []);

    const columns = [
        {
            title: 'Vendor Name',
            dataIndex: 'vendorName', 
            key: 'vendorName',
        },
        {
            title: 'Email',
            dataIndex: 'vendorEmail', 
            key: 'vendorEmail',
        },
        {
            title: 'Phone Number',
            dataIndex: 'vendorPhone',
            key: 'vendorPhone',
        },
        {
            title: 'Status',
            dataIndex: 'isApproved', 
            key: 'isApproved',
            render: (isApproved) => (
                <span>
                    {isApproved ? 'Approved' : 'Pending'}
                </span>
            ),
        },
        {
            title: 'Document Proof', 
            dataIndex: 'documentProof', 
            key: 'documentProof',
            render: (text, record) => (
                <img src={record.documentProof} alt="Document Proof" style={{ width: '100px', height: '50px' }} />
            ),
        },
        {
            title:'Change Status',
            dataIndex:'change status',
            key:'change status',
            render: (text, record) => (
                <button className='bg-orange-500' onClick={() => changeStatus(record._id, record.isApproved)}>
                    {record.isApproved ? 'Revoke Approval' : 'Approve'}
                </button>
            ),
        }
    ];

    const dataWithKeys = vendors.map((vendor) => ({
        key: vendor._id, 
        vendorName: vendor.vendorName,
        vendorEmail: vendor.vendorEmail,
        vendorPhone: vendor.vendorPhone,
        vendorStatus: vendor.isApproved, 
        documentProof: vendor.documentProof, 
    }));

    return (
        <div>
            <CommonTable columns={columns} data={dataWithKeys} />
        </div>
    );
}
