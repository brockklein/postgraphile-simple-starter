import { MutationFunctionOptions } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import React, { useEffect, useContext, createContext, FunctionComponent } from 'react'
import { useLocalStorage } from 'react-use'
import { useAppState, useLoadingOverlay } from '.'
import { useCurrentUserLazyQuery, useRegisterUserMutation } from '../graphql/autogenerate/hooks'
import { RegisterUserMutation, RegisterUserMutationVariables } from '../graphql/autogenerate/operations'
import { AppActionType } from '../stores/app-state'

interface IAuthContext {
    registerUser: (options?: MutationFunctionOptions<RegisterUserMutation, RegisterUserMutationVariables>) => Promise<any>
}
const AuthContext = createContext<IAuthContext | undefined>(undefined)

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error(`Attempted to use AuthContext before it's provider.`)
    return context
}

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export const AuthProvider: FunctionComponent = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar()

    const { state, dispatch } = useAppState()

    const [, setLocalStorageJwt, clearLocalStorageJwt] = useLocalStorage<string>('jwt', undefined, { raw: true })

    const [currentUserQuery, currentUserQueryStatus] = useCurrentUserLazyQuery({ pollInterval: 1000 })

    const [registerUser, registerUserStatus] = useRegisterUserMutation()
    useLoadingOverlay(registerUserStatus.loading)

    useEffect(() => {
        if (registerUserStatus.error) enqueueSnackbar(`${registerUserStatus.error.name} - ${registerUserStatus.error.message}`, { variant: 'error', preventDuplicate: false })
        if (registerUserStatus.data) dispatch({ type: AppActionType.setJwt, payload: { jwt: registerUserStatus.data?.registerUser?.jwtToken } })
    }, [registerUserStatus.error, registerUserStatus.data])

    useEffect(() => {
        if (currentUserQueryStatus.error) enqueueSnackbar(`${currentUserQueryStatus.error.name} - ${currentUserQueryStatus.error.message}`, { variant: 'error', preventDuplicate: false })
        dispatch({ type: AppActionType.setUser, payload: { user: currentUserQueryStatus.data } })
    }, [currentUserQueryStatus.error, currentUserQueryStatus.data])

    useEffect(() => {
        if (state.jwt) {
            currentUserQuery()
            setLocalStorageJwt(state.jwt)
        } else {
            currentUserQueryStatus.stopPolling && currentUserQueryStatus.stopPolling()
            clearLocalStorageJwt()
        }
    }, [state.jwt])

    return <AuthContext.Provider value={{ registerUser }}>{children}</AuthContext.Provider>
}

