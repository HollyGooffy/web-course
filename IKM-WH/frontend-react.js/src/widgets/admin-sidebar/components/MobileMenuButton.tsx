import { Menu } from 'lucide-react';
import style from '../AdminSidebar.module.css';

interface MobileMenuButtonProps {
  onClick: () => void;
}

export const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ onClick }) => {
  return (
    <button
      className={style.mobileMenuButton}
      onClick={onClick}
    >
      <Menu size={24} />
    </button>
  );
};