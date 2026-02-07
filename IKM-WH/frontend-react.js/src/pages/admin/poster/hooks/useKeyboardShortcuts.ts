import { useEffect } from 'react';

interface UseKeyboardShortcutsProps {
    onToggleSort: () => void;
}

export const useKeyboardShortcuts = ({ onToggleSort }: UseKeyboardShortcutsProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.key === 's') {
                event.preventDefault();
                onToggleSort();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onToggleSort]);
};