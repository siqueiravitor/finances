import React, { useState, useEffect } from 'react'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { AuthContext } from '../../contents/auth';
import Loading from '../../include/loading';
import { Picker } from '../Picker';


const screenWidth = Dimensions.get("window").width;
const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};

export function LineGraph({ dados }) {
    const [valor, setValor] = useState([0]);

    useEffect(async ()=>{
        loadData()
    }, [dados])

    useEffect(async () => {
        await loadData()
    }, [])

    async function loadData() {
        setValor([])
        dados.forEach(async (item, idx) => {
            let newValue = dados[idx].valor;
            if (dados[idx].tipo === 'despesa') {
                newValue = -newValue;
            }
            setValor(old => [...old, newValue])
            
        })
    }

    const data = {
        labels: valor,
        datasets: [
            {
                data: valor,
                color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`, // optional
                // strokeWidth: 2 // optional
            }
        ],
        legend: ["Lucros e Gastos"], // optional
    };
    return (
        <LineChart
            data={data}
            height={220}
            width={screenWidth - 20}
            chartConfig={chartConfig}
            onDataPointClick={(value) => console.log(value.value)}
            bezier
        />
    )
}
export function BarGraph({ dados }) {
    const [valor, setValor] = useState([0]);
    
    useEffect(async ()=>{
        loadData()
    }, [dados])

    useEffect(async () => {
        await loadData()
    }, [])

    async function loadData() {
        setValor([])
        dados.forEach(async (item, idx) => {
            let newValue = dados[idx].valor;
            if (dados[idx].tipo === 'despesa') {
                newValue = -newValue;
            }
            setValor(old => [...old, newValue])
        })
    }

    const data = {
        labels: valor,
        datasets: [
            {
                data: valor,
                color: (opacity = 1) => `rgba(0, 255, 255, ${opacity})`,
            }
        ],
        legend: ["Lucros e Gastos"],
    };
    return (
        <BarChart
            data={data}
            width={screenWidth - 20}
            height={220}
            chartConfig={chartConfig}
        />
    )
}
export function PieGraph({ dados }) {
    const [tipo, setTipo] = useState(null)
    const [valor, setValor] = useState(
        [
            {
                valor: 0,
                legendFontColor: 'cyan',
                legendFontSize: 15
            },
        ]
    );
    const [valorFiltrado, setValorFiltrado] = useState(
        [
            {
                valor: 0,
                legendFontColor: 'cyan',
                legendFontSize: 15
            },
        ]
    );

    useEffect(async ()=>{
        loadData()
        // .then(async ()=>{
        //     await setData()
        // })
    }, [dados])

    useEffect(async () => {
        loadData()
        // .then(async ()=>{
        //     await setData()
        // })
    }, [])

    async function loadData() {
        setValor([])
        dados.forEach(async (item, idx) => {
            let valor = dados[idx].valor;
            let cor, data;

            if (dados[idx].tipo === 'despesa') {
                cor = `rgb(255,${(Math.random() * 150).toFixed()},${(Math.random() * 150).toFixed()})`;
            } else if (dados[idx].tipo === 'receita') {
                cor = `rgb(0,${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()})`;
            }
            data = {
                name: dados[idx].categoria,
                valor: valor,
                color: cor,
                legendFontColor: cor,
                legendFontSize: 15
            }
            setValor(old => [...old, data])
        })
    }

    async function setData(){
        let alimentacao, 
            mercado, 
            conta, 
            lazer,
            salario, 
            outro;
        let alimentacaoValor = 0, 
            mercadoValor = 0, 
            contaValor = 0, 
            lazerValor = 0, 
            salarioValor = 0, 
            outroValor = 0;

        valor.forEach((item, index)=> {
            // console.log(item)
            
            if(item['name'] === 'mercado'){
                mercadoValor = parseFloat(mercadoValor) + parseFloat(item['valor'])

                mercado = {
                    name: item['name'],
                    valor: mercadoValor,
                    color: '#0af',
                    legendFontColor: '#0af',
                    legendFontSize: 15
                }
            }
            if(item['name'] === 'salario'){
                salarioValor = parseFloat(salarioValor) + parseFloat(item['valor'])

                salario = {
                    name: item['name'],
                    valor: salarioValor,
                    color: '#0f0',
                    legendFontColor: '#0f0',
                    legendFontSize: 15
                }
            }
            console.log([salario, mercado])
        })
        setValor([salario, mercado])
    }
    

    // useEffect(async () => {
    //     async function loadData() {
    //         setValor([])
    //         dados.forEach(async (item, idx) => {
    //             let valor = dados[idx].valor;
    //             let cor, data;

    //             if (dados[idx].tipo === 'despesa' && tipo === 'despesa') {
    //                 cor = `rgb(255,${(Math.random() * 150).toFixed()},${(Math.random() * 150).toFixed()})`;
    //                 data = {
    //                     name: dados[idx].tipo,
    //                     valor: valor,
    //                     color: cor,
    //                     legendFontColor: cor,
    //                     legendFontSize: 15
    //                 }
    //             } else if (dados[idx].tipo === 'receita' && tipo === 'receita') {
    //                 cor = `rgb(0,${(Math.random() * 255).toFixed()},${(Math.random() * 255).toFixed()})`;
    //                 data = {
    //                     name: dados[idx].tipo,
    //                     valor: valor,
    //                     color: cor,
    //                     legendFontColor: cor,
    //                     legendFontSize: 15
    //                 }
    //             }
    //             setValor(old => [...old, data])
    //         })
    //     }
    //     await loadData()
    // }, [tipo])

    return (
        // <View>
        //     <Picker onChange={setTipo} tipo={tipo} />
            <PieChart
                data={valor}
                width={screenWidth - 20}
                height={220}
                chartConfig={chartConfig}
                accessor={"valor"}
            />
        // </View>
    )
}