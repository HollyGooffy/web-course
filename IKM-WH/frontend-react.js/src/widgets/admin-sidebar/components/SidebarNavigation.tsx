import { useLocation } from 'react-router-dom';
import style from '../AdminSidebar.module.css';
import { MenuItemProps } from '../index';

interface SidebarNavigationProps {
  menuItems: MenuItemProps[];
  isCollapsed: boolean;
  isMobile: boolean;
  onNavClick: (path: string) => void;
}

export const SidebarNavigation: React.FC<SidebarNavigationProps> = ({
  menuItems,
  isCollapsed,
  isMobile,
  onNavClick,
}) => {
  const location = useLocation();

  return (
    <nav className={style.navigation}>
      {menuItems.map((item) => {
        const isActive = location.pathname === `/admin/${item.path}`;
        
        return (
          <button
            key={item.path}
            onClick={() => onNavClick(item.path)}
            className={`${style.navItem} ${isActive ? style.active : ''}`}
          >
            <div className={style.navIcon}>
              {item.icon}
            </div>
            {(!isCollapsed || isMobile) && (
              <span className={style.navLabel}>{item.label}</span>
            )}
            {item.badge && (!isCollapsed || isMobile) && (
              <span className={style.badge}>{item.badge}</span>
            )}
            {item.badge && isCollapsed && !isMobile && (
              <span className={style.badgeCollapsed}>{item.badge}</span>
            )}
          </button>
        );
      })}
    </nav>
  );
};