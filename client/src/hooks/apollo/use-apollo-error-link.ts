import { onError } from "@apollo/client/link/error"
import { useMemo } from "react"

export const useApolloErrorLink = () => {
    return useMemo(() => {
        return onError(({ graphQLErrors, networkError, operation }) => {
            if (graphQLErrors) {
                for (let err of graphQLErrors) {
                    console.error(
                        '[GraphQL error]: Message:', err.message, 'Location(s):', err.locations, 'Path:', err.path
                    )
                }
            }
            if (networkError) {
                console.warn('[Network error]:', networkError, 'Operation:', operation.operationName)
            }
        })
    }, [])
}