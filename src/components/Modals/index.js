import React from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native';
import ModalModel from '../ModalModel';

export function Alerta({ children, setVisible, visible }) {
    return (
        <ModalModel
            visible={visible}
            onBackDropPress={() => setVisible(false)}
            style={{ flex: 1, justifyContent:"center", paddingHorizontal: 30 }}
        >
            <View style={[{
                backgroundColor: '#061a23',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#0ff",
                minHeight: 140,
                overflow: 'hidden',
            }]}>
                {children}
            </View>
        </ModalModel>
    )
}
export function Details({ children, setVisible, visible }) {
    return (
        <ModalModel
            visible={visible}
            onBackDropPress={() => setVisible(false)}
            style={{ padding: 30 }}
        >
            <View style={[{
                backgroundColor: '#061a23',
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#0ff",
                minHeight: 225,
                overflow: 'hidden',
            }]}>
                {children}
            </View>
        </ModalModel>
    )
}

export function Success({ children, setVisibleSuccess, visibleSuccess }) {
    return (
        <ModalModel
            visible={visibleSuccess}
            onBackDropPress={() => setVisibleSuccess(false)}
            style={{ padding: 30 }}
        >
            <View style={[{
                backgroundColor: '#061a23',
                borderRadius: 12,
                minHeight: 290,
                overflow: 'hidden',
            }]}>
                <View style={{ alignItems: 'center', flex: 3 }}>
                    <LottieView
                        loop={false}
                        autoPlay
                        style={{
                            width: 240,
                            height: 160
                        }}
                        source={require('../../assets/animations/success.json')}
                    />
                </View>
                {children}
            </View>
        </ModalModel>
    )
}
export function Error({ children, visibleError, setVisibleError }) {
    return (
        <ModalModel
            visible={visibleError}
            onBackDropPress={() => setVisibleError(false)}
            style={{ padding: 30 }}
        >
            <View style={[{
                backgroundColor: '#061a23',
                borderRadius: 12,
                minHeight: 290,
                overflow: 'hidden',
            }]}>
                <View style={{ alignItems: 'center', flex: 3 }}>
                    <LottieView
                        loop={false}
                        autoPlay
                        style={{
                            width: 240,
                            height: 160
                        }}
                        source={require('../../assets/animations/error.json')}
                    />
                </View>
                {children}
            </View>
        </ModalModel>
    )
}
export function Warning({ children, visibleWarning, setVisibleWarning }) {
    return (
        <ModalModel
            visible={visibleWarning}
            onBackDropPress={() => setVisibleWarning(false)}
            style={{ padding: 30 }}
        >
            <View style={[{
                backgroundColor: '#f1f5f7',
                borderRadius: 12,
                minHeight: 290,
                overflow: 'hidden',
            }]}>
                <View style={{ alignItems: 'center' }}>
                    <LottieView
                        loop={false}
                        autoPlay
                        style={{
                            width: 240,
                            height: 160
                        }}
                        source={require('../../assets/animations/warning.json')}
                    />
                </View>
                {children}
            </View>
        </ModalModel>
    )
}
export function PasswordReset({ children, setVisibleSuccess, visibleSuccess }) {
    return (
        <ModalModel
            visible={visibleSuccess}
            onBackDropPress={() => setVisibleSuccess(false)}
            style={{ padding: 30 }}
        >
            <View style={[{
                backgroundColor: '#fff',
                borderRadius: 12,
                minHeight: 290,
                overflow: 'hidden',
            }]}>
                <View style={{ alignItems: 'center' }}>
                    <LottieView
                        loop={false}
                        autoPlay
                        style={{
                            width: 240,
                            height: 160
                        }}
                        source={require('../../assets/animations/passwordReset.json')}
                    />
                </View>
                {children}
            </View>
        </ModalModel>
    )
}
