import { Routes } from './routes'
import { Container } from '@material-ui/core'
import React from 'react'
import { ComposeProviders, SnackbarProvider, ApolloProvider, ThemeProvider, AppStateProvider, AlertsProvider, AuthProvider, LoadingProvider } from './providers'

export const App = () => {
  return (
    <Container style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <ComposeProviders
        providers={[
          AppStateProvider,
          ThemeProvider,
          LoadingProvider,
          SnackbarProvider,
          AlertsProvider,
          ApolloProvider,
          AuthProvider
        ]}
      >
        <Routes />
      </ComposeProviders>
    </Container>
  )
}

export default App
