import style from "./AdminLoginForm.module.css";
import { LoginForm } from "@features/auth/components/LoginForm";
import { useNavigation } from "@shared/hooks/useNavigation";

export const AdminLoginForm = () => {
    const { goToAdminDashboard } = useNavigation();

    const handleLoginSuccess = () => {
        goToAdminDashboard();
    };

    return (
        <div className={style.formCard}>
            <div className={style.header}>
                <h1>Welcome Back</h1>
                <p>Sign in to your studio</p>
            </div>

            <div className={style.form}>
                <LoginForm onSuccess={handleLoginSuccess} />
            </div>
        </div>
    )
}