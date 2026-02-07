import style from "./Label.module.css";
import {LabelProps} from "@shared/ui/label/ui/label-props.ts";

export const Label = ({children, htmlFor}: LabelProps) => {
    return (
        <label htmlFor={htmlFor} className={style.Label}>{children}</label>
    )
}