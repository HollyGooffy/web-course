import { ApplicationSubmitStatus } from "@entities/application";
import style from '../ApplyForm.module.css';

interface StatusMessageProps {
    status: ApplicationSubmitStatus;
}

export const StatusMessage = ({ status }: StatusMessageProps) => {
    if (!status.type) return null;

    return (
        <div 
            className={style.statusMessage}
            style={{
                padding: '12px 16px',
                borderRadius: '4px',
                marginBottom: '20px',
                backgroundColor: status.type === 'success' ? '#d4edda' : '#f8d7da',
                color: status.type === 'success' ? '#155724' : '#721c24',
                border: `1px solid ${status.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`
            }}
        >
            {status.message}
        </div>
    );
};