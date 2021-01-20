import { Routes } from './routes'
import { Container } from '@material-ui/core'
import React from 'react'
import { ComposeProviders, SnackbarProvider, ApolloProvider, ThemeProvider, AppStateProvider, AlertsProvider, AuthProvider, LoadingProvider } from './providers'
import { Bootstrap } from './bootstrap'

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
          Bootstrap, // Bootstrap comes before AuthProvider because AuthProvider immediately tries to query for the authed user
          AuthProvider,
        ]}
      >
        <Routes />
      </ComposeProviders>
    </Container>
  )
}

export default App
