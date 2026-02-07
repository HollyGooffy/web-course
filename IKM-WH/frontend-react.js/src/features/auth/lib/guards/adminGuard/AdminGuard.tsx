import type {AdminGuardProps} from "./adminGuard-props";
import {Navigate} from "react-router-dom";
import {AuthGuard} from "@features/auth/lib/guards/authGuard";
import {useAuth} from "@features/auth/lib/hooks";

export const AdminGuard: React.FC<AdminGuardProps> = ({children}) => {
    const {user} = useAuth()

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" replace/>
    }

    return <AuthGuard>{children}</AuthGuard>
}