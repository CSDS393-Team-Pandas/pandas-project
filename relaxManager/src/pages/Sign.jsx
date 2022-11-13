import React, { useState } from 'react'
import { HiUserCircle } from 'react-icons/hi';
import {AiOutlineLock} from 'react-icons/ai';
import { AiOutlineLoading } from 'react-icons/ai';
import request from '../utils/request';
import { Input, Button, Space } from 'antd';
import heroBg from '../assets/hero.png'
import {storeUser} from '../utils/storage';
import { message } from 'antd'

const Sign = () => {
    const [loginType, setType] = useState(0);
    const [loading, setLoading] = useState(false);
    const [info,setInfo] = useState({
        nickname: '',
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        setInfo(prev => ({...prev,[e.target.name]: e.target.value}));
    }

    const handleSignUp = () => {
        if(!info.nickname || !info.username || !info.password) {
            message.error('表单不能为空')
            return
        }
        setLoading(true)
        request('admin.register',{
            data: JSON.stringify(info),
        }).then(res => {
            if(res.success) {
                message.success('注册成功')
            }
            setLoading(false)
        }).catch(e => setLoading(false))
    }

    const handleSignIn = () => {
        if(!info.username || !info.password) {
            message.error('表单不能为空')
            return
        }
        setLoading(true)
        request('admin.login',{
            data: JSON.stringify(info)
        }).then(res => {
            if(res.success) {
                if(res.success) {
                    message.success('登录成功')
                }
                storeUser(res.data);
                window.location.href = "/"
            }
            setLoading(false)
        }).catch(e => setLoading(false))
    }
    return (
        <div className="flex relative w-[100vw] h-[100vh] justify-around items-center text-black">
            <img className="absolute left-0 top-0 h-[100%] w-[100%]" src={heroBg} alt="" />
            <div className="bg-white text-black z-10 shadow-xl flex py-[50px] items-center px-[90px]">
                <div className="font-bold dark:text-white min-w-[350px]">
                <div className="font-bold mb-[20px] text-black text-2xl mr-[15px]">GAM<span className="text-orange-500">E</span> ONLINE DASHBOARD</div>
                    <div className="tabs flex cursor-pointer text-black">
                        <div onClick={() => setType(0)} className={`${loginType == 0 && 'border-b-2'} h-[30px] leading-[30px] mr-[20px]`}>Login</div>
                        <div onClick={() => setType(1)} className={`${loginType == 1 && 'border-b-2'} h-[30px] leading-[30px]`}>register</div>
                    </div>
                    { loginType == 0 && <div className="mt-[20px]">
                        <Input size="large" value={info.username} onChange={handleChange} placeholder="username" name="username" prefix={<HiUserCircle color="gray" />} />
                        <br />
                        <br />
                        <Input size="large" value={info.password} onChange={handleChange} type="password" placeholder="password" name="password" prefix={<AiOutlineLock color="gray" />} />
                        <br /> <br />
                        <div className="flex justify-between mb-[15px]">
                            <span>forget password</span>
                            <span>reset password</span>
                        </div>
                        <Button block type="primary" loading={loading} prefix={<AiOutlineLoading />} onClick={handleSignIn}>
                            LOG IN
                        </Button>
                    </div> }
                    { loginType == 1 && <div className="mt-[20px]">
                        <Input size="large" value={info.nickname} onChange={handleChange} placeholder="nickname" name="nickname" prefix={<HiUserCircle color="gray" />} />
                        <br />
                        <br />
                        <Input size="large" value={info.username} onChange={handleChange} placeholder="username" name="username" prefix={<AiOutlineLock color="gray" />} />
                        <br />
                        <br />
                        <Input size="large" value={info.password} onChange={handleChange} type="password" placeholder="passowrd" name="password" prefix={<AiOutlineLock color="gray" />} />
                        <br /> <br />
                        <Button block type="primary" loading={loading} prefix={<AiOutlineLoading />} onClick={handleSignUp}>
                            REGISTER
                        </Button>
                    </div> }
                </div>
                {/* <div className="ecode min-w-[300px]">

                </div> */}
            </div>
        </div>
    )
}

export default Sign