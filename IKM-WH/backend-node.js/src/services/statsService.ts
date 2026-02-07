import FestivalApplication from '../models/FestivalApplication';
import Group from '../models/Group';
import MerchItem from '../models/MerchItem';
import Event from '../models/Event';
import Poster from '../models/Poster';
import CardSet from '../models/CardSet';
import { ApplicationStatus } from '../types';

export class StatsService {
  async getStats() {
    const now = new Date();
    
    const [
      totalApplications,
      pendingApplications,
      approvedApplications,
      rejectedApplications,
      totalGroups,
      totalMerchItems,
      totalEvents,
      upcomingEvents,
      totalPosters,
      totalCardSets,
    ] = await Promise.all([
      FestivalApplication.countDocuments(),
      FestivalApplication.countDocuments({ status: ApplicationStatus.PENDING }),
      FestivalApplication.countDocuments({ status: ApplicationStatus.APPROVED }),
      FestivalApplication.countDocuments({ status: ApplicationStatus.REJECTED }),
      Group.countDocuments(),
      MerchItem.countDocuments(),
      Event.countDocuments(),
      Event.countDocuments({ date: { $gte: now } }),
      Poster.countDocuments(),
      CardSet.countDocuments(),
    ]);

    return {
      applications: {
        total: totalApplications,
        pending: pendingApplications,
        approved: approvedApplications,
        rejected: rejectedApplications,
      },
      groups: totalGroups,
      merchItems: totalMerchItems,
      events: totalEvents,
      upcomingEvents: upcomingEvents,
      posters: totalPosters,
      cardSets: totalCardSets,
    };
  }

  async getActivity() {
    const [recentApplications, recentGroups, recentEvents] = await Promise.all([
      FestivalApplication.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('groupName status createdAt'),
      Group.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('name createdAt'),
      Event.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title date status createdAt'),
    ]);

    return {
      recentApplications,
      recentGroups,
      recentEvents,
    };
  }
}


