import React, {useContext, useEffect} from 'react'
import {View} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import useForm from '../hooks/useForm'
import {User} from '../api/querys'
import {AuthContext} from '../hooks/authContext'
import { ShowToast, ToastTypes, ToastDeafults } from '../functions/ShowToast'
import {Text, TextInput, Button} from 'react-native-paper'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

const Register = ({}) => {
    const initialValues = {name:'', password:'', email:'',password2:''}
    const {setUser} = useContext(AuthContext)
    const form = useForm({initialValues})
    const onRegister = () => {
        if(form.ValidateForm()){
            const {name, password, email, password2} = form.fields
            const formData = new FormData()
            formData.append('name', name)
            formData.append('password', password)
            formData.append('email', email)
            formData.append('password2',password2)
            User(true)
            .singUp(formData)
            .then(({data, status}) => {
                console.log('Data of register', data, status);
                if(status===201) {
                    const obj = {...data, token_type:'Bearer', id: data._id}
                    delete obj['_id']
                    ShowToast(ToastDeafults.success, 'Has iniciado sesión correctamente.', ToastTypes.success)
                    setUser(obj)
                }else if(status === 206){
                    // Usuario ya existe
                    ShowToast(ToastDeafults.error, 'Este usuario ya está registrado.', ToastTypes.error)
                    console.log(data);
                }
            })
        }else{
            ShowToast(ToastDeafults.info, 'Todos los campos son necesarios.', ToastTypes.info)
        }
    }
    return(
        <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{justifyContent: 'space-between'}}>
            <Text style={{alignSelf:'center', fontSize:wp(10), marginTop:hp(7), fontWeight:'bold'}} >¡Registrate!</Text>
            <View style={{flex:3, justifyContent:'center'}} >
                <TextInput placeholderTextColor='#000' style={{width:wp(80), alignSelf:'center', marginTop:hp(8)}} label='Nombre de usuario' {...form.getInput('name')} />
                <TextInput placeholderTextColor='#000' style={{width:wp(80), alignSelf:'center', marginTop:hp(3)}} label='Contraseña' {...form.getInput('password')} />
                <TextInput placeholderTextColor='#000' style={{width:wp(80), alignSelf:'center', marginTop:hp(3)}} label='Confirmar contraseña' {...form.getInput('password2')} />
                <TextInput placeholderTextColor='#000' style={{width:wp(80), alignSelf:'center', marginTop:hp(3)}} label='Email' {...form.getInput('email')} />
            </View>
            <View style={{marginTop:hp(7)}} >
                <Button mode='contained' onPress={() => onRegister()}style={{width: wp(90),height: hp(7),alignSelf: 'center', justifyContent: 'center'}} >
                    Registrarme
                </Button>
            </View>
        </KeyboardAwareScrollView>
    )
}

export default Register