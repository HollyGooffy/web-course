import {
  LayoutDashboard,
  Users,
  BarChart3,
  Clipboard,
  UserPlus,
  Shirt,
  Image,
} from 'lucide-react';
import { MenuItemProps } from '../index';

export const createMenuItems = (pendingApplicationsCount: number): MenuItemProps[] => [
  {
    icon: <LayoutDashboard size={20} />,
    label: 'Главная',
    path: 'dashboard'
  },
  {
    icon: <Users size={20} />,
    label: 'Группы',
    path: 'groups',
  },
  {
    icon: <UserPlus size={20} />,
    label: 'Заявки',
    path: 'application',
    badge: pendingApplicationsCount || undefined
  },
  {
    icon: <Image size={20} />,
    label: 'Афиша',
    path: 'poster',
  },
  {
    icon: <BarChart3 size={20} />,
    label: 'Статистика',
    path: 'stats'
  },
  {
    icon: <Clipboard size={20} />,
    label: 'Карточки',
    path: 'cards'
  },
  {
    icon: <Shirt size={20} />,
    label: 'Мерч',
    path: 'merch',
  }
];