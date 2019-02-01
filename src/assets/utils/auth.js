
function getToken(token) {
    return sessionStorage.getItem(token);
}

function setToken(key, value) {
    sessionStorage.setItem(key, value);
}


function getRouters() {
    return JSON.parse(sessionStorage.getItem('routers'));
}
function setRouters(routers) {
    sessionStorage.setItem('routers', JSON.stringify(routers));
}



export {
    getToken,
    setToken,
    setRouters,
    getRouters
}