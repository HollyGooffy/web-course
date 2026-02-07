export const ROUTES = {
  HOME: '/',
  ADMIN_LOGIN: '/admin-login',
  ADMIN: {
    ROOT: '/admin',
    DASHBOARD: '/admin/dashboard',
    GROUPS: '/admin/groups',
    APPLICATIONS: '/admin/applications',
    MERCH: '/admin/merch',
    CARDS: '/admin/cards',
    POSTER: '/admin/poster',
    STATS: '/admin/stats',
  }
} as const;

export type RouteKeys = typeof ROUTES;