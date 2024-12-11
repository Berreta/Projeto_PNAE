import React , { useState } from 'react';
import { View, StyleSheet, Modal, Image, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PasswordResetModal from '../modals/passwordResetModal';

const DrawerValidInformationModal = ({ visible, onClose }) => {
    const initialState = {
        cpf_RG: 'Digite apenas números',
        birthday: '01/01/1986',
        companyRegistrationNumber: '54321',
    };

    const { user } = useAuth();
    const [rgNumber, setRGNumber] = useState(initialState.cpf_RG);
    const [cpfNumber, setCpfNumber] = useState(initialState.cpf_RG);
    const [birthday, setBirthday] = useState(initialState.birthday);
    const [registrationNumber, setRegistrationNumber] = useState(initialState.companyRegistrationNumber);
    const [modalVisible, setModalVisible] = useState(false);

    const handleClose = () => {
        onClose();
    };

    const handlePasswordResetModal = () => {
        setModalVisible(true);
    };

    return(
        <Modal
            transparent={true}
            onRequestClose={onClose}
            visible={visible}>
            
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Image
                            source={require('../../../assets/images/Winglet-Logotipo-Reduzido.png')}
                            style={styles.logo}
                        />
                        <Button 
                            style={styles.closeButton}
                            onPress={handleClose}
                            icon="close"
                            mode='text'
                            labelStyle={{color: "black"}}
                            iconStyle={{color: "black"}} />
                    </View>

                    {/* Texts */}
                    <View style={styles.mssgsContainer}>
                        <Text style={styles.mssgTitle}>Validação de segurança.</Text>
                        <Text>Preencha todo o  formulário para definição  de uma nova senha de acesso.</Text>
                    </View>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        <TextInput
                            label="RG"
                            value={rgNumber}
                            onChangeText={setRGNumber}
                            onFocus={() => setRGNumber('')}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            label="CPF"
                            value={cpfNumber}
                            onChangeText={setCpfNumber}
                            onFocus={() => setCpfNumber('')}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            label="Data de Nascimento"
                            value={birthday}
                            onChangeText={setBirthday}
                            onFocus={() => setBirthday('')}
                            style={styles.input}
                            mode="outlined"
                        />
                        <TextInput
                            label="Matrícula"
                            value={registrationNumber}
                            onChangeText={setRegistrationNumber}
                            onFocus={() => setRegistrationNumber('')}
                            style={styles.input}
                            mode="outlined"
                        />
                        <Button style={styles.Button}>
                            <Text 
                                style={styles.textButton}
                                onPress={handlePasswordResetModal}>VALIDAR</Text>
                        </Button>
                    </View>
                </View>
            </View>
            <PasswordResetModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 0,
    },
    modalContent: {
        height: '100%',
        width: '80%',
        left: 0,
        backgroundColor: '#e0e0e0',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        zIndex: 1,
    },
    header: {
        top:'12%',
        width: '80%',
        left:'5%',
        right:'10%',
        flexDirection: 'row',
        alignContent: 'flex-start',
    },
    logo: {
        height: 40,
        width: 170,
    },
    closeButton: {
        marginLeft: '16%',
    },
    mssgsContainer: {
        //position: 'relative',
        top: '10%',
        width: '80%',
        left: '15%',
        right: '10%',
    },
    mssgTitle: {
        fontWeight: 'bold',
        marginBottom: '8%',
    },
    input: {
        top: '42%',
        backgroundColor:'#e0e0e0',
        width: '80%',
        height: 38,
        left: '10%',
        right: '10%',
        marginBottom: '4%',
        fontSize: 12,
        borderRadius: 8,
    },
    Button: {
        top: '50%',
        width: '80%',
        left: '10%',
        right: '10%',
        height: 38,
        backgroundColor: '#1e88e5',
        borderRadius: 8,
    },
    textButton: {
        fontSize: 14,
        color: '#fff',
    },
});

export default DrawerValidInformationModal;