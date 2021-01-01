import React, { useState, useEffect, useContext, createContext, FunctionComponent } from 'react'
import { useCurrentUserQuery } from '../graphql/autogenerate/hooks'
import { CurrentUserQuery } from '../graphql/autogenerate/operations'

// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
    const [user, setUser] = useState<CurrentUserQuery | undefined>(undefined)

    // Subscribe to user on mount
    // Because this sets state in the callback it will cause any component that utilizes this hook to re-render with the latest auth object.
    const { error, data } = useCurrentUserQuery({ pollInterval: 1000 })

    useEffect(() => {
        if (error) throw new Error(error.message)
        setUser(data)
    }, [error, data])

    // Return the user object and auth methods
    return {
        user,
    }
}

interface IAuthContext {
    user: CurrentUserQuery | undefined
}
const AuthContext = createContext<IAuthContext>({
    user: undefined,
})

// Provider component that wraps your app and makes auth object available to any child component that calls useAuth().
export const AuthProvider: FunctionComponent = ({ children }) => {
    const auth = useProvideAuth()
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// Hook for child components to get the auth object and re-render when it changes.
export const useAuth = () => useContext(AuthContext)