import { useState, useEffect } from 'react';

export const useSidebarState = (onToggle?: (isMobileOpen: boolean, isCollapsed: boolean) => void) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1440;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    onToggle?.(isMobileOpen, isCollapsed);
  }, [isMobileOpen, isCollapsed, onToggle]);

  const handleToggle = () => {
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  const handleOverlayClick = () => {
    setIsMobileOpen(false);
  };

  const handleNavClick = (callback: (path: string) => void) => (path: string) => {
    callback(path);
    
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  return {
    isCollapsed,
    isMobileOpen,
    isMobile,
    handleToggle,
    handleOverlayClick,
    handleNavClick,
    setIsMobileOpen,
  };
};