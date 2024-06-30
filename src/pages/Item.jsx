import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, message, Input, Table ,Select} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import axios from 'axios';
import './Main.css';
import Navbar from '../components/Navbar'
import TextArea from 'antd/es/input/TextArea';
const Home = () => {
    const [itemData, setItemData] = useState([])

    const [addModal, setAddModal] = useState(false)

    const [editData, setEditData] = useState(null)

    // Get blogs
    const getItem = () => {
        axios
            .get('https://posbackend-9ih0.onrender.com/api/items/get-items')
            .then((res) => {
                setItemData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getItem();
    }, []);

    // Create blog

    const createItem = (values) => {
        if (editData === null) {
            axios
                .post('https://posbackend-9ih0.onrender.com/api/items/create-items', values)
                .then((res) => {
                    message.success('Item Added Successfully');
                    getItem();
                    setAddModal(false);
                })
                .catch((error) => {
                    console.log(error);
                    message.error('Something Went Wrong');
                });
        } else {
            axios
                .put(`https://posbackend-9ih0.onrender.com/api/items/edit-items/${editData._id}`, values)
                .then((res) => {
                    message.success('Item Edited Successfully');
                    getItem();
                    setEditData(null);
                    setAddModal(false);
                })
                .catch((error) => {
                    console.log(error);
                    message.error('Something Went Wrong');
                });
        }
    };


    // Delete blog
    const deleteItem = (record) => {
        axios
            .delete(`https://posbackend-9ih0.onrender.com/api/items/delete-items/${record._id}`)
            .then((res) => {
                message.success('Item Deleted Successfully');
                getItem();
            })
            .catch((error) => {
                console.log(error);
                message.error('Something Went Wrong');
            });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Image',
            dataIndex: 'image',
            render: (image) => <img src={image} alt='' height='60' width='60' />,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Category',
            dataIndex: 'category',
        },

        {
            title: 'Description',
            dataIndex: 'description',
            render: (text) => (text.length > 100 ? `${text.substring(0, 100)}...` : text),
        },
        {
            title: 'Actions',
            dataIndex: '_id',
            render: (id, record) => (
                <div className='d-flex'>
                    <DeleteOutlined className='mx-2' onClick={() => deleteItem(record)} />
                    <EditOutlined className='mx-2' onClick={() => {
                        setEditData(record)
                        setAddModal(true)
                    }} />
                </div>
            ),
        },
    ];

    return (
        <>
            <Navbar />
            <div className='mt-4 mx-4' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button type='primary' onClick={() => setAddModal(true)}>
                    Add Items
                </Button>
            </div>

            <div className='table-container'>
                <Table columns={columns} dataSource={itemData} bordered></Table>
            </div>

            {addModal && (
                <Modal title={'POS'} open={addModal} footer={null} onCancel={() => {
                    setAddModal(false)
                    setEditData(null)
                }}>
                    <Form initialValues={editData} layout='vertical' onFinish={createItem}>
                        <Form.Item name='name' label='Name'>
                            <Input />
                        </Form.Item>

                        <Form.Item name='image' label='Image'>
                            <Input />
                        </Form.Item>

                        <Form.Item name='price' label='Price'> 
                            <Input />
                        </Form.Item>
                        

                        <Form.Item name='category' label='Category' >
                            <Select>
                                <Select.Option value='Fruit'>Fruit</Select.Option>
                                <Select.Option value='Vegetable'>Vegetable</Select.Option>
                                <Select.Option value='Meat'>Meat</Select.Option>
                                <Select.Option value='Dairy'>Dairy</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item name='description' label='Description'>
                            <TextArea rows={4} />
                        </Form.Item>

                        <div className='d-flex justify-content-end'>
                            <Button htmlType='submit' type='primary'>
                                Add
                            </Button>
                        </div>
                    </Form>
                </Modal>
            )}
        </>
    );
};

export default Home;
