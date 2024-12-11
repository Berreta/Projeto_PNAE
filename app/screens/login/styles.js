import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        padding: 0,
        backgroundColor: '#000',
    },
    backgroundImage: {
        width: '110%',
        height: 320,
        position: 'absolute',
        top: -10,
        left: -10,
        resizeMode: 'cover',
    },
    logoImage: {
        position: 'relative',
        left: '25%',
        top: '0%',
        width: 170, 
        height: 170, 
        zIndex: 2,      
    },
    form: {
        position: 'relative',
        marginLeft: '12%',
        marginRight: '12%',
        zIndex: 2,
    },
    buttonSignIn: {
        marginTop: '2%',
        backgroundColor: '#E0E0E0',
        borderRadius: 8,
        height: 44,
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTextSignIn: {
        color: '#00002E', 
        fontSize: 16, 
        textAlign: 'center',
      },
      buttonResetPssw: {
        marginTop: '6%',
        backgroundColor: '#FFF',
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonResetPsswText: {
        color: '#000',
        fontSize: 14, // Tamanho do texto
        textAlign: 'center', // Garante que o texto está centralizado
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        marginBottom: 12, // Aumente o valor aqui para mais espaçamento entre os dois campos
        borderRadius: 4,
    },
    rectangleLayout: {
        backgroundColor: '#FFF',
        width: '100%',
        height: '70%',
        position: 'absolute',
        top: '30%',
        left: 0,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        overflow: 'hidden', 
        zIndex: 1,
    },
    atendButton: {
        backgroundColor: '#EF6C004D',
        width: 20,
        height: 60, 
        borderRadius: 30, 
        justifyContent: 'center',
        alignItems: 'center', 
        elevation: 5, 
        marginTop: 16,
    },
    atendButtonIcon: {
        width: 30, // Tamanho da imagem
        height: 30,
        resizeMode: 'contain', // Garante que a imagem não fique distorcida
    },
    AtendButtonContainer: {
        width: 60, // Largura do botão circular
        height: 60, // Altura do botão circular
        borderRadius: 40, // Faz o botão circular
        backgroundColor: '#EFC7A7',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: '10%', // Coloca o botão no meio do contêiner verticalmente
        left: '50%', // Coloca o botão no meio do contêiner horizontalmente
        transform: [{ translateX: -20 }, { translateY: -20 }], // Ajusta a posição para centralizar completamente (meia largura e altura do botão)
        zIndex: 2, // Ajuste o valor do zIndex conforme necessário
    },
    FooterContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
        position: 'relative', 
        zIndex: 2, 
        marginTop: "16%",
    },
    FooterTextCompany: {
        fontSize:  12,
        color: '#00002E',
    },
    FooterTextVersion: {
        fontSize: 12,
        color: '#00002E',
    },
});

export default styles;