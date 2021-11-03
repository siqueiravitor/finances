import React, { useContext, useRef, useState } from 'react';
// import {PageContext} from '../../../App';
import { View, Text, TouchableOpacity, Image, TextInput, Alert, Modal, TouchableWithoutFeedback } from 'react-native';

export default function ({ children, onBackDropPress, visible = true, style }) {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}>
            <View style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'center',
            }}>
                <TouchableWithoutFeedback onPress={onBackDropPress}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
                <View style={[{ padding: 20 }, style]}>

                    <View style={[{
                        backgroundColor: 'transparent',
                        borderWidth: 0,
                        borderRadius: 12,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                        elevation: 5,
                        marginBottom: 1,
                    }]}>
                        {children}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={onBackDropPress}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
}
