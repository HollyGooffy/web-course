import style from './AdminLogin.module.css';
import {AdminLoginForm} from "@pages/admin-login/ui/form";
import {MusicElement} from "@pages/admin-login/ui/musicElement";
import {LoginLogo} from "@pages/admin-login/ui/logo/LoginLogo.tsx";
import {Container} from "@shared/ui/container";
import {Background} from "@pages/admin-login/ui/background";

export const AdminLogin = () => {

    return (
        <div className={style.loginPage}>
            <Background/>
            <Container className={style.container}>
                <LoginLogo/>
                <AdminLoginForm />
                <MusicElement/>
            </Container>
        </div>
    );
};