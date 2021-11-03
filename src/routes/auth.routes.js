import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword';

const AuthStack = createStackNavigator();

export default function AuthRoutes() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
            <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
        </AuthStack.Navigator>
    )
}
