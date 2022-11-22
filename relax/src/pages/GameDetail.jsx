import React,{useState,useEffect} from 'react'
import Footer from '../components/Footer'
import NavBar from '../components/NavBar'
import request from '../utils/request'
import { useLocation,useNavigate } from 'react-router-dom'
import { getRateNumber, updateRate,getGameRate as getScore, getUserRateCent} from '../redux/features/rateSlice'
import { getUserInfo } from '../redux/features/userSlice'
import { Tag,Rate,Modal,message } from 'antd'
import { useDispatch,useSelector } from 'react-redux'
import { initRate } from '../redux/features/rateSlice'
import GameComment from '../components/GameComment'

const Button = (props) => {
    const {children,onClick} = props;
    const callback = () => {
        return onClick || (() => {})
    }
    const baseClasses = () => {
        return "h-[35px] inline-block hover:opacity-50 text-[#e49c45] leading-[33px] cursor-pointer px-[15px] text-center border-[#e49c45] border-1 rounded-[4px]"
    }
    return (
        <>
            <div onClick={callback} className={baseClasses()} {...props}>{children}</div>
        </>
    )
}

// Game detail page
const GameDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const gameId = location.search.split('?')[1] || '';
    const rateNumber = useSelector(getRateNumber)
    const userInfo = useSelector(getUserInfo);
    const rateCent = useSelector(getUserRateCent(userInfo._id))
    const score = useSelector(getScore);
    const [rate,setRate] = useState(5)
    const [visible,setVisible] = useState(false);
    const [info,setInfo] = useState({
        thumb: '',
        name: '',
        price: 0,
        number: 0,
        description: ''
    })

    // user rate
    const confirmRate = () => {
        request('rate.create',{
            data: JSON.stringify({gameId,rate})
        }).then(res => {
            if(res.success) {
                message.success('rate successfully')
                dispatch(updateRate({...res.data,rate}))
                setVisible(false)
            }
        })
    }

    // get game rate
    const getGameRate = () => {
        request('rate.init',{
            data: JSON.stringify({gameId})
        }).then(res => {
            dispatch(initRate(res.data))
        })
    }

    // Get game details 
    const getGameInfo = () => {
        request('game.info',{
            data: JSON.stringify({id: gameId})
        }).then(res => {
            if(res.success) {
                setInfo(res.data)
            }
        })
    }

    // Get game details when page renders
    useEffect(() => {
        getGameInfo()
        getGameRate();
    },[])

    return (
        <div className="min-h-[100vh] flex flex-col justify-between bg-[#303136]">
            <NavBar/>
            <div className='w-full px-[200px] py-[50px]'>
                <div className="w-full flex">
                    <img className="w-[400px] rounded-[10px] h-[400px] shadow-md" crossOrigin='Anonymous' src={info.thumb} alt="" />
                    <div className="ml-[50px] text-[#6f6f75]">
                        <div className="text-xl mb-[15px] font-bold text-[#6f6f75]">{info.name}</div>
                        <div className="mb-[15px]"> 
                            <Tag color="red">game category {info.tag}</Tag>
                        </div>
                        <div><span className="font-bold text-md">deltail: </span>{info.description}</div>
                        <div className="my-[10px] text-xl font-bold text-red-500"> 
                            $ {info.price}
                        </div> 
                        <div className="flex items-center">
                            <Rate disabled allowHalf value={score} />
                            <span className="ml-[10px]">{rateNumber} men rated</span>
                        </div>
                        <div className="mt-[30px]">
                            {
                                rateCent == -1? <Button onClick={() => setVisible(true)} type="primary">rate now</Button> :
                                <Button onClick={() => setVisible(true)} type="primary">you have rated {rateCent} cent</Button> 
                                
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                title="give this game a rate"
                centered
                visible={visible}
                onOk={() => confirmRate()}
                onCancel={() => setVisible(false)}
            >
                <Rate  onChange={setRate} value={rate} allowHalf defaultValue={5} />
            </Modal>
            <div className="px-[200px] py-[20px]">
                <GameComment gameId={gameId}/>
            </div>
            <Footer/>
        </div>
    )
}

export default GameDetail