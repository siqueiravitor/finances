import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import firebase from '../../services/connFirebase'
import { Error, PasswordReset, Warning } from '../../components/Modals';
import LottieView from 'lottie-react-native';
import { styles } from '../../include/styles';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [visibleError, setVisibleError] = useState(false);
    const [visibleWarning, setVisibleWarning] = useState(false);
    const [visibleSuccess, setVisibleSuccess] = useState(false);

    const navigation = useNavigation();

    async function handlePasswordReset() {
        // if (isConected === false) {
        //     setMensagem('Sem conexão com internet')
        //     setVisibleError(true)
        //     return
        // }
        try {
            await firebase.auth().sendPasswordResetEmail(email)
                .then(() => {
                    setMensagem('Email enviado com sucesso!')
                    setVisibleSuccess(true)
                })
                .catch((error) => {
                    setMensagem('Por favor, verifique se o email está correto')
                    setVisibleWarning(true)
                    console.log('ForgotPassword-Error', error.code)
                })
        } catch (error) {
            setMensagem('Erro ao enviar email com redefinição de senha!')
            setVisibleError(true)
            console.log('ForgotPassword-Error', error.message)
        }
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 35, paddingHorizontal: 15 }}>
            <View style={styles.center}>
                <View style={{ maxWidth: 300, alignItems: 'center', marginBottom: 50 }}>
                    <LottieView
                        loop={false}
                        autoPlay
                        style={{
                            width: 200,
                            height: 160
                        }}
                        source={require('../../assets/animations/forgotPassword.json')}
                    />
                </View>
                <Text style={{ color: "#f1f5f7", fontSize: 24, fontWeight: "bold", marginBottom: 15 }}>Esqueceu a senha?</Text>

                <View style={styles.inputArea}>
                    <Ionicons name="mail-outline" size={20} color="#0af" style={styles.inputIcon} />

                    <TextInput style={styles.input} placeholder="email"
                        onChangeText={text => setEmail(text)}
                        value={email}
                        autoCapitalize={'none'}
                        placeholderTextColor="#0af7"
                        keyboardType={'email-address'}
                    />
                </View>

                <View style={[styles.buttonArea, {maxWidth: 200, marginTop: 15}]}>
                    <TouchableOpacity style={styles.button} onPress={() => handlePasswordReset()} >
                        <Text style={styles.buttonText}>Enviar email </Text>
                    </TouchableOpacity>
                </View>


            </View>
            <View style={{ marginBottom: 15 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')} >
                    <Text style={{ color: "#f1f5f7aa", width: "100%", textAlign: 'center', marginTop: 15 }}>Não esqueceu? Faça o login</Text>
                </TouchableOpacity>
            </View>

            <PasswordReset visibleSuccess={visibleSuccess} setVisibleSuccess={setVisibleSuccess} >
                <View style={style.ViewTextDesc}>
                    <Text style={[style.textDesc]}>{mensagem}</Text>
                </View>
                <View style={style.bodyCard}>
                    <TouchableOpacity style={[styles.button, { width: "50%", alignSelf: 'center', backgroundColor: "#fff" }]} 
                        onPress={() => [setVisibleSuccess(false), navigation.navigate('Login')]} 
                    >
                        <Text style={[styles.buttonText, { color: '#333' }]}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </PasswordReset>
            <Warning visibleWarning={visibleWarning} setVisibleWarning={setVisibleWarning}>
                <View style={style.ViewTextDesc}>
                    <Text style={[style.textDesc]}>{mensagem}</Text>
                </View>
                <View style={style.bodyCard}>
                    <TouchableOpacity style={[styles.button, { width: "50%", alignSelf: 'center', backgroundColor: "#fff" }]} 
                        onPress={() => setVisibleWarning(false)} 
                    >
                        <Text style={[styles.buttonText, { color: '#333' }]}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Warning>
            <Error visibleError={visibleError} setVisibleError={setVisibleError}>
                <View style={style.ViewTextDesc}>
                    <Text style={[style.textDesc]}>{mensagem}</Text>
                </View>
                <View style={style.bodyCard}>
                    <Button title="Fechar" onPress={() => [setVisibleError(false), navigation.navigate('Login')]} />
                    <TouchableOpacity style={[styles.button, { width: "50%", alignSelf: 'center', backgroundColor: "#fff" }]} 
                        onPress={() => [setVisibleError(false), navigation.navigate('Login')]} 
                    >
                        <Text style={[styles.buttonText, { color: '#333' }]}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </Error>
        </View>
    )
}

const style = StyleSheet.create({
    bodyCard: {
        flex: 1,
        justifyContent: 'center',
    },
    textDesc: {
        fontSize: 18,
        color: '#181818',
        textAlign: 'center'
    },
    ViewTextDesc: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 18,
        color: '#181818',
        padding: 15,
    },
})