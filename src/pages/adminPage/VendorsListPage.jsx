import CommonTable from '@/components/common/CommonTable';
import AdminChangeStatus from '@/services/admin/AdminChangeStatus';
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
        const changeStatus=async(id)=>{
            console.log('change status',id)
            alert('are you sure you want to allow vendor')
            try {
                const response=await AdminChangeStatus(id)
                if (response.status === 200) {
                    setVendors((prevVendors) =>
                        prevVendors.map((vendor) =>
                            vendor._id === id ? { ...vendor, isApproved: !vendor.isApproved } : vendor
                        )
                    );
                }
                    console.log(response) 
            } catch (error) {
                console.log(error)
            }

        }
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
                <button   className={`${record.isApproved ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 rounded`}
    onClick={() => changeStatus(record.key)}
>
    {record.isApproved ? 'Approved' : 'Approve'}
</button>   
            ),
        }
    ];

    const dataWithKeys = vendors.map((vendor) => ({
        key: vendor._id, 
        vendorName: vendor.vendorName,
        vendorEmail: vendor.vendorEmail,
        vendorPhone: vendor.vendorPhone,
        isApproved: vendor.isApproved, 
        documentProof: vendor.documentProof, 
    }));

    return (
        <div>
            <CommonTable columns={columns} data={dataWithKeys} />
        </div>
    );
}
