import FestivalApplication from '../models/FestivalApplication';
import { ApplicationStatus } from '../types';
import { createError } from '../utils/errors';

export class ApplicationService {
  async createApplication(data: {
    groupName: string;
    email: string;
    artistName?: string;
    bandName?: string;
    phone?: string;
    description?: string;
    socialLinks?: any;
    genre?: string;
    members?: number;
  }) {
    return await FestivalApplication.create(data);
  }

  async getAllApplications() {
    return await FestivalApplication.find().sort({ createdAt: -1 });
  }

  async getApplicationById(id: string) {
    const application = await FestivalApplication.findById(id);
    if (!application) {
      throw createError('Application not found', 404);
    }
    return application;
  }

  async updateApplicationStatus(id: string, status: ApplicationStatus) {
    const application = await FestivalApplication.findById(id);
    if (!application) {
      throw createError('Application not found', 404);
    }

    application.status = status;
    if (status !== ApplicationStatus.PENDING) {
      application.reviewedAt = new Date();
    }
    await application.save();

    return application;
  }

  async updateApplication(id: string, data: Partial<{
    status: ApplicationStatus;
    notes: string;
    reviewedBy: string;
    reviewedAt: Date;
  }>) {
    const application = await FestivalApplication.findById(id);
    if (!application) {
      throw createError('Application not found', 404);
    }

    Object.assign(application, data);
    await application.save();

    return application;
  }

  async deleteApplication(id: string) {
    const application = await FestivalApplication.findById(id);
    if (!application) {
      throw createError('Application not found', 404);
    }

    await application.deleteOne();
  }
}


