import { AdminSelect } from "@shared/ui/adminPage";
import { SearchInput } from "@shared/ui";
import style from './ApplicationFilters.module.css';

interface ApplicationFiltersProps {
  searchTerm: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export const ApplicationFilters = ({
  searchTerm,
  statusFilter,
  onSearchChange,
  onStatusChange
}: ApplicationFiltersProps) => {
  return (
    <div className={style.controls}>
      <SearchInput
        value={searchTerm}
        onChange={onSearchChange}
        placeholder="Поиск по названию группы, Telegram или телефону..."
      />
      <div className={style.filters}>
        <AdminSelect value={statusFilter} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="">Все статусы</option>
          <option value="pending">На рассмотрении</option>
          <option value="approved">Одобрено</option>
          <option value="rejected">Отклонено</option>
        </AdminSelect>
      </div>
    </div>
  );
};
