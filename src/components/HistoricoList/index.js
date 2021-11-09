import React, { useRef } from 'react'
import { Text, TouchableOpacity, View, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moneyFormat } from '../../include/config/funcoes'
import { styles } from '../../include/styles';
import { Swipeable } from 'react-native-gesture-handler/';

export default function HistoricoList({ data, deleteItem, handleLeft, handleRight }) {
    function leftOpen() {
        handleLeft(data)
    }

    function LeftActions(progress, dragX) {

        const scale = dragX.interpolate({
            inputRange: [0, 100],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })

        return (
            <View style={{
                backgroundColor: "#061a43",
                justifyContent: 'center',
                flex: 1,
                borderRadius: 4,
                marginBottom: 12,
            }}>
                <Animated.Text
                    style={{
                        color: "#0ff",
                        paddingHorizontal: 10,
                        fontSize: 16,
                        transform: [{ scale }]
                    }}
                >
                    Ver detalhes
                </Animated.Text>
            </View>
        )
    }
    function RightActions({ progress, dragX, onPress }) {

        const scale = dragX.interpolate({
            inputRange: [-100, 0],
            outputRange: [1.5, 0],
            extrapolate: 'clamp'
        })

        return (
            <View style={{
                backgroundColor: "#FF0303aa",
                justifyContent: 'center',
                borderRadius: 4,
                marginBottom: 12,
            }}>
                <TouchableOpacity onPress={() => handleRight(data)}>
                    <Animated.Text
                        style={{
                            color: "#fff",
                            paddingHorizontal: 10,
                            fontSize: 16,
                            transform: [{ scale }]
                        }}
                    >
                        Excluir
                    </Animated.Text>
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Swipeable
            // ref={swipeRef}
            leftThreshold={100}
            renderLeftActions={LeftActions}
            onSwipeableLeftOpen={leftOpen}
            renderRightActions={(progress, dragX) => <RightActions progress={progress} dragX={dragX} />}
        >
            <View style={styles.container}>
                <View style={{ flexDirection: 'row', marginRight: 5 }}>
                    <View tipo={data.tipo}
                        style={{
                            backgroundColor: data.tipo === 'despesa' ? '#C62C36' : '#049301',
                            flexDirection: 'row',
                            paddingBottom: 3,
                            paddingTop: 3,
                            paddingLeft: 8,
                            paddingRight: 8,
                            borderRadius: 7
                        }}
                    >
                        <Ionicons
                            name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
                            color='#FFF'
                            size={20}
                        />
                        <Text style={{ color: "#fff", fontSize: 16, fontStyle: "italic", marginHorizontal: 5 }}>{data.categoria}</Text>
                    </View>
                </View>
                <Text style={{ color: "#f1f5f7", fontSize: 20, fontWeight: "bold" }}>
                    {/* R$ {moneyFormat(data.valor)} */}
                    R$ {moneyFormat(data.valor)}
                </Text>
            </View>
        </Swipeable>
    )
}
