import { Alert, Linking } from 'react-native';

export const call = () => {
    const phoneNumber = '123456789';
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
    .then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        Alert.alert('Não foi possível realizar a chamada');
      }
    })
    .catch((err) => {
      console.error('Erro ao tentar abrir o link', err);
      Alert.alert('Ocorreu um erro ao tentar realizar a chamada');
    });
};