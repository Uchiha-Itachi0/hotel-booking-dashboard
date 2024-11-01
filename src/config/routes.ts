import {
    Home,
    Hotel,
    Calendar,
    Users,
    Settings,
    BarChart,
} from 'lucide-react';
import { RouteConfig } from '../types/routes';
import {
    DashboardPage,
    BookingsPage,
    CalendarPage,
    GuestsPage,
    AnalyticsPage,
    SettingsPage
} from '../pages';

export const routes: RouteConfig[] = [
    {
        id: 'dashboard',
        path: '/',
        icon: Home,
        label: 'Dashboard',
        component: DashboardPage
    },
    {
        id: 'bookings',
        path: '/bookings',
        icon: Hotel,
        label: 'Bookings',
        component: BookingsPage
    },
    {
        id: 'calendar',
        path: '/calendar',
        icon: Calendar,
        label: 'Calendar',
        component: CalendarPage
    },
    {
        id: 'guests',
        path: '/guests',
        icon: Users,
        label: 'Guests',
        component: GuestsPage
    },
    {
        id: 'analytics',
        path: '/analytics',
        icon: BarChart,
        label: 'Analytics',
        component: AnalyticsPage
    },
    {
        id: 'settings',
        path: '/settings',
        icon: Settings,
        label: 'Settings',
        component: SettingsPage
    }
];