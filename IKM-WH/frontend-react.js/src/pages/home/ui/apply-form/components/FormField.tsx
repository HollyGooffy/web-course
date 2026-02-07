import { Label } from "@shared/ui/label";
import { Input } from "@shared/ui/input";
import { UseFormRegister, FieldError } from "react-hook-form";
import { ApplicationFormData } from "@entities/application";
import style from '../ApplyForm.module.css';

interface FormFieldProps {
    id: keyof ApplicationFormData;
    label: string;
    placeholder: string;
    type?: string;
    register: UseFormRegister<ApplicationFormData>;
    error?: FieldError;
    helpText?: string;
}

export const FormField = ({ 
    id, 
    label, 
    placeholder, 
    type = "text", 
    register, 
    error, 
    helpText 
}: FormFieldProps) => {
    return (
        <div className={style.formGroup}>
            <Label htmlFor={id}>{label}</Label>
            <Input
                id={id}
                type={type}
                placeholder={placeholder}
                {...register(id)}
            />
            {helpText && (
                <small style={{ color: '#666', fontSize: '12px' }}>
                    {helpText}
                </small>
            )}
            {error && (
                <span className={style.error}>{error.message}</span>
            )}
        </div>
    );
};