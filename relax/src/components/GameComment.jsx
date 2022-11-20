import React, { useState, useEffect } from 'react'
import request from '../utils/request'
import {AiOutlineHeart} from 'react-icons/ai'
import { message } from 'antd';

const Button = (props) => {
    const { children, onClick, className } = props;
    const callback = () => {
        return onClick || (() => { })
    }
    const baseClasses = () => {
        return " h-[35px] hover:opacity-50 inline-block text-[#e49c45] leading-[33px] cursor-pointer px-[15px] text-center border-[#e49c45] border-1 rounded-[4px] "
    }
    return (
        <div onClick={callback} className={className + baseClasses()} {...props}>{children}</div>
    )
}

const CommentCard = ({ info }) => {
    const formatDate = (date) => {
        const dt = new Date(date);
        return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()} ${dt.getHours()}:${dt.getMinutes()}`
    }
    return (
        <div className="flex relative text-white hover:opacity-50 py-[20px]">
            <img className="w-[60px] h-[60px] rounded-[4px]" src={info.authorAvatar} crossOrigin="anonymous" />
            <div className="ml-[12px]">
                <span className="mr-[12px] font-bold">{info.authorName}</span>
                <span className="text-xs text-gray-500">{formatDate(info.createdAt)}</span>
                <div>{info.content}</div>
            </div>
            <div className="absolute right-[10px] top-[20px]">
                <AiOutlineHeart color="white" size={24}/>
            </div>
        </div>
    )
}

const GameComment = ({ gameId }) => {
    const [list, setList] = useState([]);
    const [content, setContent] = useState("")
    const initCommentList = () => {
        if (!gameId) {
            message.info('illegal id')
        }
        request('comment.init', {
            data: { gameId }
        }).then(res => {
            if (res.success) {
                setList(res.data)
            }
        })
    }

    const createComment = () => {
        if (!content) {
            message.error('content is null')
            return;
        }
        request('comment.create', {
            data: JSON.stringify({ content, gameId })
        }).then(res => {
            if (res.success) {
                message.success('comment successfully')
                setList(prev => ([...prev,res.data]))
            }
        })
    }

    useEffect(() => {
        initCommentList()
    },[])
    return (
        <div>
            <div className="relative">
                <textarea className="w-full outline-none p-[20px] text-[#6f6f74] min-h-[120px] max-h-[200px] bg-[rgba(0,0,0,0.2)]"
                    value={content}
                    onChange={e => setContent(e.target.value)}></textarea>
                <div className="absolute right-[20px] bottom-[20px]">
                    <Button onClick={createComment}>release</Button>
                </div>
            </div>
            <div className="my-[15px]">
                { list.length > 0? (
                    list.map((item,index) => (
                        <CommentCard info={item} key={index}/>
                    ))
                ):<span className="text-white">no comments</span> }
            </div>
        </div>
    )
}

export default GameComment