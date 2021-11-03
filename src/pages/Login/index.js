import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, TextInput, TouchableWithoutFeedback, Keyboard, Button, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contents/auth';
import { Ionicons } from '@expo/vector-icons';
// import { Button } from '../../components/buttons';
import { styles } from '../../include/styles';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signed, setSigned] = useState(false);
    const [isPassword, setIsPassword] = useState(true);
    const [passwordHide, setPasswordHide] = useState();
    const { signIn, enterVoid, signUp } = useContext(AuthContext);
    const navigation = useNavigation();

    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    function handleFocus(input) {
        if (input === 'email') {
            console.log('email')
        }
        if (input === 'senha') {
            console.log('senha')
            setPasswordHide(true)
        }
    }

    function handleSignIn() {
        signIn(email, password);
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#000', paddingTop: 35, paddingHorizontal: 15 }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.center} >
                    <View style={styles.center} >
                        <Ionicons name="person-circle-outline" size={180} color="#0af" />
                    </View>
                    <View style={{ width: windowWidth - 60, height: windowHeight / 3, marginBottom: 50 }}>
                        <View style={{
                            justifyContent: 'center', alignItems: 'center',
                            // height: "100%", 
                            backgroundColor: "#000", borderRadius: 8
                        }} >
                            {signed ?
                                (
                                    <>
                                        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 35, color: "#0af" }}>Welcome back, {'user.nome'}!</Text>
                                        <View style={styles.buttonArea}>
                                            <TouchableOpacity style={[styles.button, { backgroundColor: '#0af', borderColor: 'transparent', }]} >
                                                <Text style={[styles.buttonText, { color: "#f1f5f7" }]}>Entrar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <View style={styles.inputArea}>
                                            <Ionicons name="mail-outline" size={20} color="#0af" style={styles.inputIcon} />
                                            <TextInput style={styles.input}
                                                autoComplete="off"
                                                autoCapitalize={'none'}
                                                placeholder="Email"
                                                placeholderTextColor="#0af7"
                                                onFocus={() => handleFocus('email')}
                                                onChangeText={text => setEmail(text)}
                                                value={email}
                                            />
                                        </View>
                                        <View style={styles.inputArea}>
                                            {!passwordHide ?
                                                <Ionicons name="lock-closed-outline" size={20} color="#0af" style={styles.inputIcon} />
                                                :
                                                <TouchableOpacity onPress={() => setIsPassword(!isPassword)}>
                                                    <Ionicons name={isPassword ? 'eye-outline' : 'eye-off-outline'} size={20} color="#0af" style={styles.inputIcon} />
                                                </TouchableOpacity>
                                            }
                                            <TextInput style={styles.input}
                                                autoComplete="off"
                                                placeholder="Senha"
                                                placeholderTextColor="#0af7"
                                                onFocus={() => handleFocus('senha')}
                                                onBlur={() => [setIsPassword(true), setPasswordHide(false)]}
                                                secureTextEntry={isPassword}
                                                onChangeText={text => setPassword(text)}
                                                value={password}
                                            />
                                        </View>
                                        {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "85%", marginBottom: 25, marginTop: 10 }}>
                                        <Text style={{ color: "#f1f5f7aa"}}>Mostrar senha</Text>
                                        <Text style={{ color: "#f1f5f7aa"}}>Esqueceu a senha?</Text>
                                    </View> */}
                                        <View style={{ marginVertical: 15 }} />
                                        <View style={styles.buttonArea}>
                                            <TouchableOpacity style={styles.button} onPress={() => handleSignIn()} >
                                                <Text style={styles.buttonText}>Logar</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                )
                            }
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} >
                            <Text style={{ color: "#f1f5f7aa", width: "100%", textAlign: 'center', marginTop: 15 }}>Esqueceu a senha?</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    )
}


