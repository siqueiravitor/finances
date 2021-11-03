import React, { useContext } from 'react'
import { View, Text, ImageBackground, Dimensions } from 'react-native'
import { DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';
import { AuthContext} from '../../contents/auth'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'; 

export default function CustomDrawer(props) {
    const { user, signOut } = useContext(AuthContext);
    const windowHeight = Dimensions.get('window').height;
    const navigation = useNavigation();

    return (
        <View {...props}>
            <View style={{ height: windowHeight - 10 }}>
                <View style={{ 
                                alignItems: 'center', 
                                justifyContent: 'center', 
                                marginTop: 25, 
                                paddingBottom: 10, 
                                // borderBottomWidth: 1,
                                // borderRadius: 24,
                                borderColor: "#d3dde9aa" 
                            }}
                >
                    <ImageBackground
                        // source={require('../../assets/Logo.png')}
                        source={{ uri: "https://i.pinimg.com/originals/dc/2d/14/dc2d14bf8591b7ebe65203b02d0a4d45.jpg" }}
                        resizeMode="cover" 
                        style={{
                            paddingVertical: 15,
                            width:"100%",
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            borderBottomWidth: 1,
                            borderColor: "#d3dde9aa" 
                        }}
                    >
                    <View style={{ 
                        backgroundColor: "#0773" ,
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        width: "100%",
                        marginTop: -15,
                        marginBottom: -15,
                        paddingTop: 5,
                        paddingBottom: 5
                    }}>
                    <Ionicons name="person-circle-outline" size={120} color="#fff" />
                        <Text style={{ color: '#FFF', fontSize: 20, fontWeight: 'bold'}}>
                            {user.nome}
                        </Text>
                        <Text style={{ color: '#FFF', fontSize: 12, }}>
                            {user.email}
                        </Text>
                    </View>
                    </ImageBackground>
                </View>
                <DrawerItemList {...props}/>
            </View>


            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <DrawerItem 
                    {...props}
                    label=""        
                    // inactiveBackgroundColor="#c62c36"    
                    inactiveTintColor="#fff"
                    onPress={()=> signOut()}
                    icon= {() => <Ionicons name="power" size={24} color="#f00" /> }
                    // style={{ borderTopWidth: 1, borderRadius: 10, borderTopColor: "#bbb5" }}
                    style={{ maxWidth: 40 }}
                />
                <DrawerItem 
                    {...props}
                    label=""        
                    // inactiveBackgroundColor="#c62c36"    
                    inactiveTintColor="#fff"
                    onPress={()=> navigation.navigate('Perfil')}
                    icon= {() => <Ionicons name="person-circle-outline" size={26} color="#f1f5f7" /> }
                    // style={{ borderTopWidth: 1, borderRadius: 10, borderTopColor: "#bbb5" }}
                    style={{ maxWidth: 40 }}
                />
            </View>
            {/* <View>
                <DrawerItem 
                    {...props}
                    label="Logoff"        
                    // inactiveBackgroundColor="#c62c36"    
                    inactiveTintColor="#fff"
                    onPress={()=> signOut()}
                    icon= {() => <SimpleLineIcons name="logout" size={16} color="#fff" /> }
                    style={{ borderTopWidth: 1, borderRadius: 10, borderTopColor: "#bbb5" }}
                />
            </View> */}

        </View>
    )
}
