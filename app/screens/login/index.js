import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { View, Image } from 'react-native';
import { TextInput, Text } from 'react-native-paper';
import styles from './styles';
import { TouchableOpacity } from 'react-native';
import { call } from '../../utils/callphoneFunction'; 
import Toast from 'react-native-toast-message';
import DrawerRecoverAccessModal from '../../components/modals/drawerValidaçãoInfo';

const LoginScreen = () => { 

    const router = useRouter();
    const [username, setUsername] = useState('Insira sua matrícula');
    const [password, setPassword] = useState('Digite sua senha');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    {/* Call phone function */}
    const handleCall = () => {
        call();
    }

    const handleLogin = async () => {

        if(username === 'Insira sua matrícula' || 
            password === 'Digite sua senha' ||
            !username || !password) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Preencha todos os campos!',
            });
            return;
        }

        try {
            setLoading(true);
            await login(username.trim().toLocaleLowerCase(), password);
            router.replace('/screens/home');
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                text1: 'Crendenciais inválidas.',
                text2: 'Tente novamente!'
            });

        } finally {
            setLoading(false);
        }
    };

    const handleRecoverAccessModal = () => {
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/images/img-login.png')}
                style={styles.backgroundImage}
                resizeMode="stretch"
            />
            
            <View style={styles.rectangleLayout}>

                <Image 
                    source={require('../../../assets/images/Winglet-Logotipo-Reduzido.png')}
                    style={styles.logoImage}
                    resizeMode="contain"
                />

                {/* Form fields */}
                <View style={styles.form}>

                    {/* Credentials field */}
                    <TextInput
                        label="Usuário"
                        value={username}
                        onChangeText={setUsername}
                        onFocus={() => {
                            setUsername(''); // Limpa o campo ao focar
                        }}
                        style={styles.input}
                        mode="outlined"
                    />

                    {/* Password field */}
                    <TextInput
                        label="Senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={showPassword}
                        onFocus={() => {
                            setPassword(''); 
                            setShowPassword(true); 
                        }}
                        style={styles.input}
                        mode="outlined"
                        right={
                            <TextInput.Icon
                                name={showPassword ? 'eye-off' : 'eye'} 
                                onPress={() => setShowPassword(!showPassword)} 
                            />
                        }
                    />
                    
                    <TouchableOpacity 
                        style={styles.buttonSignIn} 
                        onPress={handleLogin}>

                        <Text style={styles.buttonTextSignIn}>ENTRAR</Text>
                    </TouchableOpacity>

                    {/* Forgot button */}
                    <TouchableOpacity
                        style={styles.buttonResetPssw}
                        onPress={handleRecoverAccessModal}
                    >
                    
                    <Text style={styles.buttonResetPsswText}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity
                    style={styles.AtendButtonContainer}
                    onPress={handleCall}
                >
                    <Image                    
                            source={require('../../../assets/images/Atend_Icon_.png')}
                            style={styles.atendButtonIcon}/>
                </TouchableOpacity>

                {/* Footers messages */}
                <View style={styles.FooterContainer}>
                    <Text style={styles.FooterTextCompany}>Powered by WFS | Orbital</Text>
                    <Text style={styles.FooterTextVersion}>versão beta</Text>
                </View>
            </View>
            <DrawerRecoverAccessModal 
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
            />
        </View>
    );
};

export default LoginScreen;