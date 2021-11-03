import React, { useEffect, useState, useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AuthContext } from '../contents/auth';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../services/connFirebase';
import Home from '../pages/Home';

import { View, Text } from 'react-native'
import CustomDrawer from '../components/CustomDrawer';
import Profile from '../pages/Profile';
import Registry from '../pages/Registry';
import Finance from '../pages/Finanças';

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
    const [isConected, setIsConected] = useState(false);
    const { user, setUser } = useContext(AuthContext);

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            // initialRouteName={'Finanças'}
            screenOptions={({ route }) => ({
                drawerStyle: {
                    backgroundColor: '#061a23',
                    borderRadius: 10,
                },
                drawerLabelStyle: {
                    fontWeight: 'bold'
                },
                drawerActiveTintColor: '#0ff',
                drawerActiveBackgroundColor: 'transparent',
                drawerInactiveTintColor: "#d3dde9aa",
                drawerItemStyle: {
                    // borderWidth: 1, borderRadius: 10, borderColor: "#bbb5",
                    // borderBottomWidth: 1, 
                    // borderColor: "#d3dde9aa"
                },
                // headerShown: false,
                drawerIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-outline';
                    } else if (route.name === 'Registrar') {
                        iconName = focused ? 'create' : 'create-outline';
                    } else if (route.name === 'Perfil') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name === 'Finanças') {
                        iconName = focused ? 'pie-chart' : 'pie-chart-outline';
                    }
                    // else if (route.name === 'Notas') {
                    //     iconName = focused ? 'reader' : 'reader-outline';
                    // }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Perfil" component={Profile} />
            <Drawer.Screen name="Registrar" component={Registry} />
            <Drawer.Screen name="Finanças" component={Finance} />
        </Drawer.Navigator>
    )
}
