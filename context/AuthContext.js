import React, { useEffect, createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando o AsyncStorage

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verificar se há um token salvo, mas sem fazer requisição imediata à API
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                // O token está presente, portanto, devemos verificar se ele é válido.
                setUser({ isAuthenticated: true });
            }
            setLoading(false); // Finaliza o loading após a verificação do token
        };

        checkToken(); // Chama a função que verifica o token
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                await AsyncStorage.setItem('token', data.token); // Armazena o token
                setUser({ 
                    id: data.userId, 
                    email: data.email, 
                    isAdmin: data.isAdmin, 
                    name: data.name, 
                    company_role: data.company_role, 
                    profile_picture: data.profile_picture 
                });
            } else {
                throw new Error(JSON.stringify(data));
            }
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem('token'); // Remove o token
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
