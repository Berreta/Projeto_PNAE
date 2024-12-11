{/*
import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, CameraType } from 'expo-camera/legacy';

const CameraModal = ({ visible, onClose, onCapture }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back); 
  const cameraRef = useRef(null);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    getPermissions();
  }, []);

  const handleCapture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      onCapture(photo.uri);
      onClose();
    }
  };

  if (hasPermission === null) {
    return <Text>Carregando...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Permissão para a câmera negada</Text>;
  }

  // Garantir que o 'type' tenha um valor válido antes de renderizar a câmera
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.cameraContainer}>
        {type !== undefined ? (
          <Camera style={styles.camera} type={type} ref={cameraRef}>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.captureButton} onPress={handleCapture}>

              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </Camera>
        ) : (
          <Text>Erro ao carregar a câmera {type} </Text>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  buttonsContainer: {
    position: 'absolute',       // Para colocar os botões fora do fluxo normal
    bottom: 30,                 // Distância da parte inferior
    left: 0,                    // Garantir que o container ocupe toda a largura
    right: 0,                   // Garantir que o container ocupe toda a largura
    alignItems: 'center',       // Centraliza o conteúdo horizontalmente
    justifyContent: 'center',   // Centraliza o conteúdo verticalmente
    paddingHorizontal: 20,      // Adiciona um pouco de margem nas laterais
  },
  captureButton: {
    backgroundColor: 'transparent',  // Fundo transparente
    borderRadius: 50,                // Faz o botão circular
    borderColor: 'gray',             // Cor da borda
    borderWidth: 3,                  // Espessura da borda
    width: 70,                       // Largura do botão
    height: 70,                      // Altura do botão
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: 'transparent',  // Fundo transparente
    width: 70,                       // Largura do botão
    height: 40,                      // Altura do botão
    position: 'absolute',            // Para posicionar o botão fora do fluxo normal
    top: -660,                         // Distância do topo
    right: 40,                       // Distância da parte direita da tela
    justifyContent: 'center',        // Centraliza conteúdo dentro do botão
    alignItems: 'center',            // Centraliza conteúdo dentro do botão
  },
  closeText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },

});

export default CameraModal;
*/}