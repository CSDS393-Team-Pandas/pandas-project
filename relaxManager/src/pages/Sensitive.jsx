import React, { useState, useEffect } from 'react';
import { Input, Space, Button, Select, Tag, Radio, Modal,message } from 'antd';
import { Header } from '../components';
import { AiOutlinePlus, AiOutlineCloseCircle } from 'react-icons/ai'
import { useStateContext } from '../contexts/ContextProvider';
import request from '../utils/request';

const Sensitive = () => {
    const { currentColor } = useStateContext();
    const [infoShow, setInfoShow] = useState(false);
    const [key, setKey] = useState("");
    const [list, setList] = useState([]);
    const [mode,setMode] = useState(0);
    const [info, setInfo] = useState({
        name: '',
        list: [],
    })

    const initSensitive = () => {
        request('sensitive.init').then(res => {
            if (res.success)
                setList(res.data)
        })
    }

    const handleCollView = (row) => {
        setMode(1);
        setInfo(row)
        setInfoShow(true)
    }

    const handleCollCreate = () => {
        setMode(0)
        setInfoShow(true)
    }

    const createSensitive = () => {
        request('sensitive.create', {
            data: JSON.stringify(info)
        }).then(res => {
            if (res.success) {
                const newList = [...list];
                newList.push(info)
                setList(newList)
                setInfoShow(false);
                message.success('Successfully create ensitive word set')
            }
        })
    }

    const updateSensitive = () => {
        request('sensitive.update', {
            data: JSON.stringify(info)
        }).then(res => {
            if (res.success) {
                const index = list.findIndex(item => item._id == info._id),newList = [...list];
                newList[index] = info;
                setList(newList);
                setInfoShow(false);
                message.success('Successfully edit')
                setInfo({
                    name: '',
                    list: [],
                    active: false
                })
            }
        })
    }

    const addKey = (key) => {
        const list = info.list;
        if(list.includes(key)) {
            message.error('sensitive word already exists')
            return
        }
        list.push(key);
        setInfo(prev => ({...prev,list}))
        setKey("");
    }

    const removeKey = (key) => {
        let list = info.list;
        list = list.filter(item => item!=key)
        setInfo(prev => {
            return({...prev,list})
        })
    }

    const handleChange = (v, name) => {
        setInfo(prev => ({ ...prev, [name]: v }))
    }

    useEffect(() => {
        initSensitive();
    }, [])
    return (
        <div className="relative m-2 min-h-[100vh] md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="sensitive word regulation" />
            <div onClick={handleCollCreate} className="fixed hover:opacity-50 right-[20px] top-[100px] bg-blue-500 w-[50px] h-[50px] rounded-full flex items-center justify-around">
                <AiOutlinePlus size={30} color="white" />
            </div>
            <div className="flex">
                {list.length > 0 ? list.map((item, index) => (
                    <div key={index} onClick={() => handleCollView(item)}>
                        <div className={`mr-[10px] mb-[10px] relative transition-all cursor-pointer hover:scale-105 p-[20px] rounded-[10px]`} style={{background: currentColor}}>
                            {/* <div className="absolute top-[10px] right-[10px]">
                                <AiOutlineCloseCircle color="white" size={25}/>
                            </div> */}
                            <div className="mr-[20px]">
                                <Tag color="blue">{item.name}</Tag>
                            </div>
                            <span className="text-white">word number: {item.list.length}</span>
                        </div>
                    </div>
                )) : <span>no data</span>}
            </div>
            <Modal
                title="Sensitive word collection management"
                centered
                open={infoShow}
                onOk={mode == 0? createSensitive:updateSensitive}
                onCancel={() => setInfoShow(false)}
            >
                <div className="flex mb-[20px]">
                    <div className="min-w-[100px]"><span className="text-red-500 mr-[10px]">*</span>collection name</div>
                    <Input value={info.name} onChange={e => handleChange(e.target.value, 'name')} />
                </div>
                <div className="flex mb-[20px]">
                    <div className="min-w-[100px] mr-[20px]"><span className="text-red-500 mr-[10px]">*</span>whether to choose the sensitive word set</div>
                    <Radio.Group onChange={e => handleChange(e.target.value, 'active')} value={info.active}>
                        <Radio value={true}>yes</Radio>
                        <Radio value={false}>no</Radio>
                    </Radio.Group>
                </div>
                <div className="flex max-h-[400px] overflow-auto mb-[20px] items-center bg-gray-100 flex-wrap p-[10px] rounded-[10px] shadow-lg">
                    {info.list.length > 0 ? info.list.map((item, index) => (
                        <div key={index} className="mr-[10px] mb-[10px]">
                            <Tag onClose={(e) => removeKey(item)} closable color="blue">{item}</Tag>
                        </div>
                    )) : <span>no critical word</span>}
                </div>
                <div className="flex">
                    <Input value={key} onChange={e => setKey(e.target.value)} />
                    <Button type="primary" onClick={() => addKey(key)}>add sensitive word</Button>
                </div>
            </Modal>
        </div>
    )
};

export default Sensitive;
