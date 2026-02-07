import { Plus, Calendar, Music, TrendingUp } from 'lucide-react';
import {AdminBtn, Grid} from '@shared/ui/adminPage';

export const QuickActions = () => {
  const actions = [
    {
      label: 'Добавить группу',
      icon: Plus,
      variant: 'primary' as const,
      href: '/admin/groups'
    },
    {
      label: 'Создать событие',
      icon: Calendar,
      variant: 'secondary' as const,
      href: '/admin/poster'
    },
    {
      label: 'Просмотреть заявки',
      icon: Music,
      variant: 'blue' as const,
      href: '/admin/applications'
    },
    {
      label: 'Статистика',
      icon: TrendingUp,
      variant: 'positive' as const,
      href: '/admin/dashboard'
    }
  ];

  return (
    <Grid columns={4}>
      {actions.map((action, index) => (
        <AdminBtn
          key={index}
          variant={action.variant}
          onClick={() => window.location.href = action.href}
        >
          <action.icon size={16} />
          {action.label}
        </AdminBtn>
      ))}
    </Grid>
  );
};