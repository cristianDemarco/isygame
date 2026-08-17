import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface Props {
    children: React.ReactNode,
    requiredRole?: string
}

const ProtectedRoute = ({children, requiredRole}: Props) => {
    const {accessToken, user} = useAuth();

    if(!accessToken){
        return <Navigate to="/login" replace />;
    }

    if(requiredRole && !user.roles?.includes(requiredRole)){
        return <Navigate to="/home" replace />;
    }

    return <>{children}</>;
}

export default ProtectedRoute;