import React from 'react';
import { Pressable, Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { C } from './theme';
export function Button({ title, onPress, secondary = false, loading = false }) {
    return <Pressable accessibilityRole="button" onPress={onPress} style={[s.button, secondary && s.secondary]}>{loading ? <ActivityIndicator color={secondary ? C.violet : '#fff'}/> : <Text style={[s.buttonText, secondary && s.secondaryText]}>{title}</Text>}</Pressable>;
}
export function Header({ title, subtitle, action }) {
    return <View style={s.header}><View><Text style={s.title}>{title}</Text>{subtitle ? <Text style={s.subtitle}>{subtitle}</Text> : null}</View>{action}</View>;
}
const s = StyleSheet.create({ button: { backgroundColor: C.violet, borderRadius: 16, minHeight: 54, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 18 }, buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' }, secondary: { backgroundColor: '#EFEEFF' }, secondaryText: { color: C.violet }, header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }, title: { color: C.ink, fontSize: 27, fontWeight: '800', letterSpacing: -0.7 }, subtitle: { color: C.muted, fontSize: 14, marginTop: 5 } });
