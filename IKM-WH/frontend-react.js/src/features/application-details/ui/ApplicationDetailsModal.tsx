import { Badge } from "@shared/ui/adminPage";
import { X } from 'lucide-react';
import { createPortal } from 'react-dom';
import { Application } from '@shared/api/endpoints/applications.endpoints';
import style from './ApplicationDetailsModal.module.css';

interface ApplicationDetailsModalProps {
  application: Application;
  onClose: () => void;
  onApprove?: () => void;
  onReject?: () => void;
}

const getStatusVariant = (status: string): 'active' | 'inactive' | 'soon' => {
  switch (status) {
    case 'approved': return 'active';
    case 'rejected': return 'inactive';
    case 'pending': return 'soon';
    default: return 'inactive';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'На рассмотрении';
    case 'approved': return 'Одобрено';
    case 'rejected': return 'Отклонено';
    default: return status;
  }
};

export const ApplicationDetailsModal = ({ 
  application, 
  onClose, 
  onApprove, 
  onReject 
}: ApplicationDetailsModalProps) => {
  const modalContent = (
    <div className={style.modalOverlay} onClick={onClose}>
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={style.modalHeader}>
          <h2>Заявка от группы "{application.groupName}"</h2>
          <button className={style.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>
        
        <div className={style.modalBody}>
          <div className={style.formGroup}>
            <label>Telegram:</label>
            <div className={style.fieldValue}>{application.contactTelegram}</div>
          </div>
          
          <div className={style.formGroup}>
            <label>Телефон:</label>
            <div className={style.fieldValue}>{application.contactPhone}</div>
          </div>
          
          <div className={style.formGroup}>
            <label>Жанр:</label>
            <div className={style.fieldValue}>{application.genre || 'Не указан'}</div>
          </div>
          
          {application.description && (
            <div className={style.formGroup}>
              <label>Описание:</label>
              <div className={style.fieldValue}>{application.description}</div>
            </div>
          )}
          
          {application.members && application.members.length > 0 && (
            <div className={style.formGroup}>
              <label>Участники:</label>
              <ul className={style.membersList}>
                {application.members.map((member: string, index: number) => (
                  <li key={index}>{member}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className={style.formGroup}>
            <label>Дата подачи:</label>
            <div className={style.fieldValue}>{new Date(application.submittedAt).toLocaleString('ru-RU')}</div>
          </div>
          
          <div className={style.formGroup}>
            <label>Статус:</label>
            <div className={style.fieldValue}>
              <Badge variant={getStatusVariant(application.status)}>
                {getStatusText(application.status)}
              </Badge>
            </div>
          </div>
        </div>

        <div className={style.modalFooter}>
          {application.status === 'pending' && onApprove && onReject && (
            <>
              <button onClick={onApprove} className={style.btnApprove}>
                Одобрить
              </button>
              <button onClick={onReject} className={style.btnReject}>
                Отклонить
              </button>
            </>
          )}
          <button onClick={onClose} className={style.btnClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
