export function authHeader() {
    const getToken: any = localStorage.getItem("loginToken");
    if (getToken) {
        return { Authorization: `Bearer ${getToken}` };
    } else {
        return {};
    }
}

export function LoginHeader() {
    const getToken: any = localStorage.getItem("loginToken");
    const authToken: any = localStorage.getItem("authToken");

    if (getToken) {
        return { logintoken: `${getToken}`, Authorization: `Bearer ${authToken}` };
    } else {
        return {};
    }
}

export const isAuthenticated = () => {
    const getToken: any = localStorage.getItem("loginToken");
    if (getToken) {
        return true
    }
    return false
}

// export const isAuthenticated = false;