import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import { Button, Avatar } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { call } from '../../utils/callphoneFunction';

const DrawerPerfilModal = ({ visible, onClose }) => {

    const initialState = {
        lastPasswordMssg: 'Senha Atual',
        newPasswordMssg: 'Nova senha',
        confirmNewPasswordMssg: 'Repita a nova senha',
    };

    const { user, logout } = useAuth();
    const router = useRouter();
    const [lastPassword, setLastPassword] = useState(initialState.lastPasswordMssg);
    const [newPassword, setNewPassword] = useState(initialState.newPasswordMssg);
    const [confirmNewPassword, setConfirmNewPassword] = useState(initialState.confirmNewPasswordMssg);
    const [showLastPassword, setShowLastPassword] = useState(true);
    const [showNewPassword, setShowNewPassword] = useState(true);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(true);

    handleClose = () => {
        onClose();
    };

    handleLogout = async () => {
        try {
            await logout();
            sessionStorage.clear();
            router.replace('screens/login');
        } catch {
            console.error('Error sign out');
        }
    };

    handleCall = () => {
        call();
    };

    return(
        <Modal
            transparent={true}
            onRequestClose={onClose}
            visible={visible}>

            <View style={styles.modalContent}>
                <View style={styles.headerContainer}>
                    <Avatar.Image 
                        style={styles.avatarImagem}
                        size={42}
                        source={require('../../../assets/images/_Avatar_.png')}
                    />
                    <Button
                        style={styles.closeButton}
                        onPress={handleClose}
                        icon="close"
                        mode='text'
                        labelStyle={{ color: 'black' }} 
                        iconStyle={{ color: 'black'}}
                    />
                </View>

                {/* Messages */}
                <View style={styles.mssgContainer}>
                    <Text style={styles.mssgUser}>{user?.name || 'Usuário'}</Text>
                    <Text style={styles.mssgCompany}>{user?.company_role || 'Matrícula'}</Text>
                    <Text style={styles.mssgCompany}>{user?.company_role || 'Função'}</Text>
                </View>

                <View>
                    <View style={styles.form_password}>
                            <TextInput
                                label="Senha atual"
                                value={lastPassword}
                                onChangeText={setLastPassword}
                                secureTextEntry={showLastPassword}
                                onFocus={() => {
                                    setLastPassword(''); 
                                    setShowLastPassword(true); 
                                }}
                                style={styles.input}
                                mode="outlined"
                                right={
                                    <TextInput.Icon
                                        name={showLastPassword ? 'eye-off' : 'eye'} 
                                        onPress={() => setShowLastPassword(!showLastPassword)} 
                                    />
                                } />

                            <TextInput
                                label="Nova senha"
                                value={newPassword}
                                onChangeText={setNewPassword}
                                secureTextEntry={showNewPassword}
                                onFocus={() => {
                                    setNewPassword(''); 
                                    setShowNewPassword(true); 
                                }}
                                style={styles.input}
                                mode="outlined"
                                right={
                                    <TextInput.Icon
                                        name={showNewPassword ? 'eye-off' : 'eye'} 
                                        onPress={() => setShowNewPassword(!showNewPassword)} 
                                    />
                                } />

                            <TextInput
                                label="Repita a nova senha"
                                value={confirmNewPassword}
                                onChangeText={setConfirmNewPassword}
                                secureTextEntry={showConfirmNewPassword}
                                onFocus={() => {
                                    setConfirmNewPassword(''); 
                                    setShowConfirmNewPassword(true); 
                                }}
                                style={styles.input}
                                mode="outlined"
                                right={
                                    <TextInput.Icon
                                        name={showConfirmNewPassword ? 'eye-off' : 'eye'} 
                                        onPress={() => setShowConfirmNewPassword(!showConfirmNewPassword)} 
                                    />
                                } />
                        </View>
                    <Button 
                        style={styles.saveButton}
                        onPress={() => console.log('Save button pressed!')}>
                        <Text style={styles.saveButtonText}>SALVAR</Text>
                    </Button>
                </View>
                {/* Menu */}
                <View style={styles.menuContainer}>

                    <TouchableOpacity
                    style={styles.buttonContainer}
                        labelStyle={{ color: '#fff' }} 
                        onPress={handleCall}>

                        <Icon name="headset" size={20} color={"black"} style={styles.margin}/>
                        <Text style={styles.textButton}>SUPORTE</Text>
                    </TouchableOpacity>

                    <View style={styles.lineStyle} />

                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        labelStyle={{ color: 'black' }} 
                        onPress={handleLogout}>

                        <Icon name="logout" size={20} color={"black"} style={styles.margin}/>
                        <Text style={styles.textButton}>SAIR</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
       backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    modalContent: {
        left: 0,
        height:'100%',
        width:'84%',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#e0e0e0',
        zIndex: 0,
    },
    mssgContainer: {
        width: '90%',
        left: '12%',
        top: '2%',
    },
    input: {
        top: '24%',
        width: '80%',
        height: 40,
        left: '10%',
        right: '10%',
        marginBottom: '2%',
        backgroundColor: '#e0e0e0',
    },
    saveButton: {
        top: '24%',
        width: '80%',
        height: 40,
        left: '10%',
        right: '10%',
        backgroundColor: '#1e88e5',
        borderRadius: 6,

    },  
    saveButtonText: {
        color: '#fff',
    },
    headerContainer: {
        flexDirection: 'row',
        height: '8%',
        left: '4%',
        top: '4%',
    },
    mssgUser: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
    mssgCompany: {
        color: 'black',
    },
    avatarImagem: {
        left: '4%',
    },
    closeButton: {
        left: '320%',
    },
    menuContainer: {
        top: '16%',
        left: '16%'
    },
    textButton: {
        color: 'black',
    },
    buttonContainer: {
        left: '2%',
        flexDirection: 'row',
        marginBottom: '16%',
    },
    margin: {
        marginRight: '4%',
    },
    lineStyle: {
        width: '83%',
        height: "0.5%",
        backgroundColor: 'black',
        marginBottom: '16%',
    },
});

export default DrawerPerfilModal;