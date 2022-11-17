import React from 'react'
import {AiOutlineShoppingCart,AiFillBulb} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const Button = (props) => {
    const {children,onClick,className} = props;
    const callback = () => {
        return onClick || (() => {})
    }
    const baseClasses = () => {
        return "h-[35px] hover:opacity-50 text-[#e49c45] leading-[33px] cursor-pointer px-[15px] text-center border-[#e49c45] border-1 rounded-[4px] " + (className || '')
    }
    return (
        <div onClick={callback} className={baseClasses()} {...props}>{children}</div>
    )
}

const Tag = ({children,className,onClick}) => {
    const callback = () => {
        return onClick || (() => {})
    }
    const baseClasses = () => {
        return "h-[20px] hover:opacity-50 cursor-pointer text-xs text-white px-[10px] rounded-[4px] leading-[20px] text-center bg-[#7c8187] " + (className || '')
    }
    return (
        <div onClick={callback} className={baseClasses()}>{children}</div>
    )
}

const GameCard = ({ info }) => {
    const navigate = useNavigate();

    const formatDate = (date) => {
        const dt = new Date(date);
        return `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`
    }
    
    const toDetail = (id) => {
        navigate(`/gameDetail?${id}`)
    }
    return (
        <div className="bg-[#38393e] rounded-[5px] h-fit hover:translate-y-[-6px] hover:shadow-lg mt-[20px] transition-all shadow-md overflow-hidden w-[250px]"
        style={{transition: '0.3s'}}>
            <div className="w-full relative h-[150px] overflow-hidden">
                <img className="w-full absolute top-[50%] translate-y-[-50%]" crossOrigin='Anonymous' src={info.thumb}/>
            </div>
            <div className="py-[10px] px-[20px]">
                <div className="font-bold text-[#95969a] text-xl">{info.name}</div>
                <div className="flex justify-between items-center">
                    <span className="text-[#e49c45] font-bold">${info.price}</span>
                    <Tag style={{margin: 0}} color="blue">{ info.tag }</Tag>
                </div>
                <div className="flex h-[40px] overflow-hidden">
                    <div className="text-gray-500">{info.description}</div>
                </div>
                <div className="flex justify-between items-center mt-[15px]">
                    <div className="text-[#95969a]">
                        <div>{info.authorName || '匿名用户'}</div>
                        <div className="text-xs">{formatDate(info.createdAt)}</div>
                    </div>
                    <Button onClick={() => toDetail(info._id)}>View More</Button>
                </div>
            </div>
        </div>
    )
}

export default GameCard