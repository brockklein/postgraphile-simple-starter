import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { apolloClient } from '../apollo';
import { AlertsProvider } from '../hooks/use-alert';
import { AuthProvider } from '../hooks/use-auth';
import { LoadingProvider } from '../hooks/use-loading';
import { ComposeProviders } from './compose-providers';
import { Routes } from './routes';

export const App = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ComposeProviders providers={[ApolloProvider, LoadingProvider, AlertsProvider, AuthProvider]}>
        <Routes />
      </ComposeProviders>
    </ApolloProvider>
  )
}

export default App
