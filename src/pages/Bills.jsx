import React, { useRef } from 'react'
import { Modal, Table, message,Button } from 'antd';
import { useEffect, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import axios from 'axios';
import './Main.css';
import Navbar from '../components/Navbar';
import ReactToPrint from 'react-to-print';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
const Bills = () => {
    const componentRef = useRef();
    const [billData, setBillData] = useState([])
    const [printBill, setPrintBill] = useState(false)
    const [selectBill, setSelectBill] = useState(null)


    //get data

    const getAllBills = () => {
        axios.get('https://posbackend-9ih0.onrender.com/api/bills/get-bills').then((res) => {
            setBillData(res.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getAllBills()
    }, [])

    const deleteBills = (record) => {
        axios.delete(`https://posbackend-9ih0.onrender.com/api/bills/delete-bills/${record._id}`).then((res) => {
            getAllBills()
            message.success('Bill Deleted Successfully')
        }).catch((error) => {
            console.log(error);
            message.error('Something Went Wrong');
        });
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Customer Name',
            dataIndex: 'customername',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phonenumber',
        },
        {
            title: 'SubTotal',
            dataIndex: 'subTotal'
        },
        {
            title: 'Tax',
            dataIndex: 'tax'
        },
        {
            title: 'Total',
            dataIndex: 'totalAmount'
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (id, record) => (
                <div className="d-flex">
                    <EyeOutlined style={{ fontSize: '18px' }} className='mx-2' onClick={() => {
                        setSelectBill(record)
                        setPrintBill(true)
                    }} />
                    <DeleteOutlined style={{ fontSize: '18px' }} className='mx-2' onClick={() => deleteBills(record)} />
                </div>
            )
        }

    ];

    const cartcolumns = [
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Price',
          dataIndex: 'price'
        },
        {
          title: 'Category',
          dataIndex: 'category'
        },
        {
          title: 'Quantity',
          dataIndex: '_id',
          render: (id, record) => (
            <div style={{ fontSize: '18px' }}>
              
              <b>{record.quantity}</b>
             
            </div>
          )
        },
        {
            title: 'Total',
            dataIndex: '_id',
            render: (id, record) => (
              <div style={{ fontSize: '18px' }}>
                
                <b>{record.quantity * record.price}</b>
               
              </div>
            )
          },
     
      ];
      const handlePrint = useReactToPrint({
        content: () => componentRef.current,
      });
    return (
        <>
            <Navbar />
            <div className="mb-4 mx-4 mt-4">
                <h2 style={{ textTransform: 'uppercase', fontSize: '25px' }}>Bills</h2>
            </div>
            <div className="table-container">
                <Table columns={columns} dataSource={billData} bordered></Table>

            </div>
            {printBill && (
                <Modal title={'Bill Details'} width={800} open={printBill} footer={null} onCancel={() => {
                    setPrintBill(false)

                }}>

                    <div className='bills p-3' ref={componentRef}>
                        <div className="d-flex justify-content-between pb-2 bill-header">
                            <div>
                                <h1><b>FarmFresh</b></h1>
                            </div>
                            <div>
                                <p>Kolhapur</p>
                                <p>Maharashtra</p>
                                <p>9090909090</p>
                            </div>
                        </div>
                        <div className="details my-2">
                            <p><b>Name : </b>{selectBill.customername}</p>
                            <p><b>Phone Number : </b>{selectBill.phonenumber}</p>
                            <p><b>Date : </b>{selectBill.createdAt}</p>
                        </div>
<div className="table-container">
                        <Table dataSource={selectBill.cartItems} columns={cartcolumns} pagination={false}></Table>
                        </div>
                    
                    <div className="dotted-border py-2">
                        <p><b>Sub Total :</b>{selectBill.subTotal}</p>
                        <p><b>Tax :</b>{selectBill.tax}</p>
                    </div>

                    <div className='py-2'>
                        <h2><b>Grand Total : {selectBill.totalAmount}</b></h2>
                    </div>

                    <div className="dotted-border mt-2"></div>
                    
                    <div className="text-center">
                        <p>Thanks</p>
                        <p>Visit Again :) </p>
                    </div>
                    </div>

                    <div className="d-flex justify-content-end">
                        <Button onClick={handlePrint} type='primary'>Print</Button>
                    </div>

                </Modal>
            )}
        </>
    )
}

export default Bills