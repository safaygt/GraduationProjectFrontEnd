import { jwtDecode } from 'jwt-decode';

let logoutTimer = null;
const authEventEmitter = new EventTarget();


// Token'ı localStorage'dan alır.
const getToken = () => localStorage.getItem('token');

// Token'ı localStorage'a kaydeder ve otomatik çıkış zamanlayıcısını ayarlar.

const setToken = (token) => {
    localStorage.setItem('token', token);
    _clearAutoLogout();
    _scheduleAutoLogout();
    authEventEmitter.dispatchEvent(new Event('authChange')); // Giriş yapıldığında olay tetikle
};

const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    _clearAutoLogout();
    authEventEmitter.dispatchEvent(new Event('authChange')); // Çıkış yapıldığında olay tetikle
};

const logout = () => {
    removeToken();
};

const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;
    try {
        const { exp } = jwtDecode(token); // jwt-decode kullanarak exp değerini al
        // Token'ın süresi dolmak üzereyse veya dolmuşsa true döndür
        return exp * 1000 < Date.now();
    } catch {
        return true; // Hata durumunda token'ı geçersiz say
    }
};

// Otomatik çıkış zamanlayıcısını temizler.
function _clearAutoLogout() {
    if (logoutTimer) {
        clearTimeout(logoutTimer);
        logoutTimer = null;
    }
}

// Token süresinin dolmasına kalan süreye göre otomatik çıkış zamanlayıcısı kurar.
function _scheduleAutoLogout() {
    const token = getToken();
    if (!token) return;

    let exp;
    try {
        ({ exp } = jwtDecode(token)); // jwt-decode kullanarak exp değerini al
    } catch {
        return logout(); // Token parse hatası varsa hemen logout yap
    }

    const expireAt = exp * 1000; // Token bitiş zamanı (milisaniye cinsinden)
    const delay = expireAt - Date.now(); // Token bitişine kalan süre

    if (delay <= 0) {
        // Zaten süresi dolmuşsa anında logout yap
        logout();
    } else {
        logoutTimer = setTimeout(() => {
            logout(); // Süre dolduğunda logout yap
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