interface UseFestivalActionsProps {
    deleteFestival: (id: string) => Promise<boolean>;
    refetch: () => void;
}

export const useFestivalActions = ({ deleteFestival, refetch }: UseFestivalActionsProps) => {
    const handleDelete = async (id: string) => {
        if (window.confirm('Вы уверены, что хотите удалить этот фестиваль?')) {
            try {
                await deleteFestival(id);
            } catch (error) {
                console.error('Error deleting festival:', error);
            }
        }
    };

    const handleRefresh = () => {
        refetch();
    };

    return {
        handleDelete,
        handleRefresh
    };
};