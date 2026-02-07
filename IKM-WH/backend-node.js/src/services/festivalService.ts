import Festival from '../models/Festival';
import Event from '../models/Event';
import CardSet from '../models/CardSet';
import ParticipantCard from '../models/ParticipantCard';
import { createError } from '../utils/errors';
import fs from 'fs/promises';
import path from 'path';

export class FestivalService {
  async getAllFestivals() {
    return await Festival.find().sort({ date: -1 });
  }

  async getFestivalsWithCards() {
    // Получаем все фестивали, которые имеют связанные карточки участников
    const festivals = await Festival.find().sort({ date: -1 });
    const festivalsWithCards = [];

    for (const festival of festivals) {
      // Ищем карточки участников для этого фестиваля
      const participantCards = await ParticipantCard.find({ festivalId: festival._id });
      
      if (participantCards.length > 0) {
        const festivalJson = festival.toJSON();
        festivalsWithCards.push({
          ...festivalJson,
          participantCardsCount: participantCards.length,
          totalCardsAvailable: participantCards.reduce((sum: number, card: any) => {
            return sum + (card.settings?.setsAvailable || 0);
          }, 0)
        });
      }
    }

    return festivalsWithCards;
  }

  async getFestivalById(id: string) {
    const festival = await Festival.findById(id);
    if (!festival) {
      throw createError('Festival not found', 404);
    }
    return festival;
  }

  async createFestival(data: {
    name: string;
    date: Date;
    venue: string;
    description?: string;
    image?: string;
    time?: string;
    address?: string;
    performers?: string[];
    status?: string;
  }) {
    return await Festival.create(data);
  }

  async updateFestival(id: string, data: {
    name?: string;
    date?: Date;
    venue?: string;
    description?: string;
    image?: string;
    time?: string;
    address?: string;
    performers?: string[];
    status?: string;
  }) {
    const festival = await Festival.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true }
    );

    if (!festival) {
      throw createError('Festival not found', 404);
    }

    return festival;
  }

  async deleteFestival(id: string) {
    const festival = await Festival.findById(id);
    if (!festival) {
      throw createError('Festival not found', 404);
    }

    // Удаляем связанное событие (если есть)
    const relatedEvent = await Event.findOne({
      title: festival.name,
      date: festival.date
    });
    
    if (relatedEvent) {
      await Event.findByIdAndDelete(relatedEvent._id);
    }

    // Удаляем все связанные карточки участников
    const participantCards = await ParticipantCard.find({ festivalId: id });
    
    // Удаляем файлы карточек участников
    for (const participantCard of participantCards) {
      for (const card of participantCard.cards) {
        const filePath = path.join(__dirname, '../../uploads/participant-cards', card.filename);
        try {
          await fs.unlink(filePath);
        } catch (error) {
          // File not found or already deleted
        }
      }
    }

    // Удаляем записи карточек участников из БД
    const deletedCardsResult = await ParticipantCard.deleteMany({ festivalId: id });

    // Удаляем связанные наборы карточек (CardSet)
    const deletedCardSetsResult = await CardSet.deleteMany({ festivalId: id });

    // Удаляем сам фестиваль
    const deletedFestival = await Festival.findByIdAndDelete(id);

    return deletedFestival;
  }

  async getUpcomingFestivals() {
    const now = new Date();
    
    // Сначала пробуем получить фестивали из таблицы Festival
    const festivals = await Festival.find({
      date: { $gte: now }
    }).sort({ date: 1 });
    
    // Если фестивалей нет, получаем предстоящие события из таблицы Event
    if (festivals.length === 0) {
      const upcomingEvents = await Event.find({
        date: { $gte: now },
        status: { $in: ['upcoming', 'ongoing'] }
      }).sort({ date: 1 });
      
      // Возвращаем события в формате фестивалей
      return upcomingEvents.map(event => ({
        id: event._id,
        name: event.title,
        date: event.date,
        venue: event.venue,
        description: event.description,
        image: event.image,
        status: event.status,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt
      }));
    }
    
    return festivals;
  }

  async syncWithEvents() {
    try {
      // Получаем ВСЕ события из афиши (и прошедшие, и предстоящие)
      const allEvents = await Event.find({
        status: { $in: ['upcoming', 'completed'] }
      }).sort({ date: -1 });

      const syncedFestivals = [];

      for (const event of allEvents) {
        // Проверяем, существует ли уже фестиваль для этого события
        let festival = await Festival.findOne({
          name: event.title,
          date: event.date
        });

        if (!festival) {
          // Определяем статус фестиваля на основе даты события
          const eventDate = new Date(event.date);
          const now = new Date();
          let festivalStatus = 'upcoming';
          
          if (eventDate < now) {
            festivalStatus = 'completed';
          } else if (eventDate.toDateString() === now.toDateString()) {
            festivalStatus = 'ongoing';
          }

          // Создаем новый фестиваль на основе события
          festival = await Festival.create({
            name: event.title,
            date: event.date,
            venue: event.venue,
            description: event.description,
            image: event.image,
            status: festivalStatus
          });
        } else {
          // Обновляем статус существующего фестиваля на основе текущей даты
          const eventDate = new Date(event.date);
          const now = new Date();
          let festivalStatus = festival.status;
          
          if (eventDate < now && festival.status !== 'completed') {
            festivalStatus = 'completed';
          } else if (eventDate.toDateString() === now.toDateString() && festival.status !== 'ongoing') {
            festivalStatus = 'ongoing';
          } else if (eventDate > now && festival.status !== 'upcoming') {
            festivalStatus = 'upcoming';
          }

          if (festivalStatus !== festival.status) {
            festival = await Festival.findByIdAndUpdate(
              festival._id,
              { status: festivalStatus },
              { new: true }
            );
          }
        }

        syncedFestivals.push(festival);
      }

      return syncedFestivals;
    } catch (error) {
      throw createError('Error syncing with events', 500);
    }
  }
}