import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useForm from '../hooks/useForm';
import {User} from '../api/querys';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../hooks/authContext';
import {Text, TextInput, Button} from 'react-native-paper';
import {ShowToast, ToastTypes, ToastDeafults} from '../functions/ShowToast';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {catBackground} from '../assets'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'

const Login = ({}) => {
  const {
    setUser,
    setLoading,
  } = useContext(AuthContext);
  const initialValues = {name: '', password: ''};
  const form = useForm({initialValues});
  const navigation = useNavigation();
  const onLogIn = () => {
    const {name, password} = form.fields;
    if (form.ValidateForm()) {
      setLoading(true);
      User()
        .logIn(name, password)
        .then(({data, status}) => {
          setLoading(false);
          if (status === 200) {
            const obj = {...data, token_type: 'Bearer', id: data._id};
            delete obj['_id'];
            ShowToast(
              ToastDeafults.success,
              'Has iniciado sesión correctamente.',
              ToastTypes.success,
            );
            setUser(obj);
          } else {
            ShowToast(
              ToastDeafults.info,
              'Credenciales incorrectas.',
              ToastTypes.info,
            );
          }
        })
        .catch((x) => {
          setLoading(false);
          ShowToast(
            ToastDeafults.error,
            'Ocurrió un error de conexión.',
            ToastTypes.error,
          );
        })
    } else {
      ShowToast(
        ToastDeafults.info,
        'Todos los campos son necesarios.',
        ToastTypes.info,
      );
    }
  };

  return (
    <KeyboardAwareScrollView style={{flex: 1}} contentContainerStyle={{justifyContent: 'space-between'}} >
      <View style={{flexDirection:'row', alignSelf: 'center', marginTop: hp(3),}}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: wp(10),
            fontWeight: 'bold',
          }}>
          PetApp
        </Text>
        <MaterialIcons  name="pets" color='#000' style={{fontSize:wp(10), alignSelf: 'center', marginLeft:20}} />
      </View>
      <Image source={catBackground} style={{resizeMode:'contain', width:wp(100), height:wp(50), marginLeft:wp(20)}}  />
      <View style={{ justifyContent: 'center', marginTop: hp(5)}}>
        <TextInput
          keyboardType='email-address'
          style={{
            width: wp(80),
            alignSelf: 'center',
          }}
          label="Dirección de correo electrónico"
          {...form.getInput('name')}
        />
        <TextInput
          style={{
            width: wp(80),
            alignSelf: 'center',
            marginTop:hp(3)
          }}
          secureTextEntry
          label="Contraseña"
          {...form.getInput('password')}
        />
      </View>
      <View style={{marginTop: hp(15)}}>
          <Button mode='contained' onPress={() => onLogIn()}style={{width: wp(90),height: hp(7),alignSelf: 'center', justifyContent: 'center'}} >
            Ingresar
          </Button>
          <Button style={{alignSelf: 'center', justifyContent: 'center', fontSize:10, marginTop:hp(2), color:'red'}} onPress={() => navigation.navigate('Register')} >
            ¿No tienes una cuenta?, presiona aquí
          </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};


export default Login;
