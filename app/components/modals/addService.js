import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, 
        Image, KeyboardAvoidingView, ScrollView, Platform,
        TouchableWithoutFeedback  } from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext'

import iconButton from '../../../assets/images/img_vector.png';
import CameraModal from './camera';
import MultiSelectInput from '../MultiSelectInput';

const AddServiceModal = ({ visible, onClose }) => {
    
    const { user } = useAuth();

    const initialState = {
        service: 'WCHR, BLND...',
        flightNumber: 'LA3311',
        ciaName: 'Latam',
        seatNumber: '25F',
        gate: '258',
        type: 'Embarque',
        occurrence: 'Passageiro estrangeiro, origem Itália. Fala e entende pouco português.',
        photo: null,
        dispense: '0',
        statusService: 'ongoing',
        additionalService: '0',
        connectionFlight: '0',
    };

    const serviceOptions = [
        'BLND', 'DEAF', 'DPNA', 'ESAN', 'EXST', 'MAAS', 
        'MEDA', 'OXYG', 'PETC', 'PPOC', 'STCR', 'SVAN', 
        'TEEN', 'UMNR', 'WCBD', 'WCBW', 'WCHC', 'WCHR', 
        'WCHS', 'WCLB', 'WCMP', 'WCOB',
      ];

      const ciaNameOptions = [
        'Air France',
        'American Airlanes',
        'Delta Airlanes',
        'Emirates',
        'FlyBondi',
        'ITA Airways',
        'Latam',
        'Swiss',
        'United',
      ];

    const [service, setService] = useState(initialState.service);
    const [flightNumber, setFlightNumber] = useState(initialState.flightNumber);
    const [ciaName, setCiaName] = useState(initialState.ciaName);
    const [seatNumber, setSeatNumber] = useState(initialState.seatNumber);
    const [gate, setGate] = useState(initialState.gate);
    const [type, setType] = useState(initialState.type);
    const [occurrence, setOccurence] = useState(initialState.occurrence);
    const [statusService, setStatusService] = useState(initialState.statusService);
    const [userID, setUserID] = useState(user.id);
    const [photo, setPhoto] = useState(initialState.photo);
    const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
    const [scale,setScale] = useState(1);

    const handleCapture = (capturedPhotoUri) => {
        setPhoto(capturedPhotoUri);
        setIsCameraModalVisible(false);
    };

    // Resetar os campos para os valores iniciais quando o modal for fechado
    const handleClose = () => {
        setService(initialState.service);
        setFlightNumber(initialState.flightNumber);
        setCiaName(initialState.ciaName);
        setSeatNumber(initialState.seatNumber);
        setGate(initialState.gate);
        setType(initialState.type);
        setOccurence(initialState.occurrence);
        setPhoto(initialState.photo);
        setStatusService(initialState.statusService);
        onClose(); 
    };

    const handleSave = async () => {
        console.log("Send button pressed")
        const data = {
            ciaName,
            gate,
            occurrence,
            type,
            seatNumber,
            flightNumber,
            additionalService,
            connectionFlight,
            service,
            statusService,
            occurrence,
            gate,
            dispense,
            userID,
        };
        
        try {
            const response = await fetch('https://serverpnae.winglet.app/novoAtendimento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Erro ao enviar dados');
            }

            const responseData = await response.json();

            console.log('Dados enviados com sucesso:', responseData);

            handleClose();
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    // Função para aumentar a imagem ao pressionar
    const onPressIn = () => {
        setScale(3.5);  // Aumenta o tamanho da imagem
    };

    // Função para voltar ao tamanho original
    const onPressOut = () => {
        setScale(1);  // Retorna ao tamanho normal
    };


    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={handleClose}  // Chama handleClose quando o modal for fechado
        >
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Novo Atendimento</Text>

                            <View style={styles.formContainer}>

                                <View style={styles.rowComponent}>
                                    <MultiSelectInput 
                                        label={initialState.service} 
                                        items={serviceOptions} 
                                    />

                                {/* <TextInput
                                        label="Serviços"
                                        value={service}
                                        onChangeText={setService}
                                        onFocus={() => setService('')}
                                        style={[styles.serviceInput]}
                                        mode="outlined"
                                    />                    */}
                                </View>

                                <View style={styles.row}>
                                    
                                    <TextInput
                                        label="Voo"
                                        value={flightNumber}
                                        onChangeText={setFlightNumber}
                                        onFocus={() => setFlightNumber('')}
                                        style={[styles.flightInput]}
                                        mode="outlined"
                                    />
                                    <TextInput
                                        label="Cia Aérea"
                                        value={ciaName}
                                        onChangeText={setCiaName}
                                        onFocus={() => setCiaName('')}
                                        style={[styles.gateInput]}
                                        mode="outlined"
                                    />
                                </View>

                                <View style={styles.row}>
                                    <TextInput
                                        label="Assento"
                                        value={seatNumber}
                                        onChangeText={setSeatNumber}
                                        onFocus={() => setSeatNumber('')}
                                        style={[styles.seatInput]}
                                        mode="outlined"
                                    />
                                    <TextInput
                                        label="Portão / Terminal"
                                        value={gate}
                                        onChangeText={setGate}
                                        onFocus={() => setGate('')}
                                        style={[styles.gateInput]}
                                        mode="outlined"
                                    />
                                </View>

                                {/* Radio buttons*/}
                                <View style={styles.radioGroup}>
                                    <View style={styles.radioItem}>
                                        <RadioButton
                                            value="Embarque"
                                            status={type === 'Embarque' ? 'checked' : 'unchecked'}
                                            onPress={() => setType('Embarque')}
                                        />
                                        <Text style={styles.radioLabel}>Embarque</Text>
                                    </View>
                                    <View style={styles.radioItem}>
                                        <RadioButton
                                            value="Desembarque"
                                            status={type === 'Desembarque' ? 'checked' : 'unchecked'}
                                            onPress={() => setType('Desembarque')}
                                        />
                                        <Text style={styles.radioLabel}>Desembarque</Text>
                                    </View>
                                </View>

                                <TextInput
                                    multiline
                                    label="Ocorrência"
                                    value={occurrence}
                                    onChangeText={setOccurence}
                                    onFocus={() => setOccurence('')}
                                    style={[styles.input, styles.textArea]}
                                    mode="outlined"
                                />

                                {photo ? (
                                    <View style={styles.previewContainer}>
                                        <Text style={styles.textPreviewImage}>Foto Capturada:</Text>
                                        <TouchableWithoutFeedback 
                                            onPressIn={onPressIn} 
                                            onPressOut={onPressOut}
                                        >
                                            <Image source={{ uri: photo }} style={[styles.previewImage, {transform: [{scale}]}]} />
                                        </TouchableWithoutFeedback>
                                    </View>
                                ) : (
                                    <TouchableOpacity style={styles.uploadPhotoButton} onPress={() => setIsCameraModalVisible(true)}>
                                        <Image 
                                            source={iconButton} 
                                            style={styles.uploadImage}
                                        />
                                        <Text style={styles.uploadTextBlue}>Foto do Cartão de Embarque</Text>
                                        <Text style={styles.uploadTextBlack}>SVG, PNG, JPG</Text>
                                    </TouchableOpacity>
                                )}

                                <CameraModal
                                    visible={isCameraModalVisible}
                                    onClose={() => setIsCameraModalVisible(false)}
                                    onCapture={handleCapture}
                                />
                            </View>

                            <View style={styles.footer}>
                                <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleClose}>
                                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                                    <Text style={styles.saveButtonText}>Salvar</Text>
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
        height: 700,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: '2%',
        marginBottom: '5%',
    },
    formContainer: {
        width: '95%',
        //flex: 1,
    },
    row: {
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between', // Usando "space-between" para distribuir os itens igualmente
        //flex: 0.1, // Garante que todas as linhas terão a mesma altura
        marginBottom: '2%',
      },
      rowComponent: {
        height: 57,
        flexDirection: 'row',
        justifyContent: 'space-between', // Usando "space-between" para distribuir os itens igualmente
        //flex: 0.1, // Garante que todas as linhas terão a mesma altura
        marginBottom: '2%',
      },
      serviceInput: {
        width: '100%',
      },
      flightInput: {
        width: '40%', // Ajustado para garantir consistência
      },
      fieldFormStyle: {
        width: '55%', // Garantindo que o espaço restante seja utilizado
      },
      seatInput: {
        width: '40%', // Ajustado para garantir consistência
      },
      gateInput: {
        width: '55%', // Ajustado para garantir consistência
      },
    textArea: {
        width: '90%',
        left: '5%',
        right: '5%',
        height: 120,
    },
    input: {  
        top: 20,
        fontSize: 12,
    },
    radioGroup: {
        top: 10,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 12,
        marginBottom: 16,
        width: '90%',
        left: '5%',
        right: '5%',
    },
    radioItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioLabel: {
        marginLeft: 5,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 38,
        marginBottom: '2%',
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
    cancelButtonText: {
        color: 'black',
        fontWeight: 'bold',
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },

    uploadPhotoButton: {
        top: 10,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 2,
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '89%',
        marginTop: 28,
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
        top: 10,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
        marginBottom: '2%',
    },
    textPreviewImage: {
        marginBottom: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        zIndex: 2,
    },
    scrollViewContent: {
        flexGrow: 1,
    },

});

export default AddServiceModal;
