import React, {useState} from 'react';
import { View, Text,TouchableOpacity, StyleSheet, Modal, Image  } from 'react-native';
import { Button, Avatar } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { call } from '../../utils/callphoneFunction';
import DrawerPerfilModal from './drawerPerfil';

const DrawerMenuModal = ({ visible, onClose }) => {
    const { user, logout } = useAuth();
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);

    handleClose = () => {
        onClose();
    };

    handleLogout = async () => {
        try {
            await logout();
            AsyncStorage.clear();
            router.replace('screens/login');
        } catch {
            console.error('Error sign out');
        }
    };

    handleCall = () => {
        call();
    };

    handleDrawerPerfil = () => {
        setModalVisible(true);
    };

    return(
        <Modal
            transparent={true}
            onRequestClose={onClose}
            visible={visible}
            >
                
            <View
            style={styles.container}
            >
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
                            labelStyle={{ color: '#fff' }} 
                            iconStyle={{ color: '#fff'}}
                        />
                    </View>

                    {/* Messages */}
                    <View style={styles.mssgContainer}>
                        <Text style={styles.mssgUser}>Olá, {user?.name || 'Usuário'}</Text>
                        <Text style={styles.mssgCompany}>Um ótimo voo, começa com você.</Text>
                    </View>

                    {/* Menu */}
                    <View style={styles.menuContainer}>
                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            labelStyle={{ color: '#fff' }} 
                            onPress={handleDrawerPerfil}>

                            <Icon name="person" size={20} color={"#fff"} style={styles.margin}/>
                            <Text style={styles.textButton}>MEU PERFIL</Text>
                        </TouchableOpacity>

                        <View style={styles.lineStyle} />

                        <TouchableOpacity
                        style={styles.buttonContainer}
                            labelStyle={{ color: '#fff' }} 
                            onPress={handleCall}>

                            <Icon name="headset" size={20} color={"#fff"} style={styles.margin}/>
                            <Text style={styles.textButton}>SUPORTE</Text>
                        </TouchableOpacity>

                        <View style={styles.lineStyle} />

                        <TouchableOpacity 
                            style={styles.buttonContainer}
                            labelStyle={{ color: '#fff' }} 
                            onPress={handleLogout}>

                            <Icon name="logout" size={20} color={"#fff"} style={styles.margin}/>
                            <Text style={styles.textButton}>SAIR</Text>
                        </TouchableOpacity>
                        <DrawerPerfilModal 
                            visible={modalVisible}
                            onClose={() => setModalVisible(false)}
                        />  
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
       flex: 1,
       justifyContent: 'left',
       alignItems: 'left',
       backgroundColor: 'rgba(0, 0, 0, 0.5)',
       zIndex: 0,
    },
    modalContent: {
        left: 0,
        height:'100%',
        width:'84%',
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        backgroundColor: '#0b4b6f',
        zIndex: 1,
    },
    mssgContainer: {
        width: '90%',
        left: '12%',
        top: '2%',
    },
    headerContainer: {
        flexDirection: 'row',
        height: '8%',
        left: '4%',
        top: '2%',
    },
    mssgUser: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    mssgCompany: {
        color: 'white',
    },
    avatarImagem: {
        left: '4%',
    },
    closeButton: {
        left: '68%',
    },
    menuContainer: {
        top: '10%',
        left: '16%'
    },
    textButton: {
        color: '#fff',
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
        backgroundColor: '#fff',
        marginBottom: '16%',
    },
});

export default DrawerMenuModal;