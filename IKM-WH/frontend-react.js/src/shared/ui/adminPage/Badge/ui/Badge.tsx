import style from './Badge.module.css'
import { BadgeProps } from "@shared/ui/adminPage/Badge/ui/badge-props.ts";

export const Badge: React.FC<BadgeProps> = ({
                                                children,
                                                variant,
                                                className = ''
                                            }) => {
    const badgeClass = `${style.badge} ${style[variant]} ${className}`.trim();

    return (
        <div className={badgeClass}>
            {children}
        </div>
    )
}