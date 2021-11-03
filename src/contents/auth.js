import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState, useEffect } from 'react'
import firebase from '../services/connFirebase'
import Loading from '../include/loading'

export const AuthContext = createContext({});

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [mensagem, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function storageUser(data) {
        await AsyncStorage.setItem('Auth_user', JSON.stringify(data));
    }

    // Cadastrar usuario
    async function signUp(email, password, nome) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                setLoading(true)
                let uid = value.user.uid;
                await firebase.database().ref('usuarios').child(uid).set({
                    nome: "Vitor"
                })
                    .then(() => {
                        let data = {
                            uid: uid,
                            nome: 'Vitor', //nome,
                            email: value.user.email,
                        };
                        setUser(data);
                        storageUser(data);
                        setTimeout(()=>{
                            setLoading(false)
                        }, 1000)
                    })
            })
            .catch((error) => {
                alert(error.code)
            })
    }


    //Logar Usuario
    async function signIn(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                setLoading(true)
                await firebase.database().ref('usuarios').child(value.user.uid).once('value')
                    .then((snapshot) => {
                        var data = {}
                        data = {
                            uid: value.user.uid,
                            nome: snapshot.val().nome,
                            saldo: snapshot.val().saldo,
                            email: value.user.email,
                        };
                        setUser(data);
                        storageUser(data)
                        setTimeout(()=>{
                            setLoading(false)
                        }, 1000)
                    })
            })
            .catch((error) => {
                console.log(error.code)
                setLoading(false)

                switch (error.code) {
                    case 'auth/invalid-email':
                        setMsg('Email inválido')
                        break;
                    case 'auth/wrong-password':
                        setMsg('Senha inválida')
                        break;
                    case 'auth/user-not-found':
                        setMsg('Email não cadastrado')
                        break;
                    default:
                        setMsg('Erro ao autenticar')
                }
                setLoading(false)
            })
    }

    async function signOut() {
        setLoading(true);
        await firebase.auth().signOut()
            .then(async () =>
                [
                    await AsyncStorage.clear(),
                    setUser(null),
                    setTimeout(() => {
                        setLoading(false);
                    }, 1000)
                ]
            );
    }

    function enterVoid() {
        setLoading(true)
        var data = {}
        data = {
            uid: 1,
            nome: "Vitor",
            email: "vitor@email.com",
        };
        setUser(data)

        setTimeout(() => {
            setLoading(false)
        }, 4500)
    }

    function exitVoid() {
        setLoading(true);
        setUser(null);
        setTimeout(() => {
            setLoading(false);
        }, 2000)
    }

    //************** */
    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('Auth_user');
            if (storageUser) {
                setUser(JSON.parse(storageUser));
            }
        }
        loadStorage();
    }, []);

    if (loading) {
        return (
            <Loading />
        )
    } else {

        return (
            <AuthContext.Provider value={{ signed: !!user, user, setUser, signIn, signUp, signOut, enterVoid, exitVoid , setLoading, storageUser}}>
                {children}
            </AuthContext.Provider>
        )
    }
}
