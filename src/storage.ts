import AsyncStorage from '@react-native-async-storage/async-storage';
import { Preferences } from './types';

const KEYS = { user: '@skillup/user', session: '@skillup/session', favorites: '@skillup/favorites', progress: '@skillup/progress', preferences: '@skillup/preferences' };
export type LocalUser = { username: string; email: string; password: string };
export const defaults: Preferences = { dailyGoal: 20, reminders: false, displayName: '', reminderHour: 19 };
export const storage = {
  async getUser() { const value = await AsyncStorage.getItem(KEYS.user); return value ? JSON.parse(value) as LocalUser : null; },
  async saveUser(user: LocalUser) { await AsyncStorage.setItem(KEYS.user, JSON.stringify(user)); },
  async getSession() { return await AsyncStorage.getItem(KEYS.session) === 'true'; },
  async setSession(active: boolean) { if (active) await AsyncStorage.setItem(KEYS.session, 'true'); else await AsyncStorage.removeItem(KEYS.session); },
  async getFavorites(): Promise<string[]> { return JSON.parse(await AsyncStorage.getItem(KEYS.favorites) || '[]'); },
  async saveFavorites(ids: string[]) { await AsyncStorage.setItem(KEYS.favorites, JSON.stringify(ids)); },
  async getProgress(): Promise<string[]> { return JSON.parse(await AsyncStorage.getItem(KEYS.progress) || '[]'); },
  async saveProgress(ids: string[]) { await AsyncStorage.setItem(KEYS.progress, JSON.stringify(ids)); },
  async getPreferences(): Promise<Preferences> { return { ...defaults, ...JSON.parse(await AsyncStorage.getItem(KEYS.preferences) || '{}') }; },
  async savePreferences(value: Preferences) { await AsyncStorage.setItem(KEYS.preferences, JSON.stringify(value)); },
  async exportSnapshot() { const [user, session, favorites, progress, preferences] = await Promise.all([this.getUser(), this.getSession(), this.getFavorites(), this.getProgress(), this.getPreferences()]); return { user: user?.email || 'Guest', session, favorites, progress, preferences }; },
};
