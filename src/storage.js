import AsyncStorage from '@react-native-async-storage/async-storage';
const KEYS = { user: '@skillup/user', session: '@skillup/session', favorites: '@skillup/favorites', progress: '@skillup/progress', preferences: '@skillup/preferences' };
export const defaults = { dailyGoal: 20, reminders: false, displayName: '', reminderHour: 19 };
export const storage = {
    async getUser() { const value = await AsyncStorage.getItem(KEYS.user); return value ? JSON.parse(value) : null; },
    async saveUser(user) { await AsyncStorage.setItem(KEYS.user, JSON.stringify(user)); },
    async getSession() { return await AsyncStorage.getItem(KEYS.session) === 'true'; },
    async setSession(active) { if (active)
        await AsyncStorage.setItem(KEYS.session, 'true');
    else
        await AsyncStorage.removeItem(KEYS.session); },
    async getFavorites() { return JSON.parse(await AsyncStorage.getItem(KEYS.favorites) || '[]'); },
    async saveFavorites(ids) { await AsyncStorage.setItem(KEYS.favorites, JSON.stringify(ids)); },
    async getProgress() { return JSON.parse(await AsyncStorage.getItem(KEYS.progress) || '[]'); },
    async saveProgress(ids) { await AsyncStorage.setItem(KEYS.progress, JSON.stringify(ids)); },
    async getPreferences() { return { ...defaults, ...JSON.parse(await AsyncStorage.getItem(KEYS.preferences) || '{}') }; },
    async savePreferences(value) { await AsyncStorage.setItem(KEYS.preferences, JSON.stringify(value)); },
    async exportSnapshot() { const [user, session, favorites, progress, preferences] = await Promise.all([this.getUser(), this.getSession(), this.getFavorites(), this.getProgress(), this.getPreferences()]); return { user: user?.email || 'Guest', session, favorites, progress, preferences }; },
};
