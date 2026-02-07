import React, { useMemo } from 'react';
import style from './ParticipantCardsDisplay.module.css';
import { CompressedImage } from '@shared/lib/utils/imageCompression';
import { CardsHeader, UploadArea, CardsFan, EmptyState } from '../components';
import { useParticipantCards } from '../hooks';

interface ParticipantCardsDisplayProps {
  groupId: string;
  groupName: string;
  onCardsChange?: (cards: CompressedImage[]) => void;
  maxCards?: number;
  readonly?: boolean;
  initialCards?: CompressedImage[];
  previewMode?: boolean;
}

export const ParticipantCardsDisplay = React.memo<ParticipantCardsDisplayProps>(({
  groupId,
  groupName,
  onCardsChange,
  maxCards = 9,
  readonly = false,
  initialCards = [],
  previewMode = false
}) => {
  const {
    cards,
    isUploading,
    uploadProgress,
    currentFile,
    dragOver,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    removeCard,
  } = useParticipantCards(initialCards, maxCards, readonly, onCardsChange);

  // Мемоизируем условия отображения
  const showUploadArea = useMemo(() => 
    !readonly && cards.length < maxCards, 
    [readonly, cards.length, maxCards]
  );

  const showEmptyState = useMemo(() => 
    cards.length === 0 && readonly && !previewMode, 
    [cards.length, readonly, previewMode]
  );

  return (
    <div className={style.container}>
      {!previewMode && (
        <>
          <CardsHeader 
            groupName={groupName}
            cardsCount={cards.length}
            maxCards={maxCards}
          />

          {/* Область загрузки */}
          {showUploadArea && (
            <UploadArea
              groupId={groupId}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
              currentFile={currentFile}
              maxCards={maxCards}
              currentCardsCount={cards.length}
              dragOver={dragOver}
              onFileSelect={handleFileSelect}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            />
          )}
        </>
      )}

      {/* Отображение карточек веером */}
      {cards.length > 0 && (
        <CardsFan
          cards={cards}
          readonly={readonly}
          previewMode={previewMode}
          onRemoveCard={removeCard}
        />
      )}

      {/* Пустое состояние */}
      {showEmptyState && <EmptyState />}
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.groupId === nextProps.groupId &&
         prevProps.groupName === nextProps.groupName &&
         prevProps.maxCards === nextProps.maxCards &&
         prevProps.readonly === nextProps.readonly &&
         prevProps.previewMode === nextProps.previewMode &&
         prevProps.initialCards === nextProps.initialCards &&
         prevProps.onCardsChange === nextProps.onCardsChange;
});