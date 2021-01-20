import { HttpLink } from "@apollo/client"
import { useMemo } from "react"

export const useApolloHttpLink = () => {
    return useMemo(() => {
        return new HttpLink({
            uri: process.env.REACT_APP_GRAPH_URL || 'http://localhost:5000/graphql',
            // credentials: 'include'
        })
    }, [])
}