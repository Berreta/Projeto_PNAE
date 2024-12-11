import React, { useEffect, createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando o AsyncStorage

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);
    const [auth, setAuth] = useState();

    useEffect(() => {
        // Verificar se há um token salvo, mas sem fazer requisição imediata à API
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // O token está presente, portanto, devemos verificar se ele é válido.
                setAuth({ isAuthenticated: true });
            }
            setLoading(false); // Finaliza o loading após a verificação do token
        };

        checkToken(); // Chama a função que verifica o token
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('https://serverpnae.winglet.app/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                await AsyncStorage.setItem('token', data.token);
                setUser({ 
                    id: data.userId, 
                    email: data.email, 
                    isAdmin: data.isAdmin, 
                    name: data.name, 
                    company_role: data.company_role, 
                });

            } else {
                throw new Error(JSON.stringify(data));
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token');
        setUser(null);
    }; 

    return (
        <AuthContext.Provider value={{ auth, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};