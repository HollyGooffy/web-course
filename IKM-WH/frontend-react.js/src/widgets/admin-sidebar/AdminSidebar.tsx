import style from './AdminSidebar.module.css';
import { AdminSidebarProps } from "./index.ts";
import { useAuth } from '@features/auth/lib/hooks/useAuth';
import { useNavigation } from '@shared/hooks/useNavigation';
import { useApplications } from '@shared/hooks/useApplications';
import { 
  SidebarHeader, 
  SidebarNavigation, 
  SidebarFooter, 
  MobileMenuButton 
} from './components';
import { useSidebarState } from './hooks';
import { createMenuItems } from './config/menuItems';

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ onToggle }) => {
  const { user, logout } = useAuth();
  const { goToAdminSection } = useNavigation();
  const { applications } = useApplications();

  const {
    isCollapsed,
    isMobileOpen,
    isMobile,
    handleToggle,
    handleOverlayClick,
    handleNavClick,
    setIsMobileOpen,
  } = useSidebarState(onToggle);

  const pendingApplicationsCount = applications.filter(app => app.status === 'pending').length;
  const menuItems = createMenuItems(pendingApplicationsCount);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      window.location.href = '/admin-login';
    }
  };

  const userName = user?.name || user?.email?.split('@')[0];

  return (
    <>
      {isMobile && (
        <MobileMenuButton onClick={() => setIsMobileOpen(true)} />
      )}

      {isMobile && isMobileOpen && (
        <div
          className={style.overlay}
          onClick={handleOverlayClick}
        />
      )}

      <div
        className={`
          ${style.sidebar} 
          ${isCollapsed ? style.collapsed : ''}
          ${isMobile ? style.mobile : ''}
          ${isMobileOpen ? style.mobileOpen : ''}
        `}
      >
        <SidebarHeader
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onToggle={handleToggle}
        />

        <SidebarNavigation
          menuItems={menuItems}
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onNavClick={handleNavClick(goToAdminSection)}
        />

        <SidebarFooter
          userName={userName}
          isCollapsed={isCollapsed}
          isMobile={isMobile}
          onLogout={handleLogout}
        />
      </div>
    </>
  );
};
