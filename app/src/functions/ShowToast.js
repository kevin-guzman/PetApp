import Toast from "react-native-toast-message"

export const ToastTypes = {
  success:'success',
  error:'error',
  info:'info'
}
export const ToastPositions = {
  top:'top',
  bottom:'bottom'
}
export const ToastDeafults = {
  success:'Realizado ✅',
  error:'Error ❎',
  info:'Atención ‼'
}
export const ShowToast = (titie='', message='', type='success', position='top') => {
  Toast.show({
    type,
    text1: titie,
    text2: message,
    position,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 20,
    // bottomOffset: 20,
  })
}