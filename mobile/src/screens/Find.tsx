import { Heading, VStack } from "native-base";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

export function Find() {
  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title="Buscar por código" showBackButton/>
      
      <VStack mt={8} mx={5} alignItems="center">

        <Heading fontFamily="heading" color="white" fontSize="lg" mb={8} textAlign="center">
          Encontre um bolão através de {'\n'}
           seu código único
        </Heading>

        <Input mb={2} placeholder='Qual código do bolão?' />

        <Button title="BUSCAR BOLÃO"/>

      </VStack>
    </VStack>
  )
}