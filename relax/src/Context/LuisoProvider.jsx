import React, { useState } from 'react'
import { createContext, useContext } from 'react'
import { notification } from 'antd';

const Context = createContext();
export const useLuisoContext = () => useContext(Context);

const LuisoProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [cartShow,setCartShow] = useState(false);
    const [searchShow,setSearchShow] = useState(false);
    const notify = (title, desc, type = 0) => {
        switch (type) {
            case 0:
                notification.info({
                    message: title,
                    description: desc,
                    className: 'custom-class',
                    style: {
                        width: 600,
                    },
                });
                break;
            case 1:
                notification.success({
                    message: title,
                    description: desc,
                    className: 'custom-class',
                    style: {
                        width: 600,
                    },
                });
                break;
            case 2:
                notification.error({
                    message: title,
                    description: desc,
                    className: 'custom-class',
                    style: {
                        width: 600,
                    },
                });
                break;
            default: 
                notification.open({
                    message: title,
                    description: desc,
                    className: 'custom-class',
                    style: {
                        width: 600,
                    },
                });
                break;
        }
    };
    const toggleTheme = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light')
    }
    return (
        <Context.Provider value={{
            theme,
            notify,
            toggleTheme,
            cartShow,
            setCartShow,searchShow,
            setSearchShow
        }}>{children}</Context.Provider>
    )
}

export default LuisoProvider