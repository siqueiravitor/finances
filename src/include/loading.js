import React from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native';

export default function Loading({ tipo = 'padrão' }) {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}}>
            {
                tipo === 'padrão' ?
                <LottieView source={require('../assets/animations/loading.json')} loop autoPlay/>
                :
                <LottieView source={require('../assets/animations/loading2.json')} speed={1.5} loop autoPlay/>

            }
        </View>
    )
}
