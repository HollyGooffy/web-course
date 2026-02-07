import { Check, X, Eye } from 'lucide-react';
import { Badge } from "@shared/ui/adminPage";
import { Application } from '@shared/api/endpoints/applications.endpoints';
import style from './ApplicationTable.module.css';

interface ApplicationTableProps {
  applications: Application[];
  onViewDetails: (app: Application) => void;
  onStatusUpdate: (id: string, status: 'approved' | 'rejected') => void;
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

export const ApplicationTable = ({ 
  applications, 
  onViewDetails, 
  onStatusUpdate 
}: ApplicationTableProps) => {
  return (
    <div className={style.tableContainer}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Группа</th>
            <th>Контакты</th>
            <th>Жанр</th>
            <th>Дата подачи</th>
            <th>Статус</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {applications.length === 0 ? (
            <tr>
              <td colSpan={6} className={style.emptyState}>
                Заявки не найдены
              </td>
            </tr>
          ) : (
            applications.map((app) => (
              <tr key={app.id}>
                <td>
                  <div className={style.groupInfo}>
                    <div className={style.groupAvatar}>
                      {app.groupName.charAt(0)}
                    </div>
                    <div>
                      <div>{app.groupName}</div>
                      <small className={style.memberCount}>
                        {app.members?.length || 0} участников
                      </small>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div>{app.contactTelegram}</div>
                    <small className={style.contactPhone}>{app.contactPhone}</small>
                  </div>
                </td>
                <td>{app.genre || 'Не указан'}</td>
                <td>{new Date(app.submittedAt).toLocaleDateString('ru-RU')}</td>
                <td>
                  <Badge variant={getStatusVariant(app.status)}>
                    {getStatusText(app.status)}
                  </Badge>
                </td>
                <td>
                  <div className={style.actions}>
                    <button 
                      className={style.actionBtn}
                      onClick={() => onViewDetails(app)}
                      title="Подробнее"
                    >
                      <Eye size={16} />
                    </button>
                    {app.status === 'pending' && (
                      <>
                        <button 
                          className={`${style.actionBtn} ${style.approve}`}
                          onClick={() => onStatusUpdate(app.id, 'approved')}
                          title="Одобрить"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          className={`${style.actionBtn} ${style.reject}`}
                          onClick={() => onStatusUpdate(app.id, 'rejected')}
                          title="Отклонить"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};
