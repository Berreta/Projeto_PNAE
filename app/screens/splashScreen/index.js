import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
// import { useRouter } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
import styles from './styles';

const SplashScreenComponent = () => {

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../../assets/images/wing-logo.png')} 
                style={styles.image} 
                resizeMode="contain"
            />
            <Text style={styles.text}>winglet</Text>
        </View>
    );
};

export default SplashScreenComponent;