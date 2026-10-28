export const courses = [
    { id: 'react-native', title: 'React Native essentials', category: 'Mobile development', description: 'Build polished mobile apps with reusable components, navigation, and native device features.', lessons: 12, duration: '3h 20m', level: 'Beginner', color: '#E9E7FF', emoji: '📱', instructor: 'Maya Chen' },
    { id: 'design-systems', title: 'Design systems, made simple', category: 'Product design', description: 'Create a flexible visual language with thoughtful tokens, components, and accessibility.', lessons: 9, duration: '2h 10m', level: 'Intermediate', color: '#DDF5EA', emoji: '🎨', instructor: 'Amir Rahman' },
    { id: 'typescript', title: 'TypeScript for everyday apps', category: 'Programming', description: 'Write safer JavaScript and model real application data with confidence.', lessons: 15, duration: '4h 05m', level: 'Beginner', color: '#FFEBD9', emoji: '⌨️', instructor: 'Nina Patel' },
    { id: 'productivity', title: 'Focus and deep work', category: 'Career skills', description: 'Build a sustainable focus routine and make your best work happen more often.', lessons: 7, duration: '1h 45m', level: 'All levels', color: '#FBE1E9', emoji: '🧠', instructor: 'Leo Martin' },
];
export async function fetchLearningInspiration() {
    const response = await fetch('https://dummyjson.com/quotes?limit=5');
    if (!response.ok)
        throw new Error('Could not load inspiration');
    const json = await response.json();
    const quotes = Array.isArray(json.quotes) ? json.quotes : [];
    return quotes.slice(0, 4).map((q, i) => ({
        ...courses[i], id: `api-${q.id}`, title: ['Think in small steps', 'Make time to practice', 'Build with curiosity', 'Keep showing up'][i],
        description: q.quote, category: 'Daily inspiration', instructor: q.author,
    }));
}
