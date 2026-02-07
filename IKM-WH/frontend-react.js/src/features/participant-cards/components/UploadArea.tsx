import { Upload } from 'lucide-react';
import style from '../ui/ParticipantCardsDisplay.module.css';

interface UploadAreaProps {
  groupId: string;
  isUploading: boolean;
  uploadProgress: number;
  currentFile: string;
  maxCards: number;
  currentCardsCount: number;
  dragOver: boolean;
  onFileSelect: (files: FileList | null) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDragLeave: (e: React.DragEvent) => void;
}

export const UploadArea: React.FC<UploadAreaProps> = ({
  groupId,
  isUploading,
  uploadProgress,
  currentFile,
  maxCards,
  currentCardsCount,
  dragOver,
  onFileSelect,
  onDrop,
  onDragOver,
  onDragLeave,
}) => {
  return (
    <div
      className={`${style.uploadArea} ${dragOver ? style.dragOver : ''}`}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
    >
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => onFileSelect(e.target.files)}
        className={style.fileInput}
        id={`upload-${groupId}`}
        disabled={isUploading}
      />
      <label htmlFor={`upload-${groupId}`} className={style.uploadLabel}>
        {isUploading ? (
          <div className={style.uploadProgress}>
            <div className={style.progressBar}>
              <div 
                className={style.progressFill}
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p>Сжатие: {uploadProgress}%</p>
            <p className={style.currentFile}>{currentFile}</p>
          </div>
        ) : (
          <>
            <Upload size={32} />
            <p>Перетащите изображения или нажмите для выбора</p>
            <p className={style.hint}>
              Максимум {maxCards - currentCardsCount} карточек, до 1MB каждая
            </p>
          </>
        )}
      </label>
    </div>
  );
};