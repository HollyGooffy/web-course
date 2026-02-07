import { Label } from "@shared/ui/label";
import { UseFormRegister, FieldError } from "react-hook-form";
import { ApplicationFormData } from "@entities/application";
import style from '../ApplyForm.module.css';

interface TextAreaFieldProps {
    id: keyof ApplicationFormData;
    label: string;
    placeholder: string;
    rows?: number;
    register: UseFormRegister<ApplicationFormData>;
    error?: FieldError;
}

export const TextAreaField = ({ 
    id, 
    label, 
    placeholder, 
    rows = 4, 
    register, 
    error 
}: TextAreaFieldProps) => {
    return (
        <div className={style.formGroup}>
            <Label htmlFor={id}>{label}</Label>
            <textarea
                id={id}
                placeholder={placeholder}
                {...register(id)}
                rows={rows}
                style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                }}
            />
            {error && (
                <span className={style.error}>{error.message}</span>
            )}
        </div>
    );
};