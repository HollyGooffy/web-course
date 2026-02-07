import React, { useState } from 'react';
import { AdminSidebar } from '@widgets/admin-sidebar/AdminSidebar';
import style from './AdminLayout.module.css';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const handleSidebarToggle = (_isOpen: boolean, isCollapsed?: boolean) => {
        if (isCollapsed !== undefined) {
            setIsSidebarCollapsed(isCollapsed);
        }
    };

    return (
        <div className={style.adminLayout}>
            <AdminSidebar onToggle={handleSidebarToggle} />
            <main className={`${style.main} ${isSidebarCollapsed ? style.collapsed : ''}`}>
                {children}
            </main>
        </div>
    );
};