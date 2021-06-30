import React, { useEffect, useState, useMemo, useReducer} from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import {DrawerNavigator} from './DrawerNavigator'
import {AuthContext} from '../hooks/authContext'
import {AuthStack} from './AuthStack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'
import {
	Provider as PaperProvider,
	DarkTheme as DarkThemePaper,
	DefaultTheme as DefaultThemePaper,
} from "react-native-paper";
import {
	NavigationContainer,
	DarkTheme as DarkThemeNavigation,
	DefaultTheme as DefaultThemeNavigation,
} from "@react-navigation/native";
import Loading from '../components/LoadingModal'
import {Assets} from '../api/querys'
import { dark, light } from "../constants/colors";

const Root = createStackNavigator()
const RootStack = ({token}) => {
    if(token){
        return(
            <Root.Navigator headerMode='none' >
                <Root.Screen name='App' component={DrawerNavigator} />
            </Root.Navigator>
        )
    }
    return(
        <Root.Navigator headerMode='none' >
            <Root.Screen name='Auth' component={AuthStack} />
        </Root.Navigator>
    )
}

const MainNavigator = ({}) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({name:'', photo:'', email:'', token:'', token_type:'Bearer', id:''})
    const logOut = () => {
        AsyncStorage.clear(resp => {
            setUser({name:'', photo:'', email:'', token:'', token_type:'Bearer', id:''}); 
        })
    }
    const setDefaultsAxios = (token, token_type) => {
        axios.defaults.headers.common.Authorization = `${token_type} ${token}`
    }
    useEffect(()=>{
        setLoading(true)
        AsyncStorage.getItem('user')
        .then(value =>{
            if(value){
                setUser(JSON.parse(value))
                const {token, token_type} = JSON.parse(value) 
                setDefaultsAxios(token, token_type)
            }
            setLoading(false)
        })
        .catch(err => setLoading(false))
    },[])
    useEffect(()=>{
        if(user.name!=='' &&  user.token!=='' && user.id!=='') {
            AsyncStorage.setItem('user', JSON.stringify(user), value => {
                const {token, token_type} = user
                setDefaultsAxios(token, token_type)
            })
        }
        
    },[user])

    DefaultThemePaper.colors.primary = light.primary;
	DefaultThemePaper.colors.accent = light.accent;
	DefaultThemePaper.colors.text = dark.text;
	DarkThemePaper.colors.primary = dark.primary;
	DarkThemePaper.colors.accent = dark.accent;
    DefaultThemePaper.roundness=7
    // DefaultThemePaper.
    // DefaultThemePaper.colors.surface='#000'

	DefaultThemeNavigation.colors.background = light.background;

	DarkThemeNavigation.colors.background = dark.background;
	DarkThemeNavigation.colors.card = dark.card;
    
    return(
        <AuthContext.Provider  value={{loading, setLoading, user, setUser, logOut}} >
            <Loading />
            <NavigationContainer>
                <PaperProvider>
                    <RootStack token={user.token} />
                </PaperProvider>
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default MainNavigator