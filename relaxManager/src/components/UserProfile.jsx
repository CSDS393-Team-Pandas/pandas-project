import React,{useState} from 'react';
import { MdOutlineCancel } from 'react-icons/md';
import { useSelector } from 'react-redux'
import { getAdminInfo } from '../redux/feature/adminSlice';
import { Button } from '.';
import { Button as AiButton } from 'antd';
import { dropUser } from '../utils/storage';
import { useStateContext } from '../contexts/ContextProvider';

const UserProfile = ({ visible }) => {
  const [show,setShow] = useState(visible || false)
  const { avatar, nickname } = useSelector(getAdminInfo);
  const { currentColor } = useStateContext();
  const signOut = () => {
    dropUser();
    window.location.href = "/"
  }

  return (
   <div className="nav-item absolute shadow-md right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-[250px]">
        <div className="flex justify-between items-center">
          <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
          <Button
            icon={<MdOutlineCancel />}
            color="rgb(153, 171, 180)"
            bgHoverColor="light-gray"
            size="2xl"
            borderRadius="50%"
          />
        </div>
        <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
          <div>
            <p className="font-semibold text-xl dark:text-gray-200">{nickname} </p>
            <p className="text-gray-500 text-sm dark:text-gray-400"> super admin  </p>
          </div>
        </div>
        <div className="mt-5 w-full">
          <AiButton type='primary' onClick={signOut} block>log out</AiButton>
        </div>
    </div>
  );
};

export default UserProfile;
