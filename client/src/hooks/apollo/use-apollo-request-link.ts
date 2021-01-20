import { ApolloLink, Observable } from "@apollo/client"
import { useMemo } from "react"
import { getAccessToken } from "./token"

export const useApolloRequestLink = () => {
    return useMemo(() => {
        return new ApolloLink(
            (operation, forward) =>
                new Observable(observer => {
                    let handle: ZenObservable.Subscription
                    Promise.resolve(operation)
                        .then(operation => {
                            const accessToken = getAccessToken()
                            if (accessToken) {
                                operation.setContext({
                                    headers: {
                                        Authorization: `Bearer ${accessToken}`
                                    }
                                })
                            }
                        })
                        .then(() => {
                            handle = forward && forward(operation).subscribe({
                                next: observer.next.bind(observer),
                                error: observer.error.bind(observer),
                                complete: observer.complete.bind(observer)
                            })
                        })
                        .catch(observer.error.bind(observer))

                    return () => {
                        if (handle) handle.unsubscribe()
                    }
                })
        )
    }, [])
}