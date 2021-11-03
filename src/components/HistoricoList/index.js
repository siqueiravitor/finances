import React from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { moneyFormat } from '../../include/config/funcoes'
import { styles } from '../../include/styles';

export default function HistoricoList({ data, deleteItem }) {
    return (
        <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
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
                            name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up' } 
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
        </TouchableWithoutFeedback>
    )
}
