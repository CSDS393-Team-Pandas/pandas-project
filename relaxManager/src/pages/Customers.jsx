import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal,InputNumber,Form,Input } from 'antd';
import { Header } from '../components';
import request from '../utils/request'

const Customers = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const sexMap = ['unknown','man','woman']
    const [current,setCurrent] = useState({
        _id: '',
        nickname: '',
        avatar: '',
        sex: 0,
        username: 0,
        signature: '',
    })
    const handleEdit = (row) => {
        setCurrent(row)
        setModalShow(true)
    }
    const confirmEdit = (row) => {
        request('user.update',{
            data: JSON.stringify({...current,...row})
        }).then(res => {
            if(res.success) {
                setCurrent(row);
            }
        }).catch(e => {

        })
    }
    const columns = [
        {
            title: 'avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            width: 150,
            fixed: 'left',
            render: (record) => {
                return (
                    <div className="h-[80px] w-[80px] overflow-hidden">
                         <img src={record} width="100" height="100" crossOrigin='Anonymous' alt="" />
                    </div>
                )
            }
        },
        {
            title: 'nickname',
            width: 100,
            dataIndex: 'nickname',
            key: 'nickname',
            fixed: 'left',
        },
        {
            title: 'sex',
            dataIndex: 'sex',
            key: '1',
            width: 100,
            render: (sex) => (<span>{sexMap[sex]}</span>)
        },
        {
            title: 'signature',
            dataIndex: 'signature',
            key: '2',
            width: 300
        },
        {
            title: 'operation',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (row) => {
                return (
                    <Space>
                        <Button disabled type="danger">delete</Button>
                        <Button disabled type="primary" onClick={() => handleEdit(row)}>edit</Button>
                    </Space>
                )
            },
        },
    ];
    const initUser = () => {
        request('user.init').then(res => {
            if (res.success) {
                setData(res.data)
            }
        })
    }

    useEffect(() => {
        initUser()
    }, [])
    return (
        <div className="relative m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="user list" />
            {/* <div className="absolute overflow-hidden right-[50px] top-[60px]">
                <Button type="primary" >添加用户</Button>
            </div> */}
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 600,
                }}
            />
            <Modal
                title="用户编辑"
                centered
                visible={modalShow}
                onOk={() => setModalShow(false)}
                onCancel={() => setModalShow(false)}
            >
                <Form
                    name="wrap"
                    labelCol={{ flex: '110px' }}
                    labelAlign="left"
                    initialValues={current}
                    labelWrap
                    onFinish={confirmEdit}
                    wrapperCol={{ flex: 1 }}
                    colon={false}
                >
                    <Form.Item label="名称" name="name" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="价格" name="price" rules={[{ required: true }]}>
                        <InputNumber/>
                    </Form.Item>

                    <Form.Item label="库存" name="number"  rules={[{ required: true }]}>
                        <InputNumber/>
                    </Form.Item>

                    <Form.Item label="描述" name="description" rules={[{ required: true }]}>
                        <Input/>
                    </Form.Item>

                    <Form.Item label="">
                        <Button type="primary" htmlType="submit">
                            confirm
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};
export default Customers;
