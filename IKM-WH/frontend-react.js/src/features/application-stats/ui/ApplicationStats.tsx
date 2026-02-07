import style from './ApplicationStats.module.css';

interface ApplicationStatsProps {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

export const ApplicationStats = ({ total, pending, approved, rejected }: ApplicationStatsProps) => {
  return (
    <div className={style.statsGrid}>
      <div className={style.statCard}>
        <h3>Всего заявок</h3>
        <span className={style.statNumber}>{total}</span>
      </div>
      <div className={style.statCard}>
        <h3>На рассмотрении</h3>
        <span className={style.statNumber}>{pending}</span>
      </div>
      <div className={style.statCard}>
        <h3>Одобрено</h3>
        <span className={style.statNumber}>{approved}</span>
      </div>
      <div className={style.statCard}>
        <h3>Отклонено</h3>
        <span className={style.statNumber}>{rejected}</span>
      </div>
    </div>
  );
};
