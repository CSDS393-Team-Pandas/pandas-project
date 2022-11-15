import React, { useState, useEffect } from 'react';
import { Modal, Upload } from 'antd';
import { Input, Space, Button, InputNumber, Select } from 'antd';
import { Header } from '../components';
import request from '../utils/request'
import {message} from 'antd'
const { TextArea } = Input;
const { Option } = Select;

const GameRelease = () => {
    const [info, setInfo] = useState({
        name: '',
        description: '',
        price: 0,
        number: 0,
        tag: 'Shooting game',
        thumb: '',
    })
    const [imgFile, setImgFile] = useState({});

    const handleImgUpload = () => {
        if (!imgFile)
            return;
        const fd = new FormData();
        fd.append('upload', imgFile)
        return new Promise((resolve, reject) => {
            request('upload', {
                formData: true,
                data: fd
            }).then(res => {
                if (res.success) {
                    resolve(res.data.url)
                }
            }).catch(e => reject(''))
        })
    }

    const resetForm = () => {
        setInfo({
            name: '',
            description: '',
            price: 0,
            number: 0,
            tag: 'Shooting game',
            thumb: '',
        })
    }

    const handleGameRelease = async () => {
        if (!info.name || !info.price || !info.description) {
            message.error('form is null')
            return
        }
        try {
            const uri = await handleImgUpload();
            request('game.create', {
                data: JSON.stringify({ ...info, thumb: uri })
            }).then(res => {
                if (res.success) {
                    message.success('game release successfully')
                    resetForm()
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const [modalVisible, setModalVisible] = useState(false);

    const handleChange = (value, name) => {
        setInfo(prev => ({ ...prev, [name]: value }))
    }
    return (
        <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
            <Header category="Page" title="game release" />
            <div>
                <div className="mx-[10px] my-[20px] bg-white">
                    <p className="text-xl font-bold mb-[10px]">#{info.title || 'name'}</p>
                    <Input showCount maxLength={20} onChange={(e) => handleChange(e.target.value, 'name')} />
                    <p className="text-xl font-bold mb-[10px]">#{info.title || 'type'}</p>
                    <Select
                        defaultValue="Shooting game"
                        style={{
                            width: 120,
                        }}
                        value={info.tag}
                        onChange={e => handleChange(e,'tag')}
                    >
                        <Option value="io">io</Option>
                        <Option value="Shooting game">Shooting game</Option>
                        <Option value="Casual game">Casual game</Option>
                        <Option value="3D">3D</Option>
                        <Option value="Cards game">Cards game</Option>
                    </Select>
                    {/* <p className="text-xl font-bold mb-[10px]">#{info.title || '游戏库存'}</p>
                    <InputNumber value={info.number} onChange={(v) => handleChange(v, 'number')} /> */}
                    <p className="text-xl font-bold mb-[10px]">#{info.title || 'price'}</p>
                    <InputNumber value={info.price} addonBefore="+" addonAfter="¥" defaultValue={0} onChange={(v) => handleChange(v, 'price')} />
                    <p className="mt-[20px] text-xl font-bold mb-[10px]">#game thumb</p>
                    <ImageUploader onFileChange={setImgFile} />
                    <p className="mt-[20px] text-xl font-bold mb-[10px]">#description</p>
                    <TextArea value={info.description} placeholder="description" onChange={(e) => handleChange(e.target.value, 'description')} />
                    <div className="mt-[20px]">
                        <Button onClick={handleGameRelease} type="primary">release</Button>
                    </div>
                </div>
                <Modal
                    title="Add Topic"
                    centered
                    visible={modalVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                >
                    <Input value={info.topic} onChange={e => handleChange(e.target.value, 'topic')} />
                </Modal>
            </div>
        </div>
    )
};

const ImageUploader = ({ max, onFileChange }) => {
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        }
        )
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState([]);
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
    };
    const handleChange = ({ fileList: newFileList }) => {
        if (fileList[0] && fileList[0].originFileObj)
            onFileChange(fileList[0].originFileObj)
        newFileList.forEach(item => {
            item.status = 'done';
        })
        setFileList(newFileList)
    };
    const uploadButton = (
        <div>
            <div>add thumb</div>
        </div>
    );
    return (
        <>
            <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
            >
                {fileList.length == 1 ? null : uploadButton}
            </Upload>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
}
export default GameRelease;
