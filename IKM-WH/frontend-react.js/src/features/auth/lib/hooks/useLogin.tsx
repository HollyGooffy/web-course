import {useState} from "react";
import {useAuth} from "@features/auth/lib/hooks/useAuth.tsx";
import {LoginCredentials} from "@features/auth/model/types";

export const useLogin = () => {
    const { login, error, clearError, isLoading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleLogin = async (credentials: LoginCredentials) => {
        setIsSubmitting(true);
        try {
            await login(credentials);
            return true;
        } catch {
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        login: handleLogin,
        error,
        clearError,
        isLoading: isLoading || isSubmitting,
    };
}