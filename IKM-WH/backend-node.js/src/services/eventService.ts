import Event, { IEvent } from '../models/Event';
import { EventStatus } from '../types';

export const eventService = {
  async getAllEvents() {
    // Сортируем от новых к старым (убывающий порядок по дате)
    return await Event.find().sort({ date: -1 });
  },

  async getUpcomingEvents() {
    const now = new Date();
    // Устанавливаем время на начало следующего дня
    // События активны до конца дня концерта (включительно)
    const nextDay = new Date(now);
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);
    
    // Для предстоящих событий сортируем от ближайших к дальним (возрастающий порядок)
    return await Event.find({
      date: { $lt: nextDay }, // Показываем события до начала следующего дня
      status: EventStatus.UPCOMING
    }).sort({ date: 1 });
  },

  async getEventById(id: string) {
    return await Event.findById(id);
  },

  async createEvent(eventData: Partial<IEvent>) {
    const event = new Event(eventData);
    return await event.save();
  },

  async updateEvent(id: string, eventData: Partial<IEvent>) {
    return await Event.findByIdAndUpdate(
      id,
      eventData,
      { new: true, runValidators: true }
    );
  },

  async deleteEvent(id: string) {
    return await Event.findByIdAndDelete(id);
  },
};

