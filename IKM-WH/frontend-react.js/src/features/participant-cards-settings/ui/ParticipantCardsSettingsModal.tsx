import React, { useState, useEffect } from 'react';
import { X, Users, DollarSign, Package } from 'lucide-react';
import { Portal } from '@shared/ui';
import { AdminInput } from '@shared/ui/adminPage/AdminInput';
import { AdminBtn } from '@shared/ui/adminPage';
import { useParticipantCards } from '@features/participant-cards/model/hooks/useParticipantCards';
import { ParticipantCardSet } from '@features/cards-display';
import style from './ParticipantCardsSettingsModal.module.css';

interface ParticipantCardsSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardSet: ParticipantCardSet | null;
  onSettingsSaved?: () => void; // Добавляем callback для обновления данных
}

export const ParticipantCardsSettingsModal: React.FC<ParticipantCardsSettingsModalProps> = ({
  isOpen,
  onClose,
  cardSet,
  onSettingsSaved
}) => {
  const { updateCardSettings } = useParticipantCards(); // Используем API для обновления настроек
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    price: '',
    setsAvailable: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (cardSet && isOpen) {
      setFormData({
        price: cardSet.price ? cardSet.price.toString() : '',
        setsAvailable: cardSet.setsAvailable ? cardSet.setsAvailable.toString() : ''
      });
      setError(null);
    }
  }, [cardSet, isOpen]);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cardSet) {
      
      return;
    }

    const price = parseFloat(formData.price) || 0;
    const setsAvailable = parseInt(formData.setsAvailable) || 0;

    setLoading(true);
    setError(null);

    try {
      
      await updateCardSettings(
        cardSet.participantData.festivalId,
        cardSet.participantData.groupName,
        cardSet.participantData.eventId,
        {
          price: price,
          setsAvailable: setsAvailable,
          isActive: true
        }
      );

      alert(`Настройки для группы "${cardSet.participantData.groupName}" успешно сохранены!`);
      
      // Вызываем callback для обновления данных в родительском компоненте
      if (onSettingsSaved) {
        
        onSettingsSaved();
      }
      
      onClose();
    } catch (err: any) {

      const errorMessage = err.response?.data?.error || err.message || 'Ошибка сохранения настроек';
      setError(errorMessage);
      console.error('Error saving participant card settings:', err);
    } finally {
      setLoading(false);
      
    }
  };

  if (!isOpen || !cardSet) return null;

  return (
    <Portal>
      <div className={style.modalOverlay} onClick={onClose}>
        <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={style.modalHeader}>
            <h2>
              <Users size={24} />
              Настройки карточек участников
            </h2>
            <button className={style.closeButton} onClick={onClose}>
              <X size={24} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.cardInfo}>
              <h3>{cardSet.title}</h3>
              <div className={style.cardDetails}>
                <div className={style.detail}>
                  <Package size={16} />
                  <span>Карточек в наборе: {cardSet.cardsInSet}</span>
                </div>
                <div className={style.detail}>
                  <Users size={16} />
                  <span>Группа: {cardSet.participantData.groupName}</span>
                </div>
              </div>
            </div>

            <div className={style.formGroup}>
              <label>
                <DollarSign size={16} />
                Цена за набор (₽) *
              </label>
              <AdminInput
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder="Введите цену за набор"
                required
              />
            </div>

            <div className={style.formGroup}>
              <label>
                <Package size={16} />
                Доступно наборов *
              </label>
              <AdminInput
                type="number"
                min="0"
                value={formData.setsAvailable}
                onChange={(e) => handleInputChange('setsAvailable', e.target.value)}
                placeholder="Введите количество доступных наборов"
                required
              />
            </div>

            {error && (
              <div className={style.error}>
                {error}
              </div>
            )}

            <div className={style.formActions}>
              <AdminBtn
                type="button"
                variant="black-outline"
                onClick={onClose}
                disabled={loading}
              >
                Отмена
              </AdminBtn>
              <AdminBtn
                type="submit"
                variant="primary"
                disabled={loading}
              >
                {loading ? 'Сохранение...' : 'Сохранить настройки'}
              </AdminBtn>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};
