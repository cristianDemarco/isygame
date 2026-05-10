import { createContext, useState, useContext, type ReactNode } from "react";

interface AuthContext {
    token: string | null;
    userInfo: object;
    login: (newToken: string) => void;
    logout: () => void;
    storeUserInfo: (newNickname: string, newEmail: string) => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({children}:{children: ReactNode}){
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({
        nickname: localStorage.getItem("nickname"),
        email: localStorage.getItem("email")
    });

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    }

    const logout = () => {
        setToken(null);
        localStorage.clear();
    }

    const storeUserInfo = (newNickname: string, newEmail: string) => {
        setUserInfo({nickname: newNickname, email: newEmail});
        localStorage.setItem("nickname", newNickname);
        localStorage.setItem("email", newEmail);
    }

    return (
        <AuthContext.Provider value={{token, userInfo, login, logout, storeUserInfo}}>
            {children}
        </AuthContext.Provider> 
    );
}

export function useAuth(){
        const context = useContext(AuthContext);
        if(!context) throw new Error ("use Auth must be used within an AuthProvider");
        return context;
}