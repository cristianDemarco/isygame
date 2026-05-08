import { createContext, useState, useContext, type ReactNode } from "react";

interface AuthContext {
    token: string | null;
    login: (newToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({children}:{children: ReactNode}){
    const [token, setToken] = useState(localStorage.getItem("token"));

    const login = (newToken: string) => {
        setToken(newToken);
        localStorage.setItem("token", newToken);
    }

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    }

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider> 
    );
}

export function useAuth(){
        const context = useContext(AuthContext);
        if(!context) throw new Error ("use Auth must be used within an AuthProvider");
        return context;
}