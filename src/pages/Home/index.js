import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contents/auth';

import { View, Text, Button } from 'react-native'

export default function index() {
    const { exitVoid } = useContext(AuthContext); // Informações de autenticação e Logout.

    return (
        <View style={{ flex: 1, backgroundColor: "#061a23" }}>
            <Text>HOME</Text>
        </View>
    )
}
