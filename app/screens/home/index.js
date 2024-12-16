import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { FAB, Button, Avatar } from 'react-native-paper';
import styles from './styles';
import AddServiceModal from '../../components/modals/addService';
import ItemDetailsModal from '../../components/modals/itemDetails';
import CheckoutServiceModal from '../../components/modals/checkoutService'
import DrawerMenuModal from '../../components/modals/drawerMenu';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [activeMode, setActiveMode] = useState('ongoing');
    const [addServiceModalVisible, setAddServiceModalVisible] = useState(false);
    const [itemDetailsModalVisible, setItemDetailsModalVisible] = useState(false);
    const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
    const [drawerModalVisible, setDrawerModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        fetchData(user.id);    
    },[]);

    const fetchData = async (USER_ID) => {

        try {
            const token = AsyncStorage.getItem("token");

            if(!token) {
                throw new Error("No token available");
            }

            const response = await fetch('https://serverpnae.winglet.app/atendimentos',{
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ USER_ID }),
            });

            if(!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            dataMap(data);

            setFilteredItems(items.filter(item => item.status === 'ongoing'));

        } catch(error) {
            console.error("Request error", error);
        };
    };
  

    
    const filterItems = (mode) => {
        setActiveMode(mode);

        if (mode === 'ongoing') {
            setFilteredItems(items.filter(item => item.status === 'ongoing'));
            setSearchText('');
        } else if (mode === 'history') {
            const historyItems = items.filter(item => item.status === 'finished');
            setFilteredItems(historyItems);
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        if (activeMode === 'history') {
            const filtered = items.filter(item =>
                item.status.toLowerCase() === 'finished' &&
                (
                    item.flyNumber.includes(text) || 
                    item.type.includes(text) ||
                    item.gate.includes(text) ||
                    item.seatPassenger.includes(text) ||
                    item.service.includes(text)
                )
            );
            setFilteredItems(filtered);
        }
    };

    {/* Set color status */}
    const getStatusColor = (status) => {
        return status.toLowerCase() === 'ongoing' ? '#0090d6' : '#4caf50';
    };

    {/* Search input to filter the recycle list */}
    const renderHeader = () => {
        if (activeMode === 'history') {
            return (
                <View style={styles.filterContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar"
                        value={searchText}
                        onChangeText={handleSearch}
                    />
                </View>
            );
        }
        return null;
    };

    const dataMap = (data) => {
        const result = [];

        for (let index in data) {
            const item = data[index];
            const localVar = {};

   
            localVar.id = item.ID, 
            localVar.flyNumber = item.FLY_NUMBER, 
            localVar.type = item.FLY_TYPE, 
            localVar.seatPassenger = item.SEAT_NUMBER, 
            localVar.service = item.SERVICE_TYPE, 
            localVar.gate = item.FLY_GATE,                 
            localVar.status = item.STATUS_SERVICE

            result.push(localVar)
        }
        setItems(result);
    }


    {/* Function to choose the recycle list modal */}
    const handleItemPress = (item) => {
        setSelectedItem(item);
        activeMode === 'ongoing' ? setCheckoutModalVisible(true) : setItemDetailsModalVisible(true);
    };

    const handleDrawerMenu = () => {
        setDrawerModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.rectangleLayout} />
                <View style={styles.contentView}>
                    {/* Header */}
                    <View style={styles.header}>
                        <Button style={styles.drawerButton}
                            icon="menu"
                            mode='text'
                            labelStyle={{ color: '#fff' }} 
                            iconStyle={{ color: '#fff', fontSize: 20 }}
                            onPress={handleDrawerMenu}
                        />
                        <Text style={styles.title}>ATENDIMENTO PNAE</Text>
                        <Avatar.Image 
                            style={styles.avatarImagem}
                            size={42}
                            source={require('../../../assets/images/_Avatar_.png')}
                        />
                    </View>

                    {/* Welcome Mssg View */}
                    <View style={styles.welcomeMssgContainer}>
                        <Text style={styles.welcomeUser}>Olá, {user?.name || 'Usuário'}!</Text>
                        <Text style={styles.welcomeMssg}>Gerencie sua fila de atendimentos aqui:</Text>
                    </View>

                    {/* Buttons to filter the recycle list */}
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonView}>
                            <TouchableOpacity 
                            style={[styles.buttonFilter]}
                            labelStyle={{ color: '#fff' }} 
                            onPress={() => filterItems('ongoing')}
                            >
                            <Icon name="people" size={15} color="#fff" />
                            <Text style={styles.buttonFilterText}>Em Andamento</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            style={[styles.buttonFilter]}
                            labelStyle={{ color: '#fff' }} 
                            onPress={() => filterItems('history')}
                            >
                            <Icon name="history" size={15} color="#fff" />
                            <Text style={styles.buttonFilterText}>Histórico</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Recycle list */}
                    <View style={styles.rectangleList}>
                        <View>{renderHeader()}</View>
                        
                        <FlatList
                            data={filteredItems}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.item} onPress={() => handleItemPress(item)}>
                                    <View style={styles.leftSection}>
                                        <Text style={styles.flyNumber}>{item.flyNumber}</Text>
                                        <Text style={styles.type}>{item.type}</Text>
                                    </View>
                                    <View style={styles.middleSection}>
                                        <Text style={styles.seatPassenger}>{item.seatPassenger}</Text>
                                        <Text style={styles.service}>{item.service}</Text>
                                    </View>
                                    <View style={styles.rightSection}>
                                        <Text style={styles.gateLabel}>Portão</Text>
                                        <Text style={styles.gate}>{item.gate}</Text>
                                    </View>
                                    <View style={styles.statusSection}>
                                        <View style={[styles.statusCircle, { backgroundColor: getStatusColor(item.status) }]} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        />
                    </View>

                    {/* Button FAB to start a new service */}
                    {activeMode === 'ongoing' && (
                        <FAB
                            style={styles.fab}
                            icon="plus"
                            onPress={() => setAddServiceModalVisible(true)}
                        />                
                    )}

                    {/* Fecha o modal para adicionar um serviço */}
                    <AddServiceModal 
                        visible={addServiceModalVisible} 
                        onClose={() => setAddServiceModalVisible(false)}
                    />

                    {/* Checkout Modal */}
                    <CheckoutServiceModal 
                        visible={checkoutModalVisible}
                        onClose={() => setCheckoutModalVisible(false)}
                        item={selectedItem}
                    />

                    {/* Modal para detalhes do item */}
                    <ItemDetailsModal 
                        visible={itemDetailsModalVisible} 
                        onClose={() => setItemDetailsModalVisible(false)} 
                        item={selectedItem}
                    />

                    <DrawerMenuModal 
                        visible={drawerModalVisible}
                        onClose={() => setDrawerModalVisible(false)}
                    />            

                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../../assets/images/Winglet-Logotipo-Reduzido.png')}
                            style={styles.logo}
                            resizeMode="contain"       
                        />
                    </View>
                </View>
        </View>
    );
};

export default HomeScreen;
