import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutServiceModal = ({ item, visible, onClose }) => {

    const initialState = {
        dispense: "0",
        occurrence: 'Passageiro estrangeiro, origem Itália. Fala e entende pouco português.',
    };

    //const [id, setId] = useState();
    const [occurrence, setOccurence] = useState();
    const [dispense, setDispense] = useState();

    if (!item) return null;
   
    // Resetar os campos para os valores iniciais quando o modal for fechado
    const handleClose = () => {
        
        setOccurence(initialState.occurrence);
        setDispense(initialState.dispense);
        onClose();  
    };

    const handleCheckout = async () => {

        try {
            const token = AsyncStorage.getItem("token");

            if(!token) {
                throw new Error("No token available");
            }

            const ID = item.id;

            const response = await fetch('https://serverpnae.winglet.app/checkout', {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ID, dispense, occurrence }),
            });
            console.log("Status: ",response.status)

            if (!response.ok) {
                throw new Error('Erro ao enviar dados');
            }

            const responseData = await response.json();

            console.log(responseData)

            handleClose();  
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const handleDispenseService = (value) => {
        console.log(dispense);
        (value == '0') ? setDispense('1') : setDispense('0');
        console.log("depois: ", dispense)
        
    };

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}  // Chama handleClose quando o modal for fechado
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Atendimento me andamento</Text>

                            <View style={styles.formContainer}>
                                <View style={styles.infoServiceContainer}>
                                    <View style={styles.row}>                       
                                        <Text style={styles.rowText}>{item.flyNumber}</Text>
                                        <Text style={styles.rowText}>{item.seatPassenger}</Text>
                                        <Text style={styles.rowText}>Portão</Text>
                                    </View>

                                    <View style={styles.row}>
                                        <Text style={styles.rowText}>{item.type}</Text>
                                        <Text style={styles.rowText}>{item.service}</Text>
                                        <Text style={styles.rowText}>{item.gate}</Text>
                                    </View>
                                </View>  

                                {/* Radio button */}
                                <View style={styles.radioGroup}>
                                        <TouchableOpacity 
                                            style={[
                                                styles.radioItem, 
                                                styles.inputMargin,
                                                styles.dispensedTextButton,
                                                (dispense == "1") ? styles.enableRadioGroup :
                                                            styles.disableRadioGroup,
                                            ]}
                                            onPress={() => {
                                                    handleDispenseService(dispense);
                                                }
                                            }>
                                            <Text style={[(dispense == "1") ? styles.radioTextStyleEnable :
                                                            styles.radioTextStyleDisable]}
                                                >Serviço dispensado pelo passageiro</Text>
                                        </TouchableOpacity>
                                </View>

                                {/* Ocorrência field */}
                                <TextInput
                                    multiline
                                    label="Ocorrência"
                                    value={occurrence}
                                    onChangeText={setOccurence}
                                    onFocus={() => setOccurence('')} // Limpar o campo ao focar
                                    style={[styles.input, styles.textArea, styles.inputMargin]}
                                    mode="outlined"
                                />          
                            </View>
                            <View style={styles.footer}>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleClose}>
                                    <Text style={styles.buttonTextClose}>Fechar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleCheckout}>
                                    <Text style={styles.buttonTextFinish}>Finalizar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '90%',
        height: 480,  // alterar na V2
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    formContainer: {
        marginTop: '5%',
        width: '100%',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '100%', 
        marginBottom: 12,
        paddingHorizontal: 20,
    },
    rowText: {
        flex: 1,
        textAlign: 'left',
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: '5%',
        marginBottom: '2%',
        position: 'relative',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        padding: 15,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#e0e0e0',
    },
    saveButton: {
        backgroundColor: '#007c39',
    },
    buttonTextClose: {
        color: '#000',
        fontWeight: 'bold',
    },
    buttonTextFinish: {
        color: 'white',
        fontWeight: 'bold',
    },

    uploadPhotoButton: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '89%',
        marginTop: 20,
        marginLeft: 20,
    },
    uploadImage: {
        width: 30,
        height: 30,
        marginBottom: 10,
    },
    uploadTextBlue: {
        color: '#2196f3',
        textAlign: 'center',
    },
    uploadTextBlack: {
        color: 'black',
        textAlign: 'center',
    },
    previewContainer: {
        marginTop: 20,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: '2%',
    },
    previewImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    disableRadioGroup: {
        position: 'relative',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 16,
        width: '90%',
        borderColor: 'gray',
        borderRadius: 5,
        borderWidth: 1,
        left: '5%',
        right: '5%',
        backgroundColor: 'white',
        color: '#000'
    },
    enableRadioGroup: {
        position: 'relative',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 12,
        marginBottom: 16,
        width: '90%',
        borderColor: 'red',
        borderRadius: 5,
        borderWidth: 1,
        left: '5%',
        right: '5%',
        backgroundColor: 'red',
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    dispensedTextButton: {
        color: 'black',
        marginLeft: 5,
        fontWeight: 'bold',
    },
    input: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 4,
        marginBottom: 12,
    },
    textArea: {
        height: 160,
    },
    inputMargin: {
        marginHorizontal: '4%',
    },
    infoServiceContainer: {
        left: '5%',
        marginBottom: '2%'
    },
    radioTextStyleEnable: {
        color: '#fff',
    },
    radioTextStyleDisable: {
        color: '#000',
    }
});

export default CheckoutServiceModal;
