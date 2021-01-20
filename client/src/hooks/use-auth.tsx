import { useSnackbar } from 'notistack'
import React, { useEffect, useContext, createContext, FunctionComponent } from 'react'
import { useAppState, useLoadingOverlay } from '.'
import { useAuthenticateMutation, useRegisterUserMutation } from '../graphql/autogenerate/hooks'
import { AppActionType } from '../stores/app-state'
import { setAccessToken } from './apollo/token'

interface IAuthCredentials {
    email: string
    password: string
}

interface ISignup extends IAuthCredentials {
    firstName: string
    lastName: string
}

interface IAuthContext {
    signup: (args: ISignup) => void
    login: (args: IAuthCredentials) => void
    logout: () => void
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

    const { dispatch } = useAppState()

    /* 
        Signup
    */
    const [registerUser, registerUserStatus] = useRegisterUserMutation()
    useLoadingOverlay(registerUserStatus.loading)

    useEffect(() => {
        if (registerUserStatus.error) enqueueSnackbar(`${registerUserStatus.error.name} - ${registerUserStatus.error.message}`, { variant: 'error', preventDuplicate: false })

        if (registerUserStatus.data?.registerUser?.jwtToken) {
            console.log('was this called? huh...', registerUserStatus.data?.registerUser?.jwtToken)
            setAccessToken(registerUserStatus.data.registerUser.jwtToken)
            enqueueSnackbar('Account created. Welcome!', { variant: 'success' })
            dispatch({ type: AppActionType.login })
        }
    }, [registerUserStatus.error, registerUserStatus.data])

    const signup = (variables: ISignup) => {
        console.log('was signup called?')
        registerUser({ variables: { ...variables, _email: variables.email } }).catch()
    }

    /* 
        Login
    */
    const [authenticate, authenticateStatus] = useAuthenticateMutation()
    useLoadingOverlay(authenticateStatus.loading)

    useEffect(() => {
        const { data, error } = authenticateStatus

        if (error) enqueueSnackbar(error.message, { variant: 'error', preventDuplicate: false })

        /* 
            A null jwtToken means the authentication failed for any reason (wrong password, account doesn't exist)
        */
        if (data && data.authenticate?.jwtToken === null) {
            enqueueSnackbar(
                <div>
                    Login failed. <span>Email and password do not match, or an account does not exist with the provided email address.</span>
                </div>,
                {
                    variant: 'error',
                    preventDuplicate: false,
                }
            )
        }

        if (data && data.authenticate?.jwtToken) {
            setAccessToken(data.authenticate.jwtToken)
            dispatch({ type: AppActionType.login })
        }
    }, [authenticateStatus.error, authenticateStatus.data])

    const login = (variables: IAuthCredentials) => authenticate({ variables }).catch()

    /* 
        Logout
    */
    const logout = () => {
        setAccessToken(null)
        dispatch({ type: AppActionType.logout })
    }


    return <AuthContext.Provider value={{ logout, login, signup }} children={children} />
}

