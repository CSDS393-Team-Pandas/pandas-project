import React, { useState, useEffect } from 'react';
import { Button, Table, Space,Popconfirm, Modal,Comment, InputNumber, Avatar,Tag,Form, Input, message, Select } from 'antd';
import { Header } from '../components';
import request from '../utils/request'
const { TextArea } = Input;
const { Option } = Select;

const Game = () => {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [comments, setComments] = useState([]);
    const [current, setCurrent] = useState({
        _id: '',
        name: '',
        description: '',
        price: 0,
        number: 0,
        tag: '',
        thumb: '',
    })

    const handleChange = (v, name) => {
        setCurrent(prev => ({ ...prev, [name]: v }))
    }

    const handleEdit = (row) => {
        setCurrent({ ...row })
        initGameComment(row._id);
        setModalShow(true)
    }

    const confirmEdit = () => {
        request('game.update', {
            data: JSON.stringify({ ...current })
        }).then(res => {
            if (res.success) {
                message.success('Successfully edit')
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

    const initGameComment = (id) => {
        request('comment.init', {
            data: JSON.stringify({ gameId: id })
        }).then(res => {
            if (res.success) {
                setComments(res.data);
            }
            console.log('Game comment', res)
        })
    }

    const confirmDelete = (id) => {
        request('comment.delete',{
            data: JSON.stringify({ id })
        }).then(res => {
            if(res.success) {
                const newList = comments.filter(item => item._id != id);
                setComments(newList)
                message.success('delete successfully')
            }
        })
    }

    const confirmDeleteGame = (id) => {
        request('game.delete',{
            data: JSON.stringify({ id })
        }).then(res => {
            console.log(res)
            if(res.success) {
                const newList = data.filter(item => item._id != id);
                setData(newList)
                message.success('delete successfully')
            }
        })
    }

    const columns = [
        {
            title: 'thumb',
            dataIndex: 'thumb',
            key: 'thumb',
            width: 150,
            fixed: 'left',
            render: (record) =>
                <img src={record} width="100" height="100" crossOrigin='Anonymous' alt="" />
        },
        {
            title: 'name',
            width: 100,
            dataIndex: 'name',
            key: 'name',
            fixed: 'left',
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: '2',
            width: 100
        },
        {
            title: 'type',
            dataIndex: 'tag',
            key: '3',
            width: 150
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: '4',
            width: 300,
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
                            title="Are you sure to delete this task?"
                            onConfirm={() => confirmDeleteGame(row._id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="danger">delete</Button>
                        </Popconfirm>
                        <Button type="primary" onClick={() => handleEdit(row)}>edit</Button>
                    </Space>
                )
            },
        },
    ];

    const initGame = () => {
        request('game.init').then(res => {
            if (res.success) {
                setData(res.data)
            }
        })
    }

    useEffect(() => {
        initGame()
    }, [])

    return (
        <div className="relative m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="game list" />
            {/* <div className="absolute overflow-hidden right-[50px] top-[60px]">
                <Button type="primary" >add game</Button>
            </div> */}
            <Table
                columns={columns}
                dataSource={data}
                scroll={{
                    x: 600,
                }}
            />
            <Modal
                title="game edit"
                centered
                open={modalShow}
                width={800}
                onOk={confirmEdit}
                onCancel={() => setModalShow(false)}
            >
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>name</span>
                    </div>
                    <Input max={20} onChange={e => handleChange(e.target.value, 'name')} value={current.name} />
                </div>
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>price</span>
                    </div>
                    <InputNumber onChange={v => handleChange(v, 'price')} style={{ margin: 0 }} value={current.price} />
                </div>
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>type</span>
                    </div>
                    <Select
                        defaultValue="rpg"
                        style={{
                            width: 120,
                        }}
                        value={current.tag}
                        onChange={e => handleChange(e,'tag')}
                    >
                        <Option value="rpg">rpg</Option>
                        <Option value="action">action</Option>
                        <Option value="adventure">adventure</Option>
                        <Option value="strategy">strategy</Option>
                        <Option value="casual">casual</Option>
                    </Select>
                </div>
                <div className="flex mb-[10px]">
                    <div className="min-w-[120px]">
                        <span className="text-red-500">*</span>
                        <span>description</span>
                    </div>
                    <TextArea onChange={e => handleChange(e.target.value, 'description')} value={current.description} />
                </div>
                <div className="rounded-[10px] p-[10px] bg-gray-100 max-h-[350px] overflow-auto">
                    <div className="font-bold">comments</div>
                    {comments.length > 0 ?
                        comments.map((item, index) => (
                            <div key={index}>
                                <Comment
                                    author={<span className="text-gray-500 font-bold">{item.authorName}</span>}
                                    avatar={<Avatar shape="square" src={item.authorAvatar} />}
                                    content={
                                        <div className="flex justify-between">
                                            <span className="font-bold mr-[20px]">{item.content}</span>
                                            <Popconfirm
                                                title="delte this comment?"
                                                onConfirm={() => confirmDelete(item._id)}
                                                okText="ok"
                                                cancelText="cancel"
                                            >
                                                <Button size='small' type="danger">delete</Button>
                                            </Popconfirm>
                                        </div>
                                    }
                                    datetime={
                                        <span>{item.createdAt}</span>
                                    }
                                >
                                </Comment>
                            </div>
                        ))
                        : <span className="text-gray-500 font-xs">no comments</span>}
                </div>
            </Modal>
        </div>
    );
};
export default Game;
