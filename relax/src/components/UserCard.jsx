import React from 'react'
import { Avatar, Button } from 'antd'

const UserCard = ({ info }) => {
    return (
        <div className="w-full flex justify-between items-center py-[20px] border-b-1">
            <div className="flex">
                <div className="w-[80px] bg-gray-100 h-[80px] rounded-[5px] overflow-hidden">
                    <img size="large" src={info.avatar}/>
                </div>
                <div className="ml-[16px]">
                    <div className="font-bold text-xl">{info.nickname}</div>
                    <div className="font-bold text-gray-500">{info.signature}</div>
                </div>
            </div>
            <Button type="primary">已关注</Button>
        </div>
    )
}

export default UserCard