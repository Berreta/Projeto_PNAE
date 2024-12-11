import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { FAB, Button, Avatar } from 'react-native-paper';
import styles from './styles';
import AddServiceModal from '../../components/modals/addService';
import ItemDetailsModal from '../../components/modals/itemDetails';
import CheckoutServiceModal from '../../components/modals/checkoutService'
import DrawerMenuModal from '../../components/modals/drawerMenu';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

    {/* Fake data */}
    const exampleData = [
        { id: '1', flyNumber: 'LA 3429', type: 'Desembarque', seatPassenger: '25D', service: 'WCHR+', gate: '256', status: 'Iniciado' },
        { id: '2', flyNumber: 'LA 3430', type: 'Embarque', seatPassenger: '11E', service: 'WCHR+', gate: '257', status: 'Iniciado' },
        { id: '4', flyNumber: 'LA 3431', type: 'Desembarque', seatPassenger: '14A', service: 'WCHR+', gate: '259', status: 'Finalizado' },
        { id: '5', flyNumber: 'LA 3432', type: 'Embarque', seatPassenger: '13R', service: 'WCHR+', gate: '260', status: 'Finalizado' },
        { id: '6', flyNumber: 'LA 3433', type: 'Desembarque', seatPassenger: '19C', service: 'WCHR+', gate: '261', status: 'Finalizado' },
        { id: '7', flyNumber: 'LA 3434', type: 'Embarque', seatPassenger: '23J', service: 'WCHR+', gate: '262', status: 'Finalizado' },
        { id: '8', flyNumber: 'LA 3435', type: 'Desembarque', seatPassenger: '22F', service: 'WCHR+', gate: '263', status: 'Finalizado' },
        { id: '9', flyNumber: 'LA 3436', type: 'Embarque', seatPassenger: '20D', service: 'WCHR+', gate: '264', status: 'Finalizado' },
        { id: '10', flyNumber: 'LA 3437', type: 'Desembarque', seatPassenger: '21C', service: 'WCHR+', gate: '265', status: 'Finalizado' },
        { id: '11', flyNumber: 'LA 3438', type: 'Embarque', seatPassenger: '27F', service: 'WCHR+', gate: '266', status: 'Finalizado' },
        { id: '12', flyNumber: 'LA 3439', type: 'Desembarque', seatPassenger: '25G', service: 'WCHR+', gate: '267', status: 'Finalizado' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            setItems(exampleData);
            setFilteredItems(exampleData.filter(item => item.status.toLowerCase() === 'iniciado'));
        };
        fetchData();
    }, []);

    const filterItems = (mode) => {
        setActiveMode(mode);

        if (mode === 'ongoing') {
            setFilteredItems(items.filter(item => item.status.toLowerCase() === 'iniciado'));
            setSearchText('');
        } else if (mode === 'history') {
            const historyItems = items.filter(item => item.status.toLowerCase() === 'finalizado');
            setFilteredItems(historyItems);
        }
    };

    const handleSearch = (text) => {
        setSearchText(text);
        if (activeMode === 'history') {
            const filtered = items.filter(item =>
                item.status.toLowerCase() === 'finalizado' &&
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

    const getStatusColor = (status) => {
        return status.toLowerCase() === 'iniciado' ? '#0090d6' : '#4caf50';
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

    {/* Function to choose the recycle list modal */}
    const handleItemPress = (item) => {
        setSelectedItem(item);
        activeMode === 'ongoing' ? setCheckoutModalVisible(true) : setItemDetailsModalVisible(true);
    };

    handleDrawerMenu = () => {
        setDrawerModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.rectangleLayout} />

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
    );
};

export default HomeScreen;
