import { ApolloProvider as ApolloProviderOC } from '@apollo/client'
import { FunctionComponent, useMemo } from 'react'
import { useApolloClientFactory } from '../../hooks'

export const ApolloProvider: FunctionComponent = ({ children }) => {
    const apolloClientFactory = useApolloClientFactory()

    const apolloClient = useMemo(apolloClientFactory, [])

    return (
        <ApolloProviderOC client={apolloClient}>
            {children}
        </ApolloProviderOC>
    )
}