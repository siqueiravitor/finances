import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        padding: 10,
        // box-shadow: 2px 2px rgba(0,0,0, 0.05 ),
        backgroundColor: '#061a43',
        borderRadius: 4,
        borderColor: "#0af",
        borderWidth: 1
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputArea: {
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderColor: "#0af",
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        minWidth: 260,
        paddingHorizontal: 10,
        color: "#0af"
    },
    inputIcon: {
        marginRight: 10
    },
    buttonArea: {
        width: "80%",
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#000',
        borderColor: '#0af',
        borderWidth: 1,
        borderRadius: 4,
        padding: 8,
    },
    buttonText: {
        textAlign: 'center',
        color: '#30d',
        fontSize: 18
    },
    picker: {
        minWidth: 260,
        color: "#fff",
        borderColor: "#0af",
        borderWidth: 1,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    financeTextArea: {
        justifyContent: 'center', 
        alignItems: 'center', 
        minWidth: 65
    },
    financeText: {
        textAlign: "center", 
        minWidth: 80, 
        color: "#0ff"
    },
    financeTitleText: {
        fontSize: 18, 
        fontWeight: "bold", 
        color: "#ddd"
    },
})