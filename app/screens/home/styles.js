import { StyleSheet  } from "react-native";

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#E0E0E0',
    },
    rectangleLayout: {
        backgroundColor: '#0B4B6F',
        width: '100%',
        height: '70%',
        position: 'absolute',
        top: 0,
        left: 0,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        overflow: 'hidden', 
        zIndex: 0,
    },
    rectangleList: {
        backgroundColor: '#FFF',
        width: '90%',
        height: '60%',
        position: 'absolute',
        top: '28%',
        left: 20,     
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        overflow: 'hidden', 
        zIndex: 2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '8%',
        padding: 'auto',
    },
    drawerButton: {
        fontSize: 28,
        marginRight: -8,
    },
    title: {
        marginRight: '20%',
        fontSize: 18,
        color: '#fff',
        left: '12%',   
        zIndex: 1,
    },

    welcomeMssgContainer: {
        position: 'absolute',
        width: '90%',                // O container ocupará 90% da largura
        top: '10%',                   // Margem superior de 8%
        left: '5%',                  // Alinha o container com 5% da borda esquerda (para centralizar com 'right' 5%)
        right: '5%',                 // Alinha o container com 5% da borda direita (para centralizar)
 
        alignItems: 'right', 
        zIndex: 1,      
      },
    
      welcomeUser: {
        fontSize: 14,
        color: '#fff',   
        zIndex: 1,
      },
    
      welcomeMssg: {
        fontSize: 14,
        color: '#fff',
        zIndex: 1,
      },
      buttonContainer: {
        flexDirection: 'row',               // Organiza os botões horizontalmente
        justifyContent: 'space-between',    // Cria um espaçamento entre os botões
        width: '90%',                       // O container ocupará 90% da largura da tela
        height: '8%',                       // O container ocupará 8% da altura da tela (altura dos botões)
        position: 'absolute',               // Para que o container tenha uma posição fixa
        top: '18%',                         // Distância de 26% do topo da tela
        left: '5%',                          // Adiciona uma margem à esquerda (para centralizar)
        right: '5%',                         // Adiciona uma margem à direita (para centralizar)
        alignItems: 'center',               // Alinha os botões no centro verticalmente
      },
      
      buttonView: {
        flexDirection: 'row',               // Coloca os botões em linha (lado a lado)
        justifyContent: 'space-between',    // Cria o espaçamento entre os botões
        flex: 1,                            // Flexível para ocupar o espaço restante
        alignItems: 'center',               // Alinha os botões verticalmente no centro
      },
      
      buttonFilter: {
        flexDirection: 'row',               // Ícone e texto lado a lado
        borderWidth: 2,                     // Bordas visíveis no botão
        borderColor: '#fff',                // Cor da borda
        borderRadius: 10,                   // Bordas arredondadas
        paddingVertical: '4%',              // Ajusta o tamanho vertical do botão (8% no total entre os 2 botões)
        paddingHorizontal: '8%',           // Ajusta o tamanho horizontal (espalha o texto e o ícone de forma equilibrada)
        justifyContent: 'center',           // Centraliza o conteúdo dentro do botão
        alignItems: 'center',               // Alinha o conteúdo no centro
        width: '48%',                       // Ajusta o tamanho dos botões para que caibam dois lado a lado (cerca de 48% cada um)
      },
      
      buttonFilterText: {
        color: '#fff',
        fontSize: 12,                       // Tamanho da fonte ajustado
        marginLeft: 10,                     // Espaço entre o ícone e o texto
        textAlign: 'center',                // Centraliza o texto horizontalmente
        textAlignVertical: 'center',        // Alinha verticalmente no centro
      },
      
    item: {
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4, 
        marginLeft: 14,
    },
    flyNumber: {
        fontSize: 12,
    },
    leftSection: {
        flex: 1,
        alignItems: 'flex-start',
    },
    middleSection: {
        flex: 1,
        alignItems: 'center',
    },
    type: {
        fontSize: 11,
    },
    seatPassenger: {
        fontSize: 12,
    },
    service: {
        fontSize: 12,
    },
    rightSection: {
        flex: 1,
        alignItems: 'flex-end',
    },
    gateLabel: {
        fontSize: 12,
    },
    gate: {
        fontSize: 12,
    },
    statusSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    statusCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
        height: 54,
        marginLeft: 10,
        marginRight: 10,
        top: '3%',
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginRight: 10,
    },
    dateInput: {
        width: '30%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        left: '46%', // Centraliza horizontalmente
        bottom: '6%',
        backgroundColor: '#A5D6A7',
        zIndex: 2,
        width: 58, // Largura do FAB
        height: 58, // Altura do FAB
        borderRadius: 28, // Metade da largura e altura para ser circular
        justifyContent: 'center', // Centraliza o conteúdo
        alignItems: 'center', // Centraliza o conteúdo
        transform: [{ translateX: -28 }], // Move para a esquerda para centralizar corretamente
        borderRadius: 28, 
        borderWidth: 2,    
        borderColor: '#4CAF50',
    },
    
    logoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        flex: 1,
        height: '8%',
    },
    logo: { 
        width: 80, 
        height: 80, 
    },


});

export default styles;