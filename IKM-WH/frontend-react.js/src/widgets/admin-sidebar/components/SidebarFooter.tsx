import { UserCheck, LogOut } from 'lucide-react';
import style from '../AdminSidebar.module.css';

interface SidebarFooterProps {
  userName?: string;
  isCollapsed: boolean;
  isMobile: boolean;
  onLogout: () => void;
}

export const SidebarFooter: React.FC<SidebarFooterProps> = ({
  userName,
  isCollapsed,
  isMobile,
  onLogout,
}) => {
  return (
    <div className={style.footer}>
      <div className={style.userInfo}>
        {(!isCollapsed || isMobile) && (
          <>
            <div className={style.avatar}>
              <UserCheck size={20} />
            </div>
            <div className={style.userDetails}>
              <span className={style.userName}>
                {userName || 'Админ'}
              </span>
              <span className={style.userRole}>Администратор</span>
            </div>
          </>
        )}
        {(isCollapsed && !isMobile) && (
          <div className={style.avatar}>
            <UserCheck size={20} />
          </div>
        )}
      </div>

      <button 
        className={style.logoutButton} 
        onClick={onLogout}
        title="Выйти"
      >
        <LogOut size={18} />
        {(!isCollapsed || isMobile) && <span>Выход</span>}
      </button>
    </div>
  );
};