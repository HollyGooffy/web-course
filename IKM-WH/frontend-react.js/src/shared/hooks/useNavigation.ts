import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@shared/constants/routes';

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToHome = () => navigate(ROUTES.HOME);
  const goToAdminLogin = () => navigate(ROUTES.ADMIN_LOGIN);
  const goToAdminDashboard = () => navigate(ROUTES.ADMIN.DASHBOARD);
  const goToAdminGroups = () => navigate(ROUTES.ADMIN.GROUPS);
  const goToAdminApplications = () => navigate(ROUTES.ADMIN.APPLICATIONS);
  const goToAdminMerch = () => navigate(ROUTES.ADMIN.MERCH);
  const goToAdminCards = () => navigate(ROUTES.ADMIN.CARDS);
  const goToAdminPoster = () => navigate(ROUTES.ADMIN.POSTER);
  const goToAdminStats = () => navigate(ROUTES.ADMIN.STATS);

  const goToAdminSection = (section: string) => {
    navigate(`/admin/${section}`);
  };

  return {
    navigate,
    goToHome,
    goToAdminLogin,
    goToAdminDashboard,
    goToAdminGroups,
    goToAdminApplications,
    goToAdminMerch,
    goToAdminCards,
    goToAdminPoster,
    goToAdminStats,
    goToAdminSection,
  };
};