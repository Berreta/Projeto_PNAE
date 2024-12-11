import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0B4B6F',
    },
    image: {
        position: 'absolute',
        top: '0%', 
        left: 0,
        width: 380, 
        height: 380, 
    },
    text: {
        position: 'absolute',
        color: '#fff',
        fontSize: 52,
        fontWeight: 'bold',
        top: '40%',
    },
});

export default styles;