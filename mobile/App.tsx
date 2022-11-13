import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider, VStack, Text } from "native-base";

export default function App() {
  return (
    <NativeBaseProvider>
      <VStack 
        flex={1}
        bgColor='green.800'
        alignItems="center"
        justifyContent='center'
      >
        <Text color='yellow.300' fontSize='30'>Olá Mundo</Text>
        <StatusBar style="auto" />
      </VStack>
    </NativeBaseProvider>
  );
}