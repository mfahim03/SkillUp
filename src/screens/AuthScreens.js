import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from '../components';
import { C } from '../theme';
import { storage } from '../storage';
export function AuthScreens({ onSuccess, onSignup, onLogin }) {
    const [mode, setMode] = useState('login');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [busy, setBusy] = useState(false);
    const signup = async () => {
        const cleanEmail = email.trim().toLowerCase();
        if (username.trim().length < 2)
            return Alert.alert('Check your name', 'Enter at least 2 characters for your username.');
        if (!/^\S+@\S+\.\S+$/.test(cleanEmail))
            return Alert.alert('Check your email', 'Enter a valid email address.');
        if (password.length < 8)
            return Alert.alert('Password too short', 'Use at least 8 characters.');
        setBusy(true);
        try {
            const existing = await storage.getUser();
            if (existing?.email === cleanEmail)
                return Alert.alert('Account already exists', 'Log in with this email instead.');
            const user = { username: username.trim(), email: cleanEmail, password };
            await storage.saveUser(user);
            onSignup(user);
        }
        catch {
            Alert.alert('Could not create account', 'Please try again.');
        }
        finally {
            setBusy(false);
        }
    };
    const login = async () => {
        if (!/^\S+@\S+\.\S+$/.test(email.trim()))
            return Alert.alert('Check your email', 'Enter a valid email address.');
        if (!password)
            return Alert.alert('Password required', 'Enter your password to continue.');
        setBusy(true);
        try {
            const user = await storage.getUser();
            if (!user || user.email !== email.trim().toLowerCase() || user.password !== password)
                return Alert.alert('Unable to sign in', 'We couldn’t find an account with that email and password. Please check your details or create an account.');
            onSuccess(user);
        }
        catch {
            Alert.alert('Could not sign in', 'Please try again.');
        }
        finally {
            setBusy(false);
        }
    };
    return <KeyboardAvoidingView style={s.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}><ScrollView contentContainerStyle={s.content} keyboardShouldPersistTaps="handled">
    <View style={s.brand}><View style={s.logo}><Text style={{ fontSize: 27 }}>✦</Text></View><Text style={s.brandName}>SkillUp</Text><Text style={s.brandTag}>MAKE SPACE TO GROW</Text></View>
    <Text style={s.heading}>{mode === 'login' ? 'Welcome back' : 'Start your journey'}</Text><Text style={s.subheading}>{mode === 'login' ? 'Your next small win is waiting.' : 'A little learning goes a long way.'}</Text>
    {mode === 'signup' && <Field label="USERNAME" value={username} onChangeText={setUsername} placeholder="How should we call you?" autoCapitalize="words"/>}
    <Field label="EMAIL ADDRESS" value={email} onChangeText={setEmail} placeholder="you@example.com" keyboardType="email-address" autoCapitalize="none"/>
    <Field label="PASSWORD" value={password} onChangeText={setPassword} placeholder={mode === 'signup' ? 'At least 8 characters' : 'Enter your password'} secureTextEntry/>
    {mode === 'login' && <Pressable style={s.forgot} onPress={() => Alert.alert('Password reset', 'For this local demo, create a new account or reinstall the app to reset credentials.')}><Text style={s.forgotText}>Forgot password?</Text></Pressable>}
    <Button title={mode === 'login' ? 'Log in' : 'Create account'} onPress={mode === 'login' ? login : signup} loading={busy}/>
    <View style={s.switch}><Text style={s.switchText}>{mode === 'login' ? 'New to SkillUp? ' : 'Already have an account? '}</Text><Pressable onPress={() => { setMode(mode === 'login' ? 'signup' : 'login'); onLogin(); }}><Text style={s.link}>{mode === 'login' ? 'Sign up' : 'Log in'}</Text></Pressable></View>
    <Text style={s.foot}>By continuing, you agree to learn at your own pace.</Text>
  </ScrollView></KeyboardAvoidingView>;
}
function Field(props) { const { label, ...input } = props; return <View style={s.field}><Text style={s.label}>{label}</Text><TextInput {...input} placeholderTextColor="#A5A6B5" style={s.input}/></View>; }
const s = StyleSheet.create({ root: { flex: 1, backgroundColor: C.white }, content: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 58, paddingBottom: 28 }, brand: { alignItems: 'center', marginBottom: 38 }, logo: { width: 60, height: 60, borderRadius: 20, backgroundColor: '#EFEEFF', alignItems: 'center', justifyContent: 'center' }, brandName: { color: C.ink, fontSize: 22, fontWeight: '800', marginTop: 9 }, brandTag: { color: C.muted, letterSpacing: 2, fontSize: 9, marginTop: 4, fontWeight: '700' }, heading: { color: C.ink, fontSize: 29, fontWeight: '800', letterSpacing: -0.7 }, subheading: { color: C.muted, fontSize: 15, marginTop: 8, marginBottom: 28 }, field: { marginBottom: 17 }, label: { color: C.ink, fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 9 }, input: { backgroundColor: C.soft, borderRadius: 14, minHeight: 54, paddingHorizontal: 16, color: C.ink, fontSize: 15, borderWidth: 1, borderColor: C.line }, forgot: { alignSelf: 'flex-end', marginTop: -4, marginBottom: 22 }, forgotText: { color: C.violet, fontWeight: '700', fontSize: 13 }, switch: { flexDirection: 'row', justifyContent: 'center', marginTop: 23 }, switchText: { color: C.muted, fontSize: 14 }, link: { color: C.violet, fontWeight: '800', fontSize: 14 }, foot: { color: '#A5A6B5', textAlign: 'center', fontSize: 11, marginTop: 'auto', paddingTop: 30 } });
