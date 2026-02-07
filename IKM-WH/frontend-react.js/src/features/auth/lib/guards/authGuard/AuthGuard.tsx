import {AuthGuardProps} from "./authGuard-props.ts";
import {useLocation} from "react-router";
import {Navigate} from "react-router-dom";
import {useAuth} from "@features/auth/lib/hooks";

export const AuthGuard: React.FC<AuthGuardProps> = ({children, fallback = '/login'}) => {
    const {isAuthenticated, isLoading} =  useAuth();

    const location = useLocation();

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate  to={fallback} state={{ from : location}} replace />
    }

    return <>{children}</>;
}