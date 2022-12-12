import React, { useState, useEffect } from 'react'
import request from '../utils/request'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { getToken } from '../utils/storage'
import { useNavigate } from 'react-router-dom'
import { Avatar, Radio, Skeleton, Tabs,Tag,Rate, Input,message,Modal } from 'antd'
const { TextArea } = Input;

const Comment = () => {
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState([]);
    const navigate = useNavigate();
    const initUserComment = () => {
        setLoading(true)
        request('comment.user').then(res => {
            setLoading(false)
            if (res.success)
                setComment(res.data || [])
        }).catch(e => setLoading(false))
    }
    useEffect(() => {
        initUserComment();
    }, [])
    return (
        <>
            {loading ? <Skeleton active /> :
                comment.map((item, index) => (
                    <div className="flex justify-between text-white items-center py-[20px]">
                        <div className="flex">
                            <Avatar shape="square" src={item.authorAvatar} />
                            <div className="ml-[10px]">
                                <div className="font-xs mb-[5px]">{ item.authorName }</div>
                                <span className="font-bold">{item.content}</span>
                            </div>
                        </div>
                        <div onClick={() => navigate(`/gameDetail?${item.gameId}`)}>
                            <div className="text-blue-500 cursor-pointer hover:opacity-50 text-right">{ 'game' + ' >' }</div>
                        </div>
                    </div>
                ))}
        </>
    )
}

const RateCard = ({ info }) => {
    const navigate = useNavigate();
    const toDetail = (id) => {
        navigate(`/gameDetail?${id}`)
    }
    return (
        <div className="w-full flex justify-between items-center py-[20px] hover:opacity-50">
            <div className="flex">
                <div className="w-[80px] bg-gray-100 h-[80px] rounded-[5px] overflow-hidden">
                    <img className="h-[80px]" src={info.thumb} crossOrigin="Anonymous"/>
                </div>
                <div className="ml-[16px]">
                    <div className="font-bold text-xl">{info.name}</div>
                    <Rate disabled value={info.rate}/>
                </div>
            </div>
            <Button onClick={() => toDetail(info.gameId)} type="primary">{'game detail >'}</Button>
        </div>
    )
}

const RateList = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const initFocusUser = () => {
        setLoading(true)
        request('user.rate').then(res => {
            setLoading(false)
            console.log('result',res)
            if (res.success)
                setList(res.data)
        }).catch(e => setLoading(false))
    }
    useEffect(() => {
        initFocusUser();
    }, [])
    return (
        <>
            {loading ? <Skeleton active /> :
                list.map((item, index) => (
                    <RateCard info={item} key={index}/>
                ))}
        </>
    )
}

const Feedback = () => {
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [content,setContent] = useState('');
    const initList = () => {
        setLoading(true)
        request('feedback.init').then(res => {
            setLoading(false)
            if (res.success)
            setList(res.data)
        }).catch(e => setLoading(false))
    }

    const handleSubmit = () => {
        if(!content) {
            return;
        }
        request('feedback.create',{
            data:JSON.stringify({content})
        }).then(res => {
            if(res.success) {
                setContent("")
                message.success('thank for your feedback')
            }
        })
    }
    useEffect(() => {
        // initList();
    }, [])
    return (
        <>
            <TextArea value={content} style={{background: 'rgba(0,0,0,0.24)',color: 'white'}} onChange={e => setContent(e.target.value)} placeholder='submit suggest'/>
            <div className="my-[20px] flex">
                <div className="mr-[20px]"><Button type="primary" ghost>reset</Button></div>
                <Button type="primary" onClick={handleSubmit}>submit</Button>
            </div>
            {loading ? <Skeleton active /> :
                list.map((item, index) => (
                   <div key={index}></div>
                ))}
        </>
    )
}

const Behavior = () => {
    const tabList = [
        { label: 'rate', key: 1, children: <RateList /> },
        { label: 'comment', key: 2, children: <Comment /> },
        { label: 'feedback', key: 5, children: <Feedback /> },
    ]
    return (
        <div  className="w-full bg-[#303136]">
            <Tabs style={{color: 'white'}}  items={tabList} />
        </div>
    )
}

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

const inputClass = 'w-full bg-[rgba(0,0,0,0)] outline-none text-white border-none'

