import { createContext, useState, useContext, type ReactNode } from "react";

interface AuthContextType {
    token: string | null;
    userInfo: { nickname: string | null; email: string | null };
    cartIds: Set<number>;
    login: (newToken: string) => void;
    logout: () => void;
    storeUserInfo: (newNickname: string, newEmail: string) => void;
    initCartIds: (ids: number[]) => void;
    addToCart: (id: number) => void;
    removeFromCart: (id: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [userInfo, setUserInfo] = useState({
        nickname: localStorage.getItem("nickname"),
        email: localStorage.getItem("email")
    });
    const [cartIds, setCartIds] = useState<Set<number>>(new Set());

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    }

    const logout = () => {
        setToken(null);
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

    return (
        <AuthContext.Provider value={{ token, userInfo, cartIds, login, logout, storeUserInfo, initCartIds, addToCart, removeFromCart }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
}