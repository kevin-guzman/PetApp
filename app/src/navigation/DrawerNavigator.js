import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import {DrawerContentView} from './DrawerConten'
// import Chat from '../screens/Chat'
import PublicationsList from '../screens/PublicationsList'


const Drawer = createDrawerNavigator()
export const DrawerNavigator = ({}) => {
    return(
        <Drawer.Navigator
            drawerContent={(props)=><DrawerContentView {...props} />}
            initialRouteName='PublicationsList'
            drawerStyle={{flex:1}}
            >
            {/* <Drawer.Screen name='Chat' initialParams={{uid:null}} component={Chat} /> */}
            <Drawer.Screen name='PublicationsList' component={PublicationsList} />
        </Drawer.Navigator>
    )
}