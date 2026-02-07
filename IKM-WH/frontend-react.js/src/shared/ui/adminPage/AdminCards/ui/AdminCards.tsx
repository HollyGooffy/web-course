import {AdminCardProps} from "./adminCards-props.ts";
import style from './AdminCards.module.css'

export const AdminCards: React.FC<AdminCardProps> = ({
                                                        children,
                                                        className = '',
                                                        padding = 'medium',
                                                        hover = false,
                                                        onClick
                                                    }) => {
    const paddingClass = style[`padding-${padding}`];
    const hoverClass = hover ? style.hover : '';
    const clickableClass = onClick ? style.clickable : '';

    return (
        <div
            className={`${style.adminCard} ${paddingClass} ${hoverClass} ${clickableClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};