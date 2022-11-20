import React, { useState, useEffect } from 'react';
import { Button, Table, Space, Modal, Popconfirm,InputNumber, Form, Input, message, Select } from 'antd';
import { Header } from '../components';
import request from '../utils/request'
const { TextArea } = Input;
const { Option } = Select;

const Article = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [current, setCurrent] = useState({
        _id: '',
        title: '',
        content: '',
        praise: 0,
        topic: '',
        thumb: '',
    })

    const handleChange = (v, name) => {
        setCurrent(prev => ({ ...prev, [name]: v }))
    }

    const confirmDelete = (id) => {
        request('article.delete',{
            data: JSON.stringify({ id })
        }).then(res => {
            if(res.success) {
                const newList = data.filter(item => item._id != id);
                setData(newList)
                message.success('Successfully delete')
            }
        })
    }


    const handleEdit = (row) => {
        setCurrent({ ...row })
        setModalShow(true)
    }

    const confirmEdit = () => {
        request('Article.update', {
            data: JSON.stringify({ ...current })
        }).then(res => {
            if (res.success) {
                message.success('Edited successfully')
                setData(data.map(item => {
                    if (item._id == current._id) {
                        item = { ...current }
                    }
                    return item;
                }))
                setModalShow(false)
            }
        }).catch(e => {

        })
    }

    const columns = [
        {
            title: 'article title',
            dataIndex: 'thumb',
            key: 'thumb',
            width: 150,
            fixed: 'left',
            render: (record) => (
                record ? <img src={record} width="100" height="100" crossOrigin='Anonymous' alt="" /> : <span>unset</span>
            )

        },
        {
            title: 'title',
            width: 100,
            dataIndex: 'title',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'likes',
            dataIndex: 'praise',
            key: '1',
            width: 100
        },
        {
            title: 'theme',
            dataIndex: 'topic',
            key: '3',
            width: 150
        },
        {
            title: 'details',
            dataIndex: 'content',
            key: '4',
            width: 400,
            render: (row) => {
                return (
                    <div className="max-h-[200px] overflow-hidden" dangerouslySetInnerHTML={{ __html: row }}></div>
                )
            },
        },
        {
            title: 'operation',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (row) => {
                return (
                    <Space>
                        <Popconfirm
                            title="whether to delete this articleWhether "
                            onConfirm={() => confirmDelete(row._id)}
                            okText="Comfirm"
                            cancelText="Cancel"
                        >
                            <Button type="danger">Delete</Button>
                        </Popconfirm>
                        <Button type="primary" disabled onClick={() => handleEdit(row)}>Edit</Button>
                    </Space>
                )
            },
        },
    ];

    const initArticle = () => {
        request('article.init').then(res => {
            if (res.success) {
                setData(res.data)
                console.log('article', res)
            }
        })
    }

    useEffect(() => {
        initArticle()
    }, [])

    return (
        <div className="relative m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="Article list" />
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 600,
                }}
            />
            {/* <Modal
                title="product view"
                centered
                open={modalShow}
                onOk={confirmEdit}
                onCancel={() => setModalShow(false)}
            >
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>Product name</span>
                    </div>
                    <Input max={20} onChange={e => handleChange(e.target.value,'name')} value={current.name}/>
                </div>
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>retail price</span>
                    </div>
                    <InputNumber onChange={v => handleChange(v,'price')} style={{margin: 0}} value={current.price}/>
                </div>
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>number</span>
                    </div>
                    <InputNumber onChange={v => handleChange(v,'number')} style={{margin: 0}} value={current.number}/>
                </div>
                <div className="flex  mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>type</span>
                    </div>
                    <Select
                        style={{
                            width: 120,
                        }}
                        value={current.tag}
                        onChange={e => handleChange(e,'tag')}
                    >
                        <Option value="psychological books">psychological books</Option>
                        <Option value="psychological toys">psychological toys</Option>
                        <Option value="psychological videos">videos</Option>
                    </Select>
                </div>
                <div className="flex  mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>description</span>
                    </div>
                    <TextArea onChange={e => handleChange(e.target.value,'description')} value={current.description}/>
                </div>
            </Modal> */}
        </div>
    );
};
export default Article;
