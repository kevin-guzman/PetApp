import React,{useState, useEffect, useContext} from 'react';
import {
    ScrollView,
    TouchableOpacity,
    Image,
    View
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen'
import {Publications} from '../api/querys'
import {AuthContext} from '../hooks/authContext'
import {withTheme, Text} from 'react-native-paper'
import {useNavigation} from '@react-navigation/native'
import _ from 'lodash'
import Entypo from 'react-native-vector-icons/Entypo'
const no_profile = require('../assets/no-profile.png')

const ChatList = ({}) => {
    const {setLoading} = useContext(AuthContext)
    const navigation = useNavigation()
    const [publications, setPublications] = useState({fetched:false, data:[]})
    useEffect(()=>{
        Publications().getAllPublications()
        .then(({data, status}) =>{
            console.log(data);
            setLoading(false)
            if(status === 200){
                const parsed_pubs = data.map((value)=>{
                    return{
                        pub_name: _.get(value, ['title'], 'Sin nombre de publicacion'),
                        pub_id: value._id,
                        image: _.get(value, ['image'], ''),
                        description: _.get(value, ['description'], 'Sin descripción')
                    }
                })
                console.log('parsedChats', parsed_pubs)
                setPublications({fetched:true, data:parsed_pubs})
            }
        })
        .catch(x =>{console.log('chats error', x); setLoading(false);setPublications({data:[], fetched:true})})
    },[])

    const onChatPress = () => {
    }
    return(
        <View style={{flex:1}} >
            <View style={{ width:wp(100), height:wp(13), backgroundColor:'purple', justifyContent: 'center' }} >
                <Entypo onPress={()=>{navigation.openDrawer()}}  name='menu' color='#fff' style={{fontSize:40,marginLeft:5}} />
            </View>
            <ScrollView  showsVerticalScrollIndicator={false} >
                {publications.fetched &&
                    publications.data.map((value, index)=>{
                        return <PublicationCard 
                            id={value.pub_id} 
                            onPress={onChatPress} 
                            description={value.description}
                            name={value.pub_name} photo={value.image} key={index.toString()} />
                    })
                }
            </ScrollView>
        </View>
    )
}

const PublicationCard = ({name='', photo='', onPress=()=>{}, id, description=''}) => {
    return (
        <TouchableOpacity style={{width:wp(90),height:hp(10), marginVertical:hp(2), borderColor:'#000', borderWidth:1,alignSelf:'center', flexDirection:'row', borderRadius:5}} onPress={()=>onPress(id, name, photo)}  >
            <Image source={photo?{uri:photo}:no_profile} style={{resizeMode:'contain', width:wp(15), height:hp(5), alignSelf:'center'}} />
            <View style={{justifyContent:'center'}} >

                <Text style={{alignSelf:'center'}} >{name}</Text>
                <Text style={{alignSelf:'center'}} >{description}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default withTheme(ChatList)