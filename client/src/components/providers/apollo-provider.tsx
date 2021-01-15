import { ApolloClient, ApolloProvider as ApolloProviderOC, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { FunctionComponent, useMemo } from 'react'
import { useAppState } from '../../hooks'

export const ApolloProvider: FunctionComponent = ({ children }) => {
    const { state } = useAppState()

    const apolloClient = useMemo(() => {
        const httpLink = createHttpLink({
            uri: process.env.REACT_APP_GRAPH_URL || 'http://localhost:5000/graphql',
        })

        const authLink = setContext((_, { _headers }) => {
            const token = state.jwt

            const headers = {
                ..._headers
            }

            if (token) {
                headers.authorization = `Bearer ${token}`
            }

            return { headers }
        })

        return new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache()
        })
    }, [state.jwt])

    return (
        <ApolloProviderOC client={apolloClient}>
            {children}
        </ApolloProviderOC>
    )
}