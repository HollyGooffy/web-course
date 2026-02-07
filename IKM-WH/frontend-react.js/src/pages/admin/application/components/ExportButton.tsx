import { Download } from 'lucide-react';
import { Application as ApplicationType } from '@shared/api/endpoints/applications.endpoints';
import { exportApplicationsToCSV } from '../lib/csvExport';
import style from '../ui/Application.module.css';

interface ExportButtonProps {
    applications: ApplicationType[];
}

export const ExportButton = ({ applications }: ExportButtonProps) => {
    const handleExport = () => {
        exportApplicationsToCSV(applications);
    };

    return (
        <button className={style.btnPrimary} onClick={handleExport}>
            <Download size={16} />
            Экспорт
        </button>
    );
};