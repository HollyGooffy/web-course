import {SectionTitleProps} from "@shared/ui/sectionTitle/ui/SectionTitle-props.ts";
import style from "./SectionTitle.module.css";

export const SectionTitle : React.FC<SectionTitleProps> = ({
    children,
    className = ''}) => {
    return (
        <h2 className={`${style.sectionTitle} ${className}`}>
            {children}
        </h2>
    )
}