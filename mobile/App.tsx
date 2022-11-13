import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, VStack, Text } from "native-base";
import { THEME } from './src/styles/theme';

export default function App() {
  return (
    <NativeBaseProvider theme={THEME}>
      <VStack 
        flex={1}
        bgColor='gray.900'
        alignItems="center"
        justifyContent='center'
      >
        <Text color='yellow.300' fontSize='30'>Olá Mundo</Text>
        <StatusBar style="auto" />
      </VStack>
    </NativeBaseProvider>
  );
}