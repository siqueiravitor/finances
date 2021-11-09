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
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                flex: 1,
                justifyContent: 'center',
            }}>
                <TouchableWithoutFeedback onPress={onBackDropPress}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
                <View style={[{ flex: 1 }, style]}>
                    {children}
                </View>
                <TouchableWithoutFeedback onPress={onBackDropPress}>
                    <View style={{ flex: 1 }} />
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    );
}
