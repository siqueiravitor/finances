import React from 'react'
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { styles } from '../../include/styles';

export function Picker({ onChange, tipo }) {
    return (
        <View style={styles.picker}>
            <RNPickerSelect
                style={{
                    inputIOS: {
                        height: 50,
                        padding: 5,
                        backgroundColor: '#FFF',
                        fontSize: 16
                    },
                    inputAndroid: {
                        color: '#0af',
                        height: 50,
                    },
                }}
                placeholder={{
                    label: 'Selecione o tipo',
                    color: '#999',
                    value: null,
                }}
                onValueChange={valor => onChange(valor)}
                items={[
                    { label: 'Receita', value: 'receita', color: '#222' },
                    { label: 'Despesa', value: 'despesa', color: '#222' },
                ]}
            />

        </View>
    )
}

export function CategoryPicker({ onChange, tipo = 'despesa' }) {
    return (
        <View style={styles.picker}>
            <RNPickerSelect
                style={{
                    inputIOS: {
                        height: 50,
                        padding: 5,
                        backgroundColor: '#FFF',
                        fontSize: 16
                    },
                    inputAndroid: {
                        color: '#0af',
                        height: 50,
                    },
                }}
                placeholder={{
                    label: tipo === null ? 'Primeiro selecione o tipo' : 'Selecione a categoria',
                    color: tipo === null ? '#f007' : '#999',
                    value: null,
                }}
                onValueChange={valor => onChange(valor)}
                items={
                    tipo === 'despesa' ?
                        [

                            { label: 'Alimenta????o', value: 'alimentacao', color: '#222' },
                            { label: 'Mercado', value: 'mercado', color: '#222' },
                            { label: 'Conta', value: 'conta', color: '#222' },
                            { label: 'Lazer', value: 'lazer', color: '#222' },
                            { label: 'Outro', value: 'outro', color: '#222' },
                        ]
                        :
                        tipo === 'receita' ?
                        [
                            { label: 'Sal??rio', value: 'salario', color: "#222"},
                            { label: 'Outro', value: 'outro', color: "#222"}
                        ]
                        :
                        [
                            
                        ]
                }
            />

        </View>
    )
}

export function HistoricoPicker({ onChange, tipo }) {
    return (
        <View style={{ minWidth: 180}}>
            <RNPickerSelect
                style={{
                    inputIOS: {
                        height: 50,
                        padding: 5,
                        backgroundColor: '#FFF',
                        fontSize: 16
                    },
                    inputAndroid: {
                        color: '#0af',
                        height: 30,
                        marginTop: -20,
                    },
                }}
                placeholder={{
                    label: 'Movimenta????es',
                    color: '#999',
                    value: 0,
                }}
                onValueChange={valor => onChange(valor)}
                items={[
                    // { label: 'Movimenta????es', value: 0, color: '#222' },
                    { label: 'Gr??fico em linha', value: 1, color: '#222' },
                    { label: 'Gr??fico de Barras', value: 2, color: '#222' },
                    { label: 'Gr??fico de Pizza', value: 3, color: '#222' },
                ]}
            />

        </View>
    )
}