import { createContext, ReactNode } from "react";
import * as AuthSession from "expo-auth-session";
import * as Google from 'expo-auth-session/providers/google'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({children}: AuthProviderProps){

  Google.useAuthRequest({
    clientId: 'xxx',
    redirectUri: AuthSession.makeRedirectUri({useProxy: true}), 
    scopes: ['profile','email']
  })

  async function signIn() {
    console.log('Vamos Logar!!!')
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      user: {
        name: 'UnsCrud',
        avatarUrl: 'https://github.com/unscrud.png'
      }
    }}>
      {children}
    </AuthContext.Provider>
  )
}