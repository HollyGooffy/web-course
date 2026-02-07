import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { User } from '../../src/models/User'
import { Festival } from '../../src/models/Festival'
import { Group } from '../../src/models/Group'
import { Event } from '../../src/models/Event'
import { FestivalApplication } from '../../src/models/FestivalApplication'

export const createTestUser = async (userData = {}) => {
  const defaultUser = {
    name: 'Test Admin',
    email: 'admin@test.com',
    password: 'password123',
    role: 'admin'
  }
  
  const user = new User({
    ...defaultUser,
    ...userData,
    passwordHash: await bcrypt.hash(defaultUser.password, 10)
  })
  
  return await user.save()
}

export const generateAuthToken = (userId: string) => {
  return jwt.sign(
    { userId, role: 'admin' },
    process.env.JWT_SECRET || 'test-secret',
    { expiresIn: '1h' }
  )
}

export const createTestFestival = async (festivalData = {}) => {
  const defaultFestival = {
    name: 'Test Festival',
    date: new Date('2024-06-15'),
    venue: 'Test Venue',
    description: 'Test Description',
    status: 'upcoming'
  }
  
  const festival = new Festival({
    ...defaultFestival,
    ...festivalData
  })
  
  return await festival.save()
}

export const createTestGroup = async (groupData = {}) => {
  const defaultGroup = {
    name: 'Test Band',
    genre: 'Rock',
    description: 'Test band description',
    members: ['John Doe', 'Jane Smith']
  }
  
  const group = new Group({
    ...defaultGroup,
    ...groupData
  })
  
  return await group.save()
}

export const createTestEvent = async (eventData = {}) => {
  const defaultEvent = {
    title: 'Test Event',
    description: 'Test event description',
    date: new Date('2024-06-15'),
    time: '20:00',
    venue: 'Main Stage',
    address: 'Test Address',
    performers: ['Test Band'],
    status: 'upcoming'
  }
  
  const event = new Event({
    ...defaultEvent,
    ...eventData
  })
  
  return await event.save()
}

export const createTestApplication = async (applicationData = {}) => {
  const defaultApplication = {
    groupName: 'Test Application Band',
    contactTelegram: '@testband',
    contactPhone: '+1234567890',
    description: 'Test application',
    status: 'pending'
  }
  
  const application = new FestivalApplication({
    ...defaultApplication,
    ...applicationData
  })
  
  return await application.save()
}