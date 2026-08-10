import { createContext, useState, useContext, type ReactNode } from "react";
import { sendRequest } from "../hooks/useApi";
import { ApiMethod } from "../types/ApiMethod";
import { endpoints } from "../utils/endpoints";

interface AuthContextType {
    accessToken: string | null;
    refreshToken: string | null;
    userInfo: { nickname: string | null; email: string | null };
    cartIds: Set<number>;
    login: (newAccessToken: string, newRefreshToken: string) => void;
    logout: () => void;
    storeUserInfo: (newNickname: string, newEmail: string) => void;
    initCartIds: (ids: number[]) => void;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
    handleRefreshToken: () => Promise<string>;
    sendAuthRequest: (method: ApiMethod, path: string, body?:any) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));
    const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));
    const [userInfo, setUserInfo] = useState({
        nickname: localStorage.getItem("nickname"),
        email: localStorage.getItem("email")
    });
    const [cartIds, setCartIds] = useState<Set<number>>(new Set());

    const setTokens = (newAccessToken: string, newRefreshToken: string) => {
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        setAccessToken(newAccessToken);
        setRefreshToken(newRefreshToken);
    }

    const login = (newAccessToken: string, newRefreshToken: string) => {
        setTokens(newAccessToken, newRefreshToken)
    }

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setCartIds(new Set());
        localStorage.clear();
    }

    const storeUserInfo = (newNickname: string, newEmail: string) => {
        setUserInfo({ nickname: newNickname, email: newEmail });
        localStorage.setItem("nickname", newNickname);
        localStorage.setItem("email", newEmail);
    }

    const initCartIds = (ids: number[]) => {
        setCartIds(new Set(ids));
    }

    const addToCart = (id: number) => {
        setCartIds(new Set([...cartIds, id]));
    }

    const removeFromCart = (id: number) => {
        const newSet = new Set(cartIds);
        newSet.delete(id);
        setCartIds(newSet);
    }

    const handleRefreshToken = async () => {
        const response = await sendRequest(
            ApiMethod.POST,
            endpoints.auth.refresh,
            {"refreshToken": refreshToken}
        )

        const data = await response.json();
        setTokens(data.accessToken, data.refreshToken);
        
        return data.accessToken;
    }

    const sendAuthRequest = async (
        method: ApiMethod,
        path: string,
        body?:any
    ) => {
        try {
            return await sendRequest(method, path, body, accessToken ? accessToken : localStorage.getItem("accessToken"))
        } catch (e: any) {
            if(e?.status === 401){
                let newAccessToken: string;
                try {
                    newAccessToken = await handleRefreshToken();
                } catch(e){
                    logout();   
                    throw e;
                }

                return await sendRequest(method, path, body, newAccessToken);
            }

            throw e;
        }
    }

    return (
        <AuthContext.Provider value={{accessToken, refreshToken, userInfo, cartIds, login, logout, storeUserInfo, initCartIds, addToCart, removeFromCart, handleRefreshToken, sendAuthRequest}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}