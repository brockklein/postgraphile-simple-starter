import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client'
import { useMemo } from 'react'
import { useApolloErrorLink, useApolloHttpLink, useApolloRequestLink } from './apollo'
import { useApolloTokenRefreshLink } from './apollo/token'

export const useApolloClientFactory = () => {
    const apolloTokenLink = useApolloTokenRefreshLink()
    const apolloErrorLink = useApolloErrorLink()
    const apolloRequestLink = useApolloRequestLink()
    const apolloHttpLink = useApolloHttpLink()

    const apolloClientFactory = useMemo(() => {
        return () => {
            return new ApolloClient({
                link: ApolloLink.from([
                    apolloTokenLink,
                    apolloErrorLink,
                    apolloRequestLink,
                    apolloHttpLink,
                ]),
                cache: new InMemoryCache()
            })
        }
    }, [])

    return apolloClientFactory
}