import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { AuthProvider } from '../context/AuthContext'; 
import SplashScreenComponent from './screens/splashScreen'; 
import LoginScreen from './screens/login';

SplashScreen.preventAutoHideAsync();

const Index = () => {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
  
                await new Promise(resolve => setTimeout(resolve, 2000));
                setIsReady(true);
                await SplashScreen.hideAsync();
            } catch (e) {
                console.warn(e);
            }
        };

        prepare();
    }, []);

    if (!isReady) {
        return (
            <SplashScreenComponent />
        );
    }

    return (
        <AuthProvider>
                <LoginScreen />   
        </AuthProvider>
    );
 };

export default Index;
