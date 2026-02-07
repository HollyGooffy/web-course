import style from './AdminBtn.module.css'
import {AdminBtnProps} from "@shared/ui/adminPage/AdminBtn/ui/adminBtn-props.ts";

export const AdminBtn: React.FC<AdminBtnProps> = ({
                                                      children,
                                                      className = '',
                                                      variant = "secondary",
                                                      disabled = false,
                                                      type = 'button',
                                                      onClick,
                                                  }) => {
    const getButtonClass = () => {
        const baseClass = style.btn;
        const variantClass = style[variant] || '';
        return `${baseClass} ${variantClass} ${className}`.trim();
    }

    return (
        <button className={getButtonClass()}
                type={type}
                disabled={disabled}
                onClick={onClick}
        >
            {children}
        </button>
    )
}