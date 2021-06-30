import React, { useContext} from 'react'
import { Text, SafeAreaView, TouchableOpacity } from 'react-native'
import {AuthContext} from '../hooks/authContext'
import {DrawerContent, DrawerItem} from '@react-navigation/drawer'

export const DrawerContentView = (props) => {
    const {logOut} = useContext(AuthContext)
    const options = [
        {title:'Opciones', onPress:()=>{}},
        {title:'Cerrar sesión', onPress:()=>logOut()},
    ]
    if(props){
        var {navigation} = props
    }
    const Item = ({title='', onPress=()=>{}}) => {
        return  <TouchableOpacity onPress={()=>onPress()} ><Text style={{marginLeft:5, fontSize:15, fontWeight:'bold'}} >{title}</Text></TouchableOpacity>
    }
    return(
        <SafeAreaView style={{flex:1}} >
            {options.map((value, index)=>{
                return <Item key={index.toString()} title={value.title} onPress={()=>value.onPress()} />
            })}
        </SafeAreaView>
    )
}


