import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
Notifications.setNotificationHandler({ handleNotification: async () => ({ shouldShowBanner: true, shouldShowList: true, shouldPlaySound: true, shouldSetBadge: false }) });
export async function requestNotificationPermission() {
    if (Platform.OS === 'android')
        await Notifications.setNotificationChannelAsync('daily-learning', { name: 'Daily learning', importance: Notifications.AndroidImportance.DEFAULT });
    const current = await Notifications.getPermissionsAsync();
    const result = current.granted ? current : await Notifications.requestPermissionsAsync();
    return result.granted;
}
export async function scheduleReminder(hour = 19, minute = 0) {
    const allowed = await requestNotificationPermission();
    if (!allowed)
        throw new Error('Notification permission was not granted. Enable it in your device settings.');
    await Notifications.cancelAllScheduledNotificationsAsync();
    return Notifications.scheduleNotificationAsync({ content: { title: 'A little progress adds up ✨', body: 'Your SkillUp study session is ready when you are.', sound: true }, trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour, minute, ...(Platform.OS === 'android' ? { channelId: 'daily-learning' } : {}) } });
}
export async function sendTestNotification() {
    const allowed = await requestNotificationPermission();
    if (!allowed)
        throw new Error('Notification permission was not granted. Enable it in your device settings.');
    return Notifications.scheduleNotificationAsync({ content: { title: 'Your reminder is working 🎉', body: 'You’re all set for your next SkillUp session.', sound: true }, trigger: null });
}
export async function cancelReminder() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}
