const USER = "LUISOUSER"

export const storeUser = (info) => {
    if(typeof info !== 'object')
        return;
    localStorage.setItem(USER,JSON.stringify(info));
}

export const getUser = () => {
    const info = localStorage.getItem(USER);
    if(!info)
        return {};
    return JSON.parse(info);
} 

export const getToken = () => {
    const info = localStorage.getItem(USER);
    if(!info)
        return '';
    return JSON.parse(info).token || false;
}

export const dropUser = () => {
    localStorage.removeItem(USER)
}