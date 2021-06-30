import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import Login from '../screens/Login'
import Register from '../screens/Register'

const Auth = createStackNavigator()
export const AuthStack = ({}) => {
    return(
        <Auth.Navigator headerMode='none' >
            <Auth.Screen name='Login' component={Login} />
            <Auth.Screen name='Register' component={Register} />
        </Auth.Navigator>
    )
}