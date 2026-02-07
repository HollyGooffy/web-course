import { Users, Calendar, Music, Package, CreditCard, TrendingUp, Star, Clock } from 'lucide-react';
import { Grid } from '@shared/ui/adminPage';
import { StatCard } from './StatCard';
import { DashboardStats } from '@shared/api/endpoints/stats.endpoints';

interface StatsListProps {
  stats: DashboardStats | null;
}

export const StatsList: React.FC<StatsListProps> = ({ stats }) => {
  const statsData = [
    {
      title: 'Всего групп',
      value: stats?.totalGroups?.toString() || '0',
      change: stats?.totalGroups ? `${stats.totalGroups} активных` : 'Нет данных',
      icon: Users,
      color: '#667eea'
    },
    {
      title: 'Всего событий',
      value: stats?.totalEvents?.toString() || '0',
      change: stats?.upcomingEvents ? `${stats.upcomingEvents} предстоящих` : 'Нет данных',
      icon: Calendar,
      color: '#38a169'
    },
    {
      title: 'Активных заявок',
      value: stats?.pendingApplications?.toString() || '0',
      change: stats?.totalApplications ? `${stats.totalApplications} всего` : 'Нет данных',
      icon: Music,
      color: '#e07a65'
    },
    {
      title: 'Позиций мерча',
      value: stats?.totalMerch?.toString() || '0',
      change: stats?.totalMerch ? `${stats.totalMerch} доступно` : 'Нет данных',
      icon: Package,
      color: '#9ecce6'
    },
    {
      title: 'Продажи карточек',
      value: 'Coming Soon',
      change: 'Функция в разработке',
      icon: CreditCard,
      color: '#f093fb'
    },
    {
      title: 'Доходы',
      value: 'Coming Soon',
      change: 'Аналитика в разработке',
      icon: TrendingUp,
      color: '#4facfe'
    },
    {
      title: 'Рейтинг фестиваля',
      value: 'Coming Soon',
      change: 'Система оценок в разработке',
      icon: Star,
      color: '#ffd89b'
    },
    {
      title: 'Время работы',
      value: 'Coming Soon',
      change: 'Трекинг времени в разработке',
      icon: Clock,
      color: '#a8edea'
    }
  ];

  return (
    <Grid columns={4}>
      {statsData.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </Grid>
  );
};