import { NavigationContainer } from '@react-navigation/native'
import { SignIn } from '../screens/Signin';

export function Routes() {
  return (
    <NavigationContainer>
      <SignIn />
    </NavigationContainer>
  )
}