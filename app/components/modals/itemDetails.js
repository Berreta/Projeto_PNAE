// components/modals/itemDetails.js

import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, Modal, StyleSheet } from 'react-native';

const ItemDetailsModal = ({ visible, onClose, item }) => {
    if (!item) return null;

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text style={styles.title}>Detalhes do Atendimento</Text>
                    <Text style={styles.detailsText}>Voo: {item.flyNumber}</Text>
                    <Text style={styles.detailsText}>Tipo: {item.type}</Text>
                    <Text style={styles.detailsText}>Assento: {item.seatPassenger}</Text>
                    <Text style={styles.detailsText}>Serviço: {item.service}</Text>
                    <Text style={styles.detailsText}>Portão: {item.gate}</Text>

                    {/* Footer button */}
                    <View>
                        <TouchableOpacity 
                            style={styles.closeButton}
                            onPress={onClose}>
                            <Text style={styles.closeButtonText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 5,
        width: '80%',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 32,
        alignItems: 'center',
    },
    detailsText: {
        fontSize: 16,
    },
    closeButton: {
        left: '15%',
        right: '15%',
        width: '70%',
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        marginTop: '12%',
        borderRadius: 8,
    },
    closeButtonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ItemDetailsModal;
