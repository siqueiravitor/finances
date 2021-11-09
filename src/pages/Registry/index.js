import React, { useState, useContext, useEffect } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { AuthContext } from '../../contents/auth';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import firebase from '../../services/connFirebase';
import { styles } from '../../include/styles'
import { CategoryPicker, Picker } from '../../components/Picker';
import { FirstLetterUpperCase, getDataHojeSeparador, moneyFormat } from '../../include/config/funcoes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../include/loading';
import { Alerta, Details, Error, Success } from '../../components/Modals';

export default function Registry() {
    const [msg, setMsg] = useState('')
    const [visible, setVisible] = useState(false);
    const [visibleErro, setVisibleErro] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const { user: usuario } = useContext(AuthContext);
    const [valor, setValor] = useState("");
    const [desc, setDesc] = useState("");
    const [tipo, setTipo] = useState(null);
    const [color, setColor] = useState("#0af");
    const [categoria, setCategoria] = useState(null);
    const [descColor, setDescColor] = useState("#0af");
    const [balance, setBalance] = useState(0)
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation();

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
        console.log(tipo)
        console.log(desc)
        console.log(valor)
        console.log(categoria)
        Keyboard.dismiss();

        if (isNaN(parseFloat(valor)) && (tipo === null || categoria === null)) {
            setMsg('Campos obrigatórios: \nValor, tipo e categoria!')
            setVisibleAlert(true)
            return;
        }
        else if (isNaN(parseFloat(valor)) || (tipo === null || categoria === null)) {
            isNaN(parseFloat(valor))
                ? setMsg('Digite o valor!')
                : setMsg(`Selecione ${tipo === null ? 'o tipo' : 'a categoria'}!`)
            setVisibleAlert(true)
            return;
        }

        setVisible(true)
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
                        setVisibleSuccess(true)
                    })
                    .catch((e) => {
                        setVisibleErro(true)
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
                                multiline={true}
                                maxLength={30}
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

                    {/* MODAIS */}
                    <Alerta setVisible={setVisibleAlert} visible={visibleAlert} >
                        <View style={{ flex: 1, marginTop: 10 }}>
                            <Text style={[styles.modalText, { marginBottom: 25, color: "#ff7703DD" }]}>Atenção!</Text>
                            <View style={{ flex: 1, justifyContent: "center", marginBottom: 25 }} >
                                <Text style={styles.modalText}>{msg}</Text>
                            </View>
                            <View style={[styles.buttonArea, { marginBottom: 25 }]}>
                                <TouchableOpacity style={styles.buttonLight} onPress={() => setVisibleAlert(false)}>
                                    <Text style={styles.buttonText}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Alerta>
                    <Success setVisibleSuccess={setVisibleSuccess} visibleSuccess={visibleSuccess} >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.modalText}>{tipo && FirstLetterUpperCase(tipo)} registrada com sucesso!</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingBottom: 30,  }}>
                            <View style={[styles.buttonArea, { flex: 1, alignItems: 'center' }]}>
                                <TouchableOpacity style={[styles.buttonLight, {width: 100}]} onPress={() => navigation.navigate('Finanças')}>
                                    <Text style={styles.buttonText}>Finanças</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={[styles.buttonArea, { flex: 1, alignItems: 'center' }]}>
                                <TouchableOpacity style={[styles.buttonLight, {width: 100}]} onPress={() => setVisibleSuccess(false)}>
                                    <Text style={styles.buttonText}>Fechar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Success>
                    <Error setVisibleError={setVisibleErro} visibleError={visibleErro} >
                        <View style={{ flex: 1 }}>
                            <Text style={styles.modalText}>Erro ao registrar</Text>
                        </View>
                        <View style={[styles.buttonArea, { flex: 1 }]}>
                            <TouchableOpacity style={styles.buttonLight} onPress={() => setVisibleErro(false)}>
                                <Text style={styles.buttonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </Error>
                    <Details setVisible={setVisible} visible={visible} >
                        <View style={{ flex: 1, }}>
                            <View style={{ flex: 3 }}>
                                <View style={{ padding: 15 }}>
                                    <Text style={styles.simpleText}>
                                        <Text style={{ fontWeight: 'bold', color: "#0af" }}>Tipo: </Text>
                                        {`${tipo && FirstLetterUpperCase(tipo)}`}
                                    </Text>
                                    <Text style={styles.simpleText}>
                                        <Text style={{ fontWeight: 'bold', color: "#0af" }}>Categoria: </Text>
                                        {`${categoria && FirstLetterUpperCase(categoria)}`}
                                    </Text>
                                    <Text style={styles.simpleText}>
                                        <Text style={{ fontWeight: 'bold', color: "#0af" }}>Descrição: </Text>
                                        {`${desc && FirstLetterUpperCase(desc)}`}
                                    </Text>
                                    <Text style={styles.simpleText}>
                                        <Text style={{ fontWeight: 'bold', color: "#0af" }}>Valor: </Text>
                                        {`R$${valor && moneyFormat(valor)}`}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, marginVertical: 10 }}>
                                <Text style={{ color: "#0af", textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 20 }}>Confirmar registro?</Text>
                            </View>

                            <View style={[styles.buttonArea, { flex: 1, marginBottom: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'space-around' }]}>
                                <TouchableOpacity style={[styles.buttonLight, { borderWidth: 0 }]} onPress={() => setVisible(false)}>
                                    <Text style={[styles.buttonText, { color: '#ff0303aa' }]}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonLight} onPress={() => [setVisible(false), handleAdd(false)]}>
                                    <Text style={[styles.buttonText, { color: '#0ff' }]}>Confirmar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Details>
                </View>
            </TouchableWithoutFeedback>

        )
    }
}
