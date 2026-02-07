import { PerformersSectionProps } from '../model/types';
import style from '../ui/EventModal.module.css';

export const PerformersSection = ({ performersText, error, onPerformersChange }: PerformersSectionProps) => {
    return (
        <div className={style.formGroup}>
            <label>Исполнители</label>
            <textarea
                className={style.textarea}
                placeholder="Введите исполнителей (каждый с новой строки)"
                value={performersText}
                onChange={(e) => onPerformersChange(e.target.value)}
                rows={4}
            />
            {error && <span className={style.error}>{error}</span>}
        </div>
    );
};