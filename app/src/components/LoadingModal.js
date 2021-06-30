import React, {useContext} from 'react'
import {Modal, ActivityIndicator, View} from 'react-native'
import { Text } from 'react-native-paper'
import {AuthContext} from '../hooks/authContext'

const Loading = ({visible}) => {
  const {loading} = useContext(AuthContext)
  return(
      <Modal 
        visible={loading} 
        transparent
        animationType='slide'
        style={{flex:1, justifyContent:'center', backgroundColor:'red', opacity:1}} >
        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex:1, justifyContent:'center'}} >
            <ActivityIndicator size={40} color='#fff' style={{alignSelf:'center', /* flex:1 */}} />
            <Text style={{alignSelf:'center', fontWeight:'bold', fontSize:20}} >Cargando...</Text>
        </View>
      </Modal>
  )
}

export default Loading