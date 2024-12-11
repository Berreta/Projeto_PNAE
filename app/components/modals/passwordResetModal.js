import React, {useState} from "react";
import { View, StyleSheet, Modal, Image, Text } from 'react-native';
import { TextInput, Button } from "react-native-paper";
import { useRouter } from 'expo-router';

const PasswordResetModal = ({ visible, onClose }) => {

    const initialState = {
        newPassword: 'example',
    };

    const router = useRouter();
    const [ newPassword, setNewPassword ] = useState(initialState.newPassword);
    const [ showNewPassword, setShowNewPassword ] = useState(true);
    const [ confirmNewPassword, setConfirmNewPassword ] = useState(initialState.newPassword);
    const [ showConfirmNewPassword, setShowConfirmNewPassword ] = useState(true);

    handleClose = () => {
        onClose();
    };

    const handleSave = async () => {
        try {
            router.replace('screens/login');
        } catch {
            console.log('Save error');
        };
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
                    <Text style={styles.mssgTitle}>Redefinição de senha.</Text>
                    <Text>Seus dados foram identificados com sucesso! Defina sua nova senha.</Text>
                </View>

                {/* Form */}
                <View style={styles.formContainer}>
 
                    <TextInput
                        label="Digite sua nova senha"
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
                        label="Repita sua nova senha"
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

                    <Button 
                        style={styles.Button}
                        onPress={handleSave}>
                        <Text style={styles.textButton}>SALVAR</Text>
                    </Button>
                </View>
            </View>
        </View>

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
        left: '10%',
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
    formContainer: {
        top: '6%',
    }
});

export default PasswordResetModal;