import React from 'react'
import { Col, Row, Table, Button, Modal, Input, Select, Form, message } from 'antd';
import { useEffect, useState } from 'react';
import { DeleteOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './Main.css';
import axios from 'axios'
import { removeFromCart, decreaseQuantity, increaseQuantity } from '../redux/slice';
import Navbar from '../components/Navbar';
const Cart = () => {

  const [subTotal, setSubTotal] = useState(0)

  const [billCharge, setBillCharge] = useState(false)



  const cartItems = useSelector(state => state.cart.cartItems);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);


  useEffect(() => {
    let temp = 0
    cartItems.forEach((item) => {
      temp = temp + (item.price * item.quantity)
    })
    setSubTotal(temp)
  }, [cartItems])


  const onFinish = (values) => {
    const reqObject = {
      ...values,
      subTotal,
      cartItems,
      tax: Number(((subTotal / 100) * 10).toFixed(2)),
      totalAmount: Number(subTotal + ((subTotal / 100) * 10))
    }
    axios.post('https://posbackend-9ih0.onrender.com/api/bills/create-bills', reqObject).then(() => {
      message.success('Bill Charged')
      setBillCharge(false)
    }).catch(() => {
      message.error('Something Went Wrong')
    })
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Image',
      dataIndex: 'image',
      render: (image, record) => <img src={image} alt='' height='60' width='60' />
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
          <MinusCircleOutlined className='mx-3' onClick={() => dispatch(decreaseQuantity(id))} />
          <b>{record.quantity}</b>
          <PlusCircleOutlined className='mx-3' onClick={() => dispatch(increaseQuantity(id))} />
        </div>
      )
    },
    {
      title: 'Actions',
      dataIndex: '_id',
      render: (id, record) => (
        <DeleteOutlined style={{ fontSize: '18px' }} className='mx-2' onClick={() => dispatch(removeFromCart(id))} />
      )
    }
  ];


  return (

    <>
      <Navbar />
      <div className="d-flex mt-4 mx-4">
        <h1 style={{ fontSize: '25px', textTransform: 'uppercase' }}>Cart Items</h1>
      </div>

      <div className="table-container">
        <Table columns={columns} dataSource={cartItems} bordered rowKey="_id" />
      </div>
      <hr />
      <div className="d-flex mb-4 mx-4 justify-content-end flex-column align-items-end">
        <div className="sub">
          <h3>SUB TOTAL : <b>{subTotal} Rs/-</b></h3>
        </div>
        <Button type='primary' onClick={() => setBillCharge(true)}>CHARGE BILL</Button>
      </div>

      <Modal title='Charge Bill' open={billCharge} footer={null} onCancel={() => setBillCharge(false)}>

        <Form layout='vertical' onFinish={onFinish} >

          <Form.Item name='customername' label='Customer Name' >
            <Input />
          </Form.Item>

          <Form.Item name='phonenumber' label='Phone Number' >
            <Input />
          </Form.Item>


          <Form.Item name='paymentmode' label='Payment Mode' >
            <Select>
              <Select.Option value='Cash'>Cash</Select.Option>
              <Select.Option value='Online'>Online</Select.Option>
            </Select>
          </Form.Item>

          <div className="chargebill">
            <h5>SubTotal : <b>{subTotal}</b></h5>
            <h5>Tax : <b>{((subTotal / 100) * 10).toFixed(2)}</b></h5>
            <hr />
            <h2>Grand Total <b>{subTotal + ((subTotal / 100) * 10)}</b></h2>
          </div>

          <div className="d-flex justify-content-end">
            <Button htmlType='submit' type='primary'>Generate Bill</Button>
          </div>

        </Form>
      </Modal>

    </>
  )
}

export default Cart