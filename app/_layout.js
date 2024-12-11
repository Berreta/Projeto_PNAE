import { Provider as PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { AuthProvider } from '../app/context/AuthContext';
import Toast from 'react-native-toast-message';

const Layout = () => {
  return (
    <AuthProvider>
      <PaperProvider>
          <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
      <Toast />
    </AuthProvider>
  );
};

export default Layout;
