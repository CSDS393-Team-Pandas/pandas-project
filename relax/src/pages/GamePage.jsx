import React, { useState,useEffect } from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import request from '../utils/request'
import GameCard from '../components/GameCard'

const GamePage = () => {
    const [list,setList] = useState([])

    const initGameList = () => {
        request('game.init').then(res => {
            if(res.success) {
                setList(res.data)
            }
        })
    }

    useEffect(() => {
        initGameList()
    },[])
    return (
        <div className="bg-[#303136] w-[100vw]">
            <NavBar />
            <div className="flex p-[20px] flex-start flex-wrap min-h-[100vh]">
                { list.length>0? (
                    list.map((item,index) => (
                        <div className="mr-[20px]">
                            <GameCard info={item} key={index}/>
                        </div>
                    ))
                ):<span>no game</span> }
            </div>
            <Footer/>
        </div>
    )
}

export default GamePage