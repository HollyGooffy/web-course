import { Music, ChevronLeft, ChevronRight, X } from 'lucide-react';
import style from '../AdminSidebar.module.css';

interface SidebarHeaderProps {
  isCollapsed: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({
  isCollapsed,
  isMobile,
  onToggle,
}) => {
  return (
    <div className={style.header}>
      <div className={style.logo}>
        <div className={style.logoIcon}>
          <Music size={24} />
        </div>
        {(!isCollapsed || isMobile) && (
          <span className={style.logoText}>WH Admin</span>
        )}
      </div>

      <button
        className={style.collapseButton}
        onClick={onToggle}
      >
        {isMobile ? (
          <X size={20} />
        ) : isCollapsed ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>
    </div>
  );
};