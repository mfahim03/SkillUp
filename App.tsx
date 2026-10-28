import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, StatusBar, StyleSheet, Text, View } from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { AuthScreens } from './src/screens/AuthScreens';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailScreen } from './src/screens/DetailScreen';
import { LibraryScreen } from './src/screens/LibraryScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { Course, Preferences } from './src/types';
import { courses } from './src/data';
import { LocalUser, storage } from './src/storage';
import { requestNotificationPermission, scheduleReminder } from './src/notifications';
import { C } from './src/theme';

type Tab='home'|'library'|'settings';
export default function App(){
 const [ready,setReady]=useState(false);const [user,setUser]=useState<LocalUser|null>(null);const [tab,setTab]=useState<Tab>('home');const [detail,setDetail]=useState<Course|null>(null);const [favorites,setFavorites]=useState<string[]>([]);const [progress,setProgress]=useState<string[]>([]);const [prefs,setPrefs]=useState<Preferences>({dailyGoal:20,reminders:false,displayName:'',reminderHour:19});
 useEffect(()=>{Promise.all([storage.getUser(),storage.getSession(),storage.getFavorites(),storage.getProgress(),storage.getPreferences()]).then(([u,session,f,p,pr])=>{setUser(session?u:null);setFavorites(f);setProgress(p);setPrefs(pr);}).catch(()=>{}).finally(()=>setReady(true));},[]);
 const savePrefs=async(next:Preferences)=>{setPrefs(next);await storage.savePreferences(next);if(next.reminders&&(!prefs.reminders||next.reminderHour!==prefs.reminderHour)){try{await requestNotificationPermission();await scheduleReminder(next.reminderHour);Alert.alert('Reminder set',`Your daily SkillUp reminder is scheduled for ${next.reminderHour%12||12}:00 ${next.reminderHour>=12?'PM':'AM'}.`);}catch(e){setPrefs({...next,reminders:false});await storage.savePreferences({...next,reminders:false});Alert.alert('Reminder not enabled',e instanceof Error?e.message:'Please try again.');}}};
 const toggleFavorite=async(id:string)=>{const next=favorites.includes(id)?favorites.filter(x=>x!==id):[...favorites,id];setFavorites(next);await storage.saveFavorites(next);};
 const markProgress=async()=>{if(!detail)return;const next=progress.includes(detail.id)?progress:[...progress,detail.id];setProgress(next);await storage.saveProgress(next);Alert.alert('Nice work!','Your progress is saved on this device.');};
 const onSignup=(u:LocalUser)=>{setUser(u);void storage.setSession(true);setPrefs({...prefs,displayName:u.username});void storage.savePreferences({...prefs,displayName:u.username});};
 if(!ready)return <View style={s.loading}><ActivityIndicator size="large" color={C.violet}/></View>;
 if(!user)return <><AuthScreens onSuccess={u=>{setUser(u);void storage.setSession(true);}} onSignup={onSignup} onLogin={()=>{}}/><ExpoStatusBar style="dark"/></>;
 const name=prefs.displayName.trim()||user.username;
 if(detail)return <><DetailScreen course={detail} onBack={()=>setDetail(null)} onProgress={markProgress} completed={progress.includes(detail.id)} saved={favorites.includes(detail.id)} onSave={()=>toggleFavorite(detail.id)}/><ExpoStatusBar style="dark"/></>;
 return <View style={s.app}><StatusBar barStyle="dark-content" backgroundColor={C.soft}/><View style={s.screen}>{tab==='home'?<HomeScreen name={name} onOpen={setDetail} favorites={favorites} toggleFavorite={toggleFavorite}/>:tab==='library'?<LibraryScreen name={name} email={user.email} favorites={favorites} completed={progress} onOpen={setDetail} onSave={toggleFavorite} onSettings={()=>setTab('settings')}/>:<SettingsScreen value={prefs} onSave={savePrefs} onLogout={()=>Alert.alert('Log out','Are you sure you want to log out?', [{text:'Cancel',style:'cancel'},{text:'Log out',style:'destructive',onPress:()=>{setUser(null);setTab('home');void storage.setSession(false);}}])}/>}</View><View style={s.nav}>{([['home','⌂','Home'],['library','♡','My space'],['settings','⚙','Settings']] as [Tab,string,string][]).map(([id,icon,label])=><Pressable key={id} onPress={()=>setTab(id)} style={s.navItem}><Text style={[s.navIcon,tab===id&&s.navSelected]}>{icon}</Text><Text style={[s.navLabel,tab===id&&s.navSelected]}>{label}</Text></Pressable>)}</View><ExpoStatusBar style="dark"/></View>;
}
const s=StyleSheet.create({app:{flex:1,backgroundColor:C.soft},screen:{flex:1},nav:{height:70,backgroundColor:'#fff',borderTopWidth:1,borderColor:C.line,flexDirection:'row',justifyContent:'space-around',alignItems:'center',paddingBottom:5},navItem:{alignItems:'center',justifyContent:'center',minWidth:76},navIcon:{fontSize:22,color:'#A5A6B5'},navLabel:{fontSize:10,color:'#A5A6B5',fontWeight:'700',marginTop:2},navSelected:{color:C.violet},loading:{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#fff'}});
