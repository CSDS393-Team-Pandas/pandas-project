import { useLuisoContext } from "../Context/LuisoProvider";
import React, { useState, useEffect } from 'react'
import { Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch} from 'react-icons/ai'
import request from '../utils/request';


const SearchPanel = () => {
    const { setSearchShow } = useLuisoContext();
    const navigate = useNavigate();
    const [key,setKey] = useState("")
    const [result,setResult] = useState([]);
    // Search for products based on form keywords
    const handleSearch = (key) => {
        setKey(key);
        if(!key) {
            setResult([])
            return;
        }
        request('search.product',{
            data: JSON.stringify({key})
        }).then(res => {
            if(res.success)
                setResult(res.data);
        })
    }

    const toProductList = (id) => {
        navigate(`/productDetail?${id}`)
        setSearchShow(false)
    }
    return (
        <div className="w-[100vw] flex justify-around items-center top-[0] left-0 h-[100vh] bg-[rgba(0,0,0,0.5)] fixed z-[9999]">
            <div className="w-[600px] z-[10] min-h-[340px] rounded-[10px] bg-white">
                <div className="flex items-center h-[50px] border-b-1 px-[10px]">
                    <AiOutlineSearch size={30}/>
                    <input className="w-full ml-[10px] border-none outline-none" value={key} onChange={e => handleSearch(e.target.value)} placeholder="search game"/>
                </div>
                <div className="py-[10px] px-[30px]">
                    {result.length>0?
                        // (result.map((item,index) => (
                        //     <div key={index} onClick={() => toProductList(item._id)} className="flex mb-[15px] px-[15px] py-[10px] bg-gray-100 transition-all rounded-[10px] hover:bg-blue-500 justify-between">
                        //         <div className="flex">
                        //             <div className="h-[50px] mr-[15px] w-[50px] rounded-[5px] overflow-hidden">
                        //                 <img src={item.thumb} crossOrigin="Anonymous"/>
                        //             </div>
                        //                 <div>
                        //                     <div className="font-bold">{item.name}</div>
                        //                     <Tag color="blue">{item.tag}</Tag>
                        //                 </div>
                        //         </div>
                        //         <div className="text-red-500">{item.price}$</div>
                        //     </div>
                        // )))
                        <span></span>
                    :( <span className="text-gray-500 font-xl">no result</span>)}
                </div>
            </div>
            <div onClick={() => setSearchShow(false)} className="bg w-full h-full z-[0] absolute left-0 top-0"></div>
        </div>
    )
}

export default SearchPanel