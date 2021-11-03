import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Alert, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../contents/auth';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import firebase from '../../services/connFirebase';
import { styles } from '../../include/styles'
import { CategoryPicker, Picker } from '../../components/Picker';
import { getDataHojeSeparador, moneyFormat } from '../../include/config/funcoes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../include/loading';

export default function Registry() {
    const navigation = useNavigation();
    const { user: usuario } = useContext(AuthContext);
    const [valor, setValor] = useState("");
    const [desc, setDesc] = useState("");
    const [tipo, setTipo] = useState(null);
    const [color, setColor] = useState("#0af");
    const [categoria, setCategoria] = useState(null);
    const [descColor, setDescColor] = useState("#0af");
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(false)
    const isFocused = useIsFocused();

    //GET saldo
    useFocusEffect(() => {
        firebase.database().ref('usuarios').child(usuario.uid).get('saldo')
            .then((snapshot) => {
                setBalance(parseFloat(snapshot.val().saldo))
                setLoading(false)
            })
            .catch((e) => {
                console.log(e)
            })
    })

    async function handleSubmit() {
        Keyboard.dismiss();


        if (isNaN(parseFloat(valor)) && (tipo === null || categoria === null)) {
            Alert.alert('Atenção', 'Valor, tipo e categoria são obrigatórios!');
            return;
        }
        else if (isNaN(parseFloat(valor)) || (tipo === null || categoria === null)) {
            isNaN(parseFloat(valor))
                ? Alert.alert('Atenção', 'Digite o valor!')
                : Alert.alert('Atenção', `Selecione ${tipo === null ? 'o tipo' : 'a categoria'}!`);
            return;
        }

        Alert.alert(
            'Confirmando dados',
            `Tipo ${tipo} \nValor: R$ ${moneyFormat(valor)}  \nCategoria: ${categoria} \nDescrição: ${desc}`,
            [
                {
                    text: 'Cancelar',
                    style: 'cancel'
                },
                {
                    text: 'Registrar',
                    onPress: () => handleAdd()
                }
            ]
        )
    }

    async function handleAdd() {
        let uid = usuario.uid;
        let key = await firebase.database().ref('historico').child(uid).push().key;
        let dados;
        dados = {
            tipo: tipo,
            categoria: categoria,
            valor: parseFloat(valor),
            description: desc,
            date: getDataHojeSeparador('-')
        }

        await firebase.database().ref('historico').child(uid).child(getDataHojeSeparador('-')).child(tipo).child(key).set({
            key: key,
            tipo: tipo,
            categoria: categoria,
            valor: parseFloat(valor),
            description: desc,
            date: getDataHojeSeparador('-')
        })
            .then(async () => {
                console.log('Ação salva com sucesso! ------------ DB ------')

                let income

                if (tipo === 'despesa') {
                    income = parseFloat(balance) - parseFloat(valor)
                    setBalance(income.toString())
                } else {
                    income = parseFloat(balance) + parseFloat(valor)
                    setBalance(income.toString())
                }

                await firebase.database().ref('usuarios').child(usuario.uid).child('saldo').set(income.toString())
                    .then(() => {
                        console.log('Saldo atualizado com sucesso!!!')
                    })
                    .catch((e) => {
                        console.log(e)
                    })


                setValor('')
                setDesc('')
            })
            .catch((e) => {
                console.log(e)
            })
        Keyboard.dismiss();
    }

    useEffect(() => {
        setValor('');
        setDesc('');
    }, [])
    if (loading) {
        return (
            <Loading />
        )
    } else {
        return (
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>

                <View style={[styles.center, { backgroundColor: "#000" }]}>
                    <View style={{ flex: 2, justifyContent: "center" }}>
                        {/* <Text style={{ textAlign: 'center', color:"#f1f5f7", fontSize: 24}}>Registar lucros e despesas</Text> */}
                    </View>

                    <View style={{ flex: 4 }}>
                        <View style={styles.inputArea}>
                            <TextInput
                                autoCorrect={false}
                                style={[styles.input, { borderColor: color }]}
                                color="#0af"
                                keyboardType="numeric"
                                placeholder="Valor desejado"
                                placeholderTextColor="#9999"
                                onFocus={() => setColor("#0ff")}
                                onBlur={() => setColor("#0af")}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                value={valor}
                                onChangeText={(text) => setValor(text)}
                            />
                        </View>
                        <View style={styles.inputArea}>
                            <TextInput
                                autoCorrect={false}
                                style={[styles.input, { borderColor: descColor }]}
                                color="#0af"
                                placeholder="Descrição"
                                placeholderTextColor="#9999"
                                onFocus={() => setDescColor("#0ff")}
                                onBlur={() => setDescColor("#0af")}
                                onSubmitEditing={() => Keyboard.dismiss()}
                                value={desc}
                                onChangeText={(text) => setDesc(text)}
                            />
                        </View>

                        <View style={styles.inputArea}>
                            <Picker onChange={setTipo} tipo={tipo} />
                        </View>
                        <View style={styles.inputArea}>
                            <CategoryPicker onChange={setCategoria} tipo={tipo} />
                        </View>
                    </View>

                    <View style={[styles.buttonArea, { flex: 1 }]}>
                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
                            <Text style={styles.buttonText}>Registrar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        )
    }
}