const UserInfo = () => {
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState({
        avatar: '',
        nickname: '',
        sex: '',
        gameLabel: '',
        signature: ''
    })
    const labelList =  ["rpg","action","shooter","strategy","casual"]

    const handleChange = (value, name) => {
        setInfo(prev => ({ ...prev, [name]: value }))
    }

    const getUserInfo = () => {
        request('user.info').then(res => {
            if (res.success) 
                setInfo(res.data);
        })
    }

    const updateUserInfo = () => {
        request('user.update',{
            data: JSON.stringify(info)
        }).then(res => {
            if(res.success) {
                message.success('edit successfully')
                setVisible(false)
            }
        })
    }

    const toggleVisible = () => {
        setVisible(!visible)
    }

    useEffect(() => {
        if (!getToken) {
            navigate('/sign')
        }

        getUserInfo();
    }, [])
    return (
        <div className='bg-[#303136]'>
            <NavBar />
            <div className="w-full text-gray-500 min-h-[100vh] py-[20px] px-[20px] md:px-[200px]">
                <div className={`${visible ? 'h-[730px]' : 'h-[200px]'} border-1 transition-all relative mt-[50px] px-[40px] w-full overflow-y-hidden  bg-[rgba(0,0,0,0.1)] rounded-md  shadow-md`}>
                    <div className="flex relative mt-[20px] items-center">
                        <div className="mr-[20px] h-[150px] bg-gray-50 rounded-[5px] w-[150px] overflow-hidden shadow-md">
                            <img className="h-full" src={info.avatar} />
                        </div>
                        <div>
                            <p className="font-bold text-2xl">{info.nickname}</p>
                            <p className="font-bold text-gray-500 text-xl">{info.signature}</p>
                        </div>
                        <div className="absolute right-[0px] top-[50%] translate-y-[-50%]">
                            <Button onClick={toggleVisible}>edit profile</Button>
                        </div>
                    </div>
                    {visible && (<div className="mt-[20px] text-gray-500 pl-[150px] w-full items-center">
                        <div className="flex items-center py-[30px]">
                            <div className="mr-[20px] min-w-[120px] text-xl text-gray-500">Avatar</div>
                            // <input className={inputClass} onChange={e => handleChange(e.target.value, 'avatar')} value={info.avatar} />
                        </div>
                        <div className="flex items-center py-[30px]">
                            <div className="mr-[20px] min-w-[120px] text-xl text-gray-500">Nickname</div>
                            <input className={inputClass} onChange={e => handleChange(e.target.value, 'nickname')} value={info.nickname} />
                        </div>
                        <div className="flex items-center py-[30px]">
                            <div className="mr-[20px] min-w-[120px] text-xl text-gray-500">Gender</div>
                            <Radio.Group style={{color: 'white'}} onChange={e => handleChange(e.target.value, 'sex')} name="radiogroup" value={info.sex} defaultValue={0}>
                                <Radio style={{color: 'white'}}  value={0}>unknown</Radio>
                                <Radio style={{color: 'white'}}  value={1}>man</Radio>
                                <Radio style={{color: 'white'}}  value={2}>women</Radio>
                            </Radio.Group>
                        </div>
                        <div className="flex items-center py-[30px]">
                            <div className="mr-[20px] min-w-[120px] text-xl text-gray-500">Game Preference</div>
                            <Radio.Group style={{color: 'white'}} onChange={e => handleChange(e.target.value, 'gameLabel')} name="radiogroup" value={info.gameLabel} defaultValue={0}>
                                {
                                    labelList.map((item,index) => (
                                        <Radio style={{color: 'white'}} key={index} value={item}>{item}</Radio>
                                    ))
                                }
                            </Radio.Group>
                        </div>
                        <div className="flex items-center py-[30px]">
                            <div className="mr-[20px] min-w-[120px] text-xl text-gray-500">Signature</div>
                            <input className={inputClass} onChange={e => handleChange(e.target.value, 'signature')} value={info.signature} />
                        </div>
                        <div className="flex justify-between mt-[20px]">
                            <Button onClick={() => setVisible(false)}>cancel</Button>
                            <Button type="primary" onClick={updateUserInfo}>save result</Button>
                        </div>
                    </div>)}
                </div>
                <div className="border-1 pb-[30px] transition-all relative mt-[20px] px-[50px] w-full  bg-[#303136] rounded-md  shadow-md">
                    <Behavior />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserInfo
