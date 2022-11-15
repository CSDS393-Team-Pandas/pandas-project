import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLuisoContext } from '../Context/LuisoProvider'
import { Space, Avatar, Dropdown, Menu } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { getUserInfo } from '../redux/features/userSlice';
import { initUser } from '../redux/features/userSlice';
import { getUser, dropUser } from '../utils/storage';
import SearchPanel from './SearchPanel';
import { AiOutlineUser,AiOutlineSetting, AiOutlinePoweroff,AiOutlineSearch } from 'react-icons/ai'

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

const MenuList = () => {
    const signOut = () => {
        dropUser();
        window.location.href = "/";
    }

    const list = [
        {
            key: '1',
            label: (
                <a className="flex items-center" rel="noopener noreferrer" href="/user">
                    <AiOutlineUser />
                    <span>user profile</span>
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a className="flex items-center" rel="noopener noreferrer" href="/user">
                    <AiOutlineSetting />
                    <span>settings</span>
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <span className="flex items-center" rel="noopener noreferrer" onClick={signOut}>
                    <AiOutlinePoweroff />
                    <span>log out</span>
                </span>
            ),
        }
    ]
    return (
        <Menu
            items={list}
        />
    );
}

const NavBar = () => {
    const { theme,cartShow,searchShow, setSearchShow,toggleTheme } = useLuisoContext();
    const [open, setOpen] = useState(false)
    const userInfo = useSelector(getUserInfo);

    console.log('userinfo',userInfo)

    const toSign = () => {
        window.location.href = "/sign"
    }

    const toHome = () => {
        window.location.href = "/"
    }

    const toggleMenu = () => {
        open ? setOpen(false) : setOpen(true);
    }
    return (
        <div className="flex items-center dark:bg-main-dark-bg text-black dark:text-white bg-[rgba(0,0,0,0.5)] w-[100vw] px-[40px] h-[60px] justify-between">
            <div className='flex items-center font-bold'>
                <div onClick={toHome} className="cursor-pointer font-bold text-xl text-white mr-[15px]">GAM<span className="text-orange-500">E</span></div>
            </div>
            <div className="w-[400px] relative" onClick={() => setSearchShow(true)}>
                <div className="w-full leading-[33px] pl-[20px] hover:opacity-50 text-orange-500 rounded-full border-orange-500 border-1 h-[35px]">
                    search game
                </div>
                {/* <AiOutlineSearch className="absolute right-[10px] top-[50%] translate-y-[-50%]" size={20} color="#fa7320"/> */}
            </div>
            <div className="flex h-full items-center">
                {/* <Button icon={}>Search</Button> */}
                {userInfo && userInfo.username ?
                    <Dropdown overlay={MenuList} trigger="click" onOpenChange={toggleMenu} placement="bottom" open={open} arrow={{ pointAtCenter: true }}>
                        <Avatar src={userInfo.avatar} />
                    </Dropdown>
                    : <Space>
                        <Button onClick={toSign} type="primary">login / register</Button>
                    </Space>}
            </div>
            {/* search */}
            {searchShow && <SearchPanel/>}
        </div>
    )
}

export default NavBar