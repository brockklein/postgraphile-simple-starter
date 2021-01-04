import { ApolloProvider as ApolloProviderOC } from '@apollo/client';
import { FunctionComponent } from 'react';
import { apolloClient } from '../apollo';

export const ApolloProvider: FunctionComponent = ({ children }) => {
    return (
        <ApolloProviderOC client={apolloClient}>
            {children}
        </ApolloProviderOC>
    )
}