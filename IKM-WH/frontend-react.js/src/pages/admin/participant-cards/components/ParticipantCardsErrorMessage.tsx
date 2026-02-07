import { ErrorState } from '@shared/ui';

interface ParticipantCardsErrorMessageProps {
    error: string;
}

export const ParticipantCardsErrorMessage = ({ error }: ParticipantCardsErrorMessageProps) => {
    return <ErrorState message={error} title="Ошибка загрузки групп" />;
};