import { Provider as PaperProvider } from 'react-native-paper';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import Toast from 'react-native-toast-message';

const Layout = () => {
  return (
    <AuthProvider>
      <PaperProvider>
          <Stack screenOptions={{ headerShown: false }} />
      </PaperProvider>
      {/* Toast config */}
      <Toast />
    </AuthProvider>
  );
};

export default Layout;
