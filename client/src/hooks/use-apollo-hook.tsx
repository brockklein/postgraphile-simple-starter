import { QueryResult } from "@apollo/client"
import { useEffect, useState } from "react"
import { useLoading } from "./use-loading"
import { usePrevious } from "react-use"
import { IAlertWithKey, useAlert } from "./use-alert"


/**
    __useApolloQueryHook__

    A hook that automatically handles a few common UI cases when making a GraphQL query or mutation (e.g. show/hide loading, display error responses).

**/
interface IUseApolloQueryHookArgs<T> {
    query: QueryResult<T>

    loadingUi?: 'alert' | 'overlay' | 'none'
}
export const useApolloQueryHook = <T,>({ query, loadingUi }: IUseApolloQueryHookArgs<T>) => {
    const [startLoading, stopLoading] = useLoading()
    const { addAlert, updateAlert } = useAlert()

    const [alert, setAlert] = useState<IAlertWithKey>()

    if (loadingUi === 'alert') {
        setAlert(
            addAlert({
                title: 'Loading...',
                type: 'info',
                banner: true,
                persist: true,
                closable: false
            })
        )
    }

    const { loading, error } = query

    const previousLoading = usePrevious(loading)
    useEffect(() => {
        switch (loadingUi) {
            case 'overlay':
                if (loading) startLoading()
                if (!loading) stopLoading()
                break
            case 'alert':
                if (!loading && previousLoading && alert && !error) {
                    updateAlert({
                        ...alert,
                        title: 'Success!',
                        type: 'success',
                        persist: false,
                        closable: true,
                    })
                }
                break
            case 'none':
                break
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    useEffect(() => {
        if (error) {
            if (alert) {
                updateAlert({
                    ...alert,
                    title: 'Success!',
                    type: 'success',
                    persist: false,
                    closable: true,
                })
            } else {
                const newAlert = addAlert({
                    type: 'error',
                    title: error.name,
                    body: error.message,
                    persist: true,
                    closable: true,
                })
                setAlert(newAlert)
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return query
}
