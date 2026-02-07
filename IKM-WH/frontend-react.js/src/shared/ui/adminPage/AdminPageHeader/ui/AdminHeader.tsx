import {AdminHeaderProps} from "./AdminHeader-props.ts";
import style from './AdminHeader.module.css'

export const AdminHeader: React.FC<AdminHeaderProps> = ({title, description, actions, children, maxWidth = '1200px'}) => {
    return (
        <div className={style.adminPage} style={{ maxWidth }}>
            <div className={style.header}>
                <div className={style.titleSection}>
                    <h1>{title}</h1>
                    {description && <p>{description}</p>}
                </div>
                {actions && <div className={style.actions}>{actions}</div>}
            </div>

            {/* Content */}
            <div className={style.content}>
                {children}
            </div>
        </div>
    );
}