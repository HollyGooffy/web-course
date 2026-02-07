import { Package } from 'lucide-react';
import style from '../ui/FestivalsModal.module.css';

export const FestivalsEmptyState: React.FC = () => {
  return (
    <div className={style.emptyState}>
      <Package size={48} />
      <h3>Пока нет доступных наборов</h3>
      <p>Следите за обновлениями, скоро появятся новые коллекционные карточки!</p>
    </div>
  );
};