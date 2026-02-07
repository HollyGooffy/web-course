import { Application as ApplicationType } from '@shared/api/endpoints/applications.endpoints';

const getStatusText = (status: string) => {
    switch (status) {
        case 'pending': return 'На рассмотрении';
        case 'approved': return 'Одобрено';
        case 'rejected': return 'Отклонено';
        default: return status;
    }
};

const escapeCSVField = (field: string) => {
    if (!field) return '';
    const stringField = String(field);
    if (stringField.includes(';') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
    }
    return stringField;
};

export const exportApplicationsToCSV = (applications: ApplicationType[]) => {
    const csvContent = [
        ['Группа', 'Telegram', 'Телефон', 'Жанр', 'Дата подачи', 'Статус'].join(';'),
        ...applications.map(app => [
            escapeCSVField(app.groupName || ''),
            escapeCSVField(app.contactTelegram || ''),
            escapeCSVField(app.contactPhone || ''),
            escapeCSVField(app.genre || ''),
            escapeCSVField(new Date(app.submittedAt).toLocaleDateString('ru-RU')),
            escapeCSVField(getStatusText(app.status))
        ].join(';'))
    ].join('\r\n');

    const BOM = '\uFEFF';
    const csvWithBOM = BOM + csvContent;

    const blob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `applications_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
};