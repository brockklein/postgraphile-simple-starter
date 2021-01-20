import { ReactNode, useEffect } from "react"
import { useCurrentUserQuery } from "../graphql/autogenerate/hooks"
import { useAppState } from "../hooks"
import { AppActionType } from "../stores/app-state"
import { Loading } from "./loading"

/**
    __Bootstrap__

    @description
    What happens during Bootstrap?
    - Attempt to fetch the current user, if the request goes through, bootstrap as authed, otherwise bootstrap as un-authed.
**/
export const Bootstrap = ({ children }: { children: ReactNode }) => {
    const { state, dispatch } = useAppState()

    const currentUserQueryStatus = useCurrentUserQuery()

    useEffect(() => {
        if (!currentUserQueryStatus.loading) dispatch({ type: AppActionType.bootstrap, payload: { authed: !!currentUserQueryStatus.data?.currentUser } })
    }, [currentUserQueryStatus])


    /* 
        We don't want to begin rendering the app until it has been bootstrapped.

        This helps make sure all opening configuration has been finished before anything tries to render.

        E.g. checking for a valid or stale auth, setting up theme data, fetching remote config, etc.
    */
    if (!state.bootstrapped) return <Loading />

    return (
        <>
            {children}
        </>
    )
}