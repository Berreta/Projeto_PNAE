import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { TextInput, RadioButton } from 'react-native-paper';
// import iconButton from '../../../assets/images/img_vector.png';
// import CameraModal from './camera';
// import MultiSelectInput from '../MultiSelectInput';

const AddServiceModal = ({ visible, onClose }) => {
    // Valores iniciais para os estados
    const initialState = {
        service: 'WCHR, BLND...',
        flightNumber: 'LA3311',
        ciaName: 'Latam',
        seatNumber: '25F',
        gate: '258',
        type: 'Embarque',
        occurrence: 'Passageiro estrangeiro, origem Itália. Fala e entende pouco português.',
        photo: null,
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
    // const [photo, setPhoto] = useState(initialState.photo);
    // const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);

    // const handleCapture = (capturedPhotoUri) => {
    //     setPhoto(capturedPhotoUri);
    //     setIsCameraModalVisible(false);
    // };

    // Resetar os campos para os valores iniciais quando o modal for fechado
    const handleClose = () => {
        setService(initialState.service);
        setFlightNumber(initialState.flightNumber);
        setCiaName(initialState.ciaName);
        setSeatNumber(initialState.seatNumber);
        setGate(initialState.gate);
        setType(initialState.type);
        setOccurence(initialState.occurrence);
        // setPhoto(initialState.photo);
        onClose();  // Chama a função onClose passada por props
    };

    const handleSave = async () => {
        const data = {
            service,
            flightNumber,
            ciaName,
            seatNumber,
            gate,
            type,
            occurrence,
        };

        try {
            const response = await fetch('https://sua-api-endpoint.com/atendimentos', {
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
            //Adicionar toast de sucesso
            handleClose();  // Resetar o estado e fechar o modal
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
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

                                <View style={styles.row}>
                                    {/* <MultiSelectInput 
                                        label={initialState.service} 
                                        items={serviceOptions}
                                        style={styles.MultiSelectInputStyle} /> */}

                                <TextInput
                                        label="Serviços"
                                        value={service}
                                        onChangeText={setService}
                                        onFocus={() => setService('')}
                                        style={[styles.serviceInput]}
                                        mode="outlined"
                                    />                   
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
                                    {/* <MultiSelectInput 
                                        style={styles.fieldFormStyle} 
                                        label={initialState.ciaName} 
                                        items={ciaNameOptions} /> */}
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

                                {/* Show photo *
                                {photo ? (
                                    <View style={styles.previewContainer}>
                                        <Text>Foto Capturada:</Text>
                                        <Image source={{ uri: photo }} style={styles.previewImage} />
                                    </View>
                                ) : (
                                    <TouchableOpacity style={styles.uploadPhotoButton} onPress={() => setIsCameraModalVisible(true)}>
                                        <Image 
                                            source={iconButton} 
                                            style={styles.uploadImage} 
                                        />
                                        <Text style={styles.uploadTextBlue}>Foto do Cartão de Embarque</Text>
                                        <Text style={styles.uploadTextBlack}>SVG, PNG, JPG ou GIF (max. 3MB)</Text>
                                    </TouchableOpacity>
                                )}

                                <CameraModal
                                    visible={isCameraModalVisible}
                                    onClose={() => setIsCameraModalVisible(false)}
                                    onCapture={handleCapture}
                                />*/}
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
        height: '90%',
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
        width: '100%',
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Usando "space-between" para distribuir os itens igualmente
        flex: 0.1, // Garante que todas as linhas terão a mesma altura
        marginBottom: '2%',
      },
      serviceInput: {
        // Estilo ajustado
        width: '100%',
        height: 60,
      },
      flightInput: {
        width: '40%', // Ajustado para garantir consistência
        height: 20, // Garantindo que a altura ocupe 100% da altura da row
      },
      fieldFormStyle: {
        width: '55%', // Garantindo que o espaço restante seja utilizado
        height: 100,
      },
      seatInput: {
        width: '40%', // Ajustado para garantir consistência
        height: 20,
      },
      gateInput: {
        width: '55%', // Ajustado para garantir consistência
        //height: '100%',
      },
    textArea: {
        width: '90%',
        left: '5%',
        right: '5%',
        height: 120,
    },
    input: {  
        fontSize: 12,
    },
    radioGroup: {
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
        marginTop: 20,
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
    MultiSelectInputStyle: {
        height: 5,
    }
});

export default AddServiceModal;
