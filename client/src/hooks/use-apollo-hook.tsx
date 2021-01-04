import { QueryResult } from "@apollo/client"
import { useEffect, useState } from "react"
import { useLoading } from "./use-loading"
import { useSnackbar } from "notistack"
import { useAlert } from "./use-alert"


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

    const { enqueueSnackbar, closeSnackbar } = useSnackbar()
    const [snackbarKey, setSnackbarKey] = useState<string>()

    const { addAlert } = useAlert()

    const { loading, error } = query

    useEffect(() => {
        switch (loadingUi) {
            case 'overlay':
                if (loading) startLoading()
                if (!loading) stopLoading()
                break
            case 'alert':
                if (loading) setSnackbarKey(enqueueSnackbar('Loading...', { variant: 'info', persist: true }).toString())
                if (!loading && snackbarKey) closeSnackbar(snackbarKey)
                break
            case 'none':
                break
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    useEffect(() => {
        if (error) {
            if (snackbarKey) closeSnackbar(snackbarKey)
            addAlert({
                title: `Error: ${error.name}`,
                body: (
                    <div>
                        
                    </div>
                ),
                type: 'error'
            })
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return query
}
