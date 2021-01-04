import { AlertsProvider } from '../hooks/use-alert';
import { AuthProvider } from '../hooks/use-auth';
import { LoadingProvider } from '../hooks/use-loading';
import { ApolloProvider } from './apollo-provider';
import { ComposeProviders } from './compose-providers';
import { Routes } from './routes';
import { SnackbarProvider } from './snackbar-provider';

export const App = () => {
  return (
    <ComposeProviders
      providers={[
        LoadingProvider,
        SnackbarProvider,
        AlertsProvider,
        ApolloProvider,
        AuthProvider
      ]}
    >
      <Routes />
    </ComposeProviders>
  )
}

export default App
