import { BaseRepository } from './BaseRepository';
import User, { IUser } from '../models/User';
import { LogMethod, Cache } from '../decorators';

export class UserRepository extends BaseRepository<IUser> {
  constructor() {
    super(User);
  }

  @LogMethod()
  async findByEmail(email: string): Promise<IUser | null> {
    return await this.findOne({ email: email.toLowerCase() });
  }

  @Cache(300) // Кэшируем на 5 минут
  async findByRole(role: string): Promise<IUser[]> {
    return await this.findMany({ role });
  }

  @LogMethod()
  async createUser(userData: {
    name: string;
    email: string;
    passwordHash: string;
    role?: string;
  }): Promise<IUser> {
    const user = await this.create({
      ...userData,
      email: userData.email.toLowerCase(),
      role: userData.role || 'admin'
    });

    return user;
  }

  @LogMethod()
  async updatePassword(userId: string, passwordHash: string): Promise<IUser | null> {
    return await this.updateById(userId, { passwordHash });
  }

  @LogMethod()
  async updateProfile(userId: string, profileData: {
    name?: string;
    email?: string;
  }): Promise<IUser | null> {
    const updateData: any = {};
    
    if (profileData.name) {
      updateData.name = profileData.name;
    }
    
    if (profileData.email) {
      updateData.email = profileData.email.toLowerCase();
    }

    return await this.updateById(userId, updateData);
  }

  @Cache(60)
  async getUserStats(): Promise<{
    total: number;
    byRole: Record<string, number>;
    recentRegistrations: number;
  }> {
    const total = await this.count();
    
    // Группировка по ролям
    const roleStats = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 }
        }
      }
    ]);

    const byRole = roleStats.reduce((acc, stat) => {
      acc[stat._id] = stat.count;
      return acc;
    }, {} as Record<string, number>);

    // Регистрации за последние 7 дней
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const recentRegistrations = await this.count({
      createdAt: { $gte: weekAgo }
    });

    return {
      total,
      byRole,
      recentRegistrations
    };
  }

  @LogMethod()
  async isEmailTaken(email: string, excludeUserId?: string): Promise<boolean> {
    const filter: any = { email: email.toLowerCase() };
    
    if (excludeUserId) {
      filter._id = { $ne: excludeUserId };
    }

    return await this.exists(filter);
  }
}