import React from 'react';
import { Portal } from '@shared/ui';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { ParticipantCardsModalProps } from '../model/types';
import { useParticipantCardsModal } from '../hooks/useParticipantCardsModal';
import { useGroupsData } from '../hooks/useGroupsData';
import { useGroupActions } from '../hooks/useGroupActions';
import { ModalHeader } from '../components/ModalHeader';
import { FestivalInfo } from '../components/FestivalInfo';
import { GroupCard } from '../components/GroupCard';
import { EmptyState } from '../components/EmptyState';
import { ModalFooter } from '../components/ModalFooter';
import style from './ParticipantCardsModal.module.css';

export const ParticipantCardsModal: React.FC<ParticipantCardsModalProps> = ({
    isOpen,
    onClose,
    festival
}) => {
    const { loading } = useParticipantCards();
    
    useParticipantCardsModal(isOpen);
    const { groupsWithCards, setGroupsWithCards } = useGroupsData(festival, isOpen);
    const { 
        handleCardsChange, 
        handleSaveGroup, 
        handleDeleteGroup, 
        handleSaveAllCards 
    } = useGroupActions({ 
        festival, 
        groupsWithCards, 
        setGroupsWithCards, 
        onClose 
    });

    if (!isOpen || !festival) return null;

    return (
        <Portal>
            <div className={style.modalOverlay} onClick={onClose}>
                <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
                    <ModalHeader 
                        festival={festival} 
                        groupsWithCards={groupsWithCards} 
                        onClose={onClose} 
                    />

                    <div className={style.modalBody}>
                        <FestivalInfo festival={festival} />

                        {groupsWithCards.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <div className={style.groupsContainer}>
                                {groupsWithCards.map((group) => (
                                    <GroupCard
                                        key={`${group.eventId}-${group.groupName}`}
                                        group={group}
                                        loading={loading}
                                        onCardsChange={handleCardsChange}
                                        onSaveGroup={handleSaveGroup}
                                        onDeleteGroup={handleDeleteGroup}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    {groupsWithCards.length > 0 && (
                        <ModalFooter 
                            loading={loading} 
                            onClose={onClose} 
                            onSaveAll={handleSaveAllCards} 
                        />
                    )}
                </div>
            </div>
        </Portal>
    );
};