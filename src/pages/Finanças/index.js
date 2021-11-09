import React, { useState, useEffect, useContext } from 'react'
import { View, Text, Dimensions, TouchableOpacity, FlatList, Alert, ActivityIndicator } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons';
import firebase from '../../services/connFirebase'
import { styles } from '../../include/styles'
import { AuthContext } from '../../contents/auth';
import DatePicker from '../../components/DatePicker';
import { FirstLetterUpperCase, getData, getDataBr, getDataHojeSeparador, moneyFormat } from '../../include/config/funcoes';
import HistoricoList from '../../components/HistoricoList';
import { BarGraph, LineGraph, PieGraph } from '../../components/Charts';
import { HistoricoPicker } from '../../components/Picker';
import Loading from '../../include/loading';
import { Alerta, Details, Success } from '../../components/Modals';

export default function Finance() {
    const windowWidth = Dimensions.get('window').width;
    const [type, setType] = useState('')
    const [list, setList] = useState([]);
    const [saldo, setSaldo] = useState('');
    const [saldoDia, setSaldoDia] = useState(0);
    const [saldoProfit, setSaldoProfit] = useState(0);
    const [saldoExpense, setSaldoExpense] = useState(0);
    const [historico, setHistorico] = useState([])
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({})
    const [visible, setVisible] = useState(false);
    const [visibleErro, setVisibleErro] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [visibleSuccess, setVisibleSuccess] = useState(false);

    const { user } = useContext(AuthContext);
    const uid = user && user.uid;

    const [newDate, setNewDate] = useState(new Date());
    const [show, setShow] = useState(false);

    useEffect(() => {
        setHistorico(list)
    }, [list])


    useEffect(() => {
        let calc = parseFloat(saldoProfit) - parseFloat(saldoExpense);
        setSaldoDia(calc)
    }, [saldoProfit, saldoExpense])

    useEffect(() => {
        async function loadList() {
            setLoading(true)
            await firebase.database().ref('usuarios').child(uid).on('value', (snapshot) => {
                setSaldo(snapshot.val().saldo);
            })

            await firebase.database().ref('historico')
                .child(uid)
                .child(getData(newDate))
                .on('value', (snapshot) => {

                    setHistorico([]);
                    setSaldoProfit(0);
                    setSaldoExpense(0);
                    setList([])

                    snapshot.forEach((childItem) => {
                        childItem.forEach((item) => {
                            let list = {
                                key: item.val().key,
                                tipo: item.val().tipo,
                                categoria: item.val().categoria,
                                valor: item.val().valor,
                                description: item.val().description,
                                date: item.val().date,
                            };
                            setList(oldValue => [...oldValue, list])


                            if (item.val().tipo === 'receita') {
                                setSaldoProfit(oldValue => oldValue + item.val().valor);
                            }
                            if (item.val().tipo === 'despesa') {
                                setSaldoExpense(oldValue => oldValue + item.val().valor);
                            }
                        })
                    })
                    setLoading(false)
                })
        }
        loadList()
    }, [newDate])

    function handleShowPicker() {
        setShow(true)
    }
    function handleClose() {
        setShow(false)
    }
    function onChange(date) {
        setShow(Platform.OS === 'ios')
        setNewDate(date);
    }
    function typeChanger(type) {
        if (historico === []) {
            return;
        }

        setLoading(true)
        if (type === 1) {
            setType('lineGraph')
        } else if (type === 2) {
            setType('barGraph')
        } else if (type === 3) {
            setType('pieGraph')
        } else {
            setType('')
        }
        setTimeout(() => {
            setLoading(false)
        }, 1200)
    }

    async function handleDetails(data) {
        // setMsg(`Detalhes da ${data.tipo}` + `Valor: R$ ${(data.valor).toFixed(2)} \n` + `Categoria: ${data.categoria}`)
        await data
        setData(data)
        setVisible(true)
        // console.log(data ? data : 'sem dados')
        // Alert.alert(
        //     `Mais detalhes sobre a ${data.tipo}`,
        //     `${data.description}`
        // )
    }

    async function handleDelete(data) {
        await data
        setData(data)
        setVisibleAlert(true)
        return
        Alert.alert(
            `Detalhes da ${data.tipo}`,
            `Valor: R$ ${(data.valor).toFixed(2)} \n` + `Categoria: ${data.categoria}`,
            [
                {
                    text: 'Excluir',
                    onPress: () => handleDeleteSuccess(data)
                },
                {
                    text: `${data.description ? '+detalhes' : ''}`,
                    onPress: () => handleMoreDetail(data)
                },
                {
                    text: 'Fechar',
                    style: 'cancel'
                },
            ]
        )
    }

    async function handleMoreDetail(data) {
        Alert.alert(
            `Mais detalhes sobre a ${data.tipo}`,
            `${data.description}`
        )
    }

    async function handleDeleteSuccess(data) {
        await firebase.database().ref('historico')
            .child(uid).child(getData(newDate)).child(data.tipo).child(data.key).remove()
            .then(async () => {
                let saldoAtual = parseFloat(saldo);
                if (data.tipo === 'receita') {
                    saldoAtual -= parseFloat(data.valor)
                }
                if (data.tipo === 'despesa') {
                    saldoAtual += parseFloat(data.valor)
                }
                setSaldo(saldoAtual)

                await firebase.database().ref('usuarios').child(uid)
                    .child('saldo').set(saldoAtual)
                    .then(() => {
                        console.log('Saldo Atualizado com sucesso')
                        saldoAtual = '';
                        setVisibleSuccess(true)
                    })
                    .catch((e) => { console.log(e) })
            })
            .catch((error) => {
                alert(error)
            })
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <View style={styles.center}>
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-around', width: windowWidth - 20,
                    borderColor: '#999', borderWidth: 1, paddingVertical: 20, marginBottom: 10,
                    alignItems: "center", backgroundColor: '#061a23'
                }}>
                    <Text style={styles.financeTitleText}>SALDO TOTAL </Text>
                    <Text style={[styles.financeText, { fontSize: 20 }]}>R$ {moneyFormat(saldo)}</Text>
                </View>
                <View style={{
                    flexDirection: 'column', width: windowWidth - 20, backgroundColor: '#061a23',
                    borderColor: '#999', borderWidth: 1, paddingVertical: 20, marginBottom: 20,
                }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ textAlign: "center", color: "#f1f5f777" }}>Lucros e despesas do dia</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: "90%", marginTop: 15 }} >
                            <View style={styles.financeTextArea}>
                                <Text style={styles.financeTitleText}>Receita
                                    <Ionicons name="arrow-up" size={18} color="#0fa" style={{ marginHorizontal: 5 }} />
                                </Text>
                                <Text style={styles.financeText}>R$ {moneyFormat(saldoProfit)}</Text>
                            </View>
                            <View style={styles.financeTextArea}>
                                <Text style={styles.financeTitleText}>Despesa
                                    <Ionicons name="arrow-down" size={18} color="#f00" style={{ marginHorizontal: 5 }} />
                                </Text>
                                <Text style={styles.financeText}>R$ {moneyFormat(saldoExpense)}</Text>
                            </View>
                            <View style={styles.financeTextArea}>
                                <Text style={styles.financeTitleText}>Saldo
                                    <Ionicons name={saldoProfit > saldoExpense ? 'trending-up-sharp' : 'trending-down-sharp'} size={18}
                                        color={saldoProfit > saldoExpense ? '#0fa' : '#f00'} style={{ marginHorizontal: 5 }} />
                                </Text>
                                <Text style={styles.financeText}>R$ {moneyFormat(saldoDia)}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', width: windowWidth }}>
                    <TouchableOpacity style={{ padding: 5, borderColor: "#999", borderWidth: 1, borderRadius: 50, height: 40 }}
                        onPress={handleShowPicker}
                    >
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Ionicons name="calendar-sharp" size={24} color="#0af" style={{ marginHorizontal: 5 }} />
                            <Text style={{ marginHorizontal: 5, color: "#0af" }} >{getDataBr(newDate)}</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{ padding: 5, borderColor: "#999", borderWidth: 1, borderRadius: 50 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name="areachart" size={24} color="#0af" style={{ marginHorizontal: 5 }} />
                            <HistoricoPicker onChange={typeChanger} tipo={type} />
                        </View>
                    </View>
                </View>
            </View>

            {
                loading === true ?
                    <Loading tipo={'graph'} /> :
                    type === '' ?
                        (
                            <View style={{ flex: 1 }}>
                                <FlatList
                                    style={{ backgroundColor: 'transparent', borderTopLeftRadius: 15, borderTopRightRadius: 15, marginTop: 5, padding: 10, }}
                                    showsVerticalScrollIndicator={false}
                                    data={historico}
                                    keyExtractor={item => item.key}
                                    renderItem={({ item }) => (
                                        <HistoricoList data={item}
                                            handleLeft={handleDetails}
                                            handleRight={handleDelete}
                                        />
                                    )}
                                    ListEmptyComponent={() => (
                                        <View>
                                            <Text style={{ color :"#f1f5f7", textAlign: 'center', fontSize: 30}}>Sem dados nesta data</Text>
                                            {/* <ActivityIndicator color={'#0ff'} size={'large'} /> */}
                                        </View>
                                    )}
                                />
                            </View>

                        ) :
                        type === 'lineGraph' ?
                            (
                                <View style={{ flex: 1, alignItems: 'center' }}>
                                    <LineGraph dados={historico} loading={loading} setLoading={setLoading} />
                                </View>
                            ) :
                            type === 'barGraph' ?
                                (
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <BarGraph dados={historico} />
                                    </View>
                                ) :
                                type === 'pieGraph' &&
                                (
                                    <View style={{ flex: 1, alignItems: 'center' }}>
                                        <PieGraph dados={historico} />
                                    </View>
                                )
            }


            {show && (
                <DatePicker
                    onClose={handleClose}
                    date={newDate}
                    onChange={onChange}
                />
            )}

            <Details setVisible={setVisible} visible={visible} >
                <View style={{}}>
                    <Text style={{ color: "#0af", textAlign: 'center', marginTop: 10, fontWeight: 'bold', fontSize: 20 }}>Detalhes do registro</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <View style={{ flex: 3 }}>
                        <View style={{ padding: 15 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.simpleText}>
                                    <Text style={{ fontWeight: 'bold', color: "#0af" }}>{data !== {} ? data.tipo : ''} de </Text>
                                    R${data !== {} && moneyFormat(data.valor)}
                                </Text>
                            </View>
                            <Text style={[styles.simpleText]}>
                                <Text style={{ fontWeight: 'bold', color: "#0af" }}>Categoria: </Text>
                                {data !== {} && data.categoria}
                            </Text>
                            <Text style={styles.simpleText}>
                                <Text style={{ fontWeight: 'bold', color: "#0af" }}>Descrição: </Text>
                                {data !== {} && data.description}
                            </Text>

                        </View>
                    </View>

                    <View style={[styles.buttonArea, { marginBottom: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'space-around' }]}>
                        {/* <TouchableOpacity style={[styles.buttonLight, { borderWidth: 0 }]} onPress={() => setVisible(false)}>
                            <Text style={[styles.buttonText, { color: '#ff0303aa' }]}>Cancelar</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.buttonLight} onPress={() => setVisible(false)}>
                            <Text style={[styles.buttonText, { color: '#0ff' }]}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Details>
            <Alerta setVisible={setVisibleAlert} visible={visibleAlert}>
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <Text style={{ fontWeight: 'bold', color: "#0af", fontSize: 20, textAlign: 'center' }}>Deseja excluir esse registro?</Text>
                </View>
                <View style={[styles.buttonArea, { marginBottom: 20, marginTop: 5, flexDirection: 'row', justifyContent: 'space-around' }]}>
                    <TouchableOpacity style={[styles.buttonLight, { borderWidth: 0 }]} onPress={() => setVisible(false)}>
                        <Text style={[styles.buttonText, { color: '#ff0303aa' }]}>Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonLight} onPress={() => [setVisibleAlert(false), handleDeleteSuccess(data)]}>
                        <Text style={[styles.buttonText, { color: '#0ff' }]}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </Alerta>
            <Success setVisibleSuccess={setVisibleSuccess} visibleSuccess={visibleSuccess} >
                <View style={{ flex: 1 }}>
                    <Text style={styles.modalText}>Registro excluído com sucesso!</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingBottom: 30, }}>
                    <View style={[styles.buttonArea, { flex: 1, alignItems: 'center' }]}>
                        <TouchableOpacity style={[styles.buttonLight, { width: 100 }]} onPress={() => setVisibleSuccess(false)}>
                            <Text style={styles.buttonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Success>
        </View>
    )
}
