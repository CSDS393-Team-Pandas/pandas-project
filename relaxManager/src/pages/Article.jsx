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
                message.success('删除成功')
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
                message.success('编辑成功')
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
            title: '文章主题',
            dataIndex: 'thumb',
            key: 'thumb',
            width: 150,
            fixed: 'left',
            render: (record) => (
                record ? <img src={record} width="100" height="100" crossOrigin='Anonymous' alt="" /> : <span>未设置</span>
            )

        },
        {
            title: '标题',
            width: 100,
            dataIndex: 'title',
            key: 'name',
            fixed: 'left',
        },
        {
            title: '点赞量',
            dataIndex: 'praise',
            key: '1',
            width: 100
        },
        {
            title: '主题',
            dataIndex: 'topic',
            key: '3',
            width: 150
        },
        {
            title: '详情',
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
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 200,
            render: (row) => {
                return (
                    <Space>
                        <Popconfirm
                            title="是否删除这篇文章"
                            onConfirm={() => confirmDelete(row._id)}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button type="danger">删除</Button>
                        </Popconfirm>
                        <Button type="primary" disabled onClick={() => handleEdit(row)}>编辑</Button>
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
            <Header category="Page" title="文章列表" />
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 600,
                }}
            />
            {/* <Modal
                title="商品查看"
                centered
                open={modalShow}
                onOk={confirmEdit}
                onCancel={() => setModalShow(false)}
            >
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>商品名称</span>
                    </div>
                    <Input max={20} onChange={e => handleChange(e.target.value,'name')} value={current.name}/>
                </div>
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>零售价</span>
                    </div>
                    <InputNumber onChange={v => handleChange(v,'price')} style={{margin: 0}} value={current.price}/>
                </div>
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>库存</span>
                    </div>
                    <InputNumber onChange={v => handleChange(v,'number')} style={{margin: 0}} value={current.number}/>
                </div>
                <div className="flex  mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>类型</span>
                    </div>
                    <Select
                        style={{
                            width: 120,
                        }}
                        value={current.tag}
                        onChange={e => handleChange(e,'tag')}
                    >
                        <Option value="心理书籍">心理书籍</Option>
                        <Option value="心理玩具">心理玩具</Option>
                        <Option value="心理视频">心理视频</Option>
                    </Select>
                </div>
                <div className="flex  mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>描述</span>
                    </div>
                    <TextArea onChange={e => handleChange(e.target.value,'description')} value={current.description}/>
                </div>
            </Modal> */}
        </div>
    );
};
export default Article;
