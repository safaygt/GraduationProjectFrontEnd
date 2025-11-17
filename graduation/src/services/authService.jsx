import { jwtDecode } from 'jwt-decode';

let logoutTimer = null;
const authEventEmitter = new EventTarget();


const getToken = () => localStorage.getItem('token');


const setToken = (token) => {
    localStorage.setItem('token', token);
    _clearAutoLogout();
    _scheduleAutoLogout();
    authEventEmitter.dispatchEvent(new Event('authChange')); 
};

const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    _clearAutoLogout();
    authEventEmitter.dispatchEvent(new Event('authChange')); 
};

const logout = () => {
    removeToken();
};

const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;
    try {
        const { exp } = jwtDecode(token); 
        
        return exp * 1000 < Date.now();
    } catch {
        return true; 
    }
};

function _clearAutoLogout() {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
    }
}

function _scheduleAutoLogout() {
    const token = getToken();
    if (!token) return;

    let exp;
    try {
        ({ exp } = jwtDecode(token));
    } catch {
        return logout(); 
    }

    const expireAt = exp * 1000; 
    const delay = expireAt - Date.now(); 

    if (delay <= 0) {
        
        logout();
    } else {
        logoutTimer = setTimeout(() => {
            logout(); 
        }, delay);
    }
}

const initAuth = () => {
    const token = getToken();
    if (!token) return;

    if (isTokenExpired()) {
        logout();
    } else {
        _scheduleAutoLogout();
    }
};

const getUser = () => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
};


const getRole = () => {
    const token = getToken();
    if (!token) return null;
    try {
        const decodedToken = jwtDecode(token);

        return decodedToken.role || null;
    } catch {
        return null;
    }
};

const AuthService = {
    getToken,
    setToken,
    removeToken,
    logout,
    isTokenExpired,
    getUser,
    getRole,
    initAuth,
    authEventEmitter,
};

export default AuthService;