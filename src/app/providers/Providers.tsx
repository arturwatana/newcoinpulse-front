'use client'
import { ApolloProvider } from "@apollo/client"
import { apolloClient } from "@/utils/apolloClient/apollo.client"
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const colors = {
  brand: {
    "primary": '#F2A900',
    800: '#153e75',
    700: '#2a69ac',
  },
}


export const theme = extendTheme({ colors })

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ApolloProvider client={apolloClient}>
      <ChakraProvider theme={theme}>
      <ToastContainer/>
        {children}
      </ChakraProvider>
        </ApolloProvider>
    </CacheProvider>
  )
}