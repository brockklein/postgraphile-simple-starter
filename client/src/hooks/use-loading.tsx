import React, { useState, useEffect, useContext, createContext, FunctionComponent } from 'react'
import { v4 as uuid } from 'uuid'


const useProvideLoading = () => {
    const [inProgressProcess, setInProgressProcesses] = useState<{ [id: string]: boolean }>({})
    const [loading, setLoading] = useState(false)

    const addLoadingProcess = (id: string) => {
        setInProgressProcesses({ ...inProgressProcess, [id]: true })
        return id
    }

    /* 
        Some fancy syntactical footwork to:
        1) Destructure the object into two objects, one with just the key we're removing and one with the remaining keys
        2) Wrap the destructure in an immediately invoked anonymous function to return just object with the remaining keys
    */
    const removeLoadingProcess = (id: string) => setInProgressProcesses((({ [id]: _, ...remaining }) => remaining)(inProgressProcess))

    useEffect(() => {
        if (Object.keys(inProgressProcess).length === 0) {
            setLoading(false)
        } else {
            setLoading(true)
        }
    }, [inProgressProcess])

    return {
        loading,
        addLoadingProcess,
        removeLoadingProcess
    }
}

interface ILoadingContext {
    loading: boolean
    addLoadingProcess: (id: string) => string
    removeLoadingProcess: (id: string) => void
}
const LoadingContext = createContext<ILoadingContext | null>(null)

export const LoadingProvider: FunctionComponent = ({ children }) => {
    const loadingState = useProvideLoading()

    return (
        <LoadingContext.Provider value={loadingState}>
            {children}
        </LoadingContext.Provider>
    )
}

/* 
    Go ahead and expose the loading state to the whole app in case a 
    component wants to directly manage the IDs associated with a loading process
    instead of using the useLoading() convenience hook.
*/
export const useLoadingState = () => useContext(LoadingContext)!

/** 
    __useLoading__

    Convenience wrapper hook to manage a process ID associated with loading.

    @example
    const [dataLoadingStart, dataLoadingDone] = useLoading()
    const [otherLoadingStart, otherLoadingDone] = useLoading()
**/
export const useLoading = () => {
    const loadingState = useContext(LoadingContext)!
    const id = uuid()
    const loadingStart = () => loadingState.addLoadingProcess(id)
    const doneLoading = () => loadingState.removeLoadingProcess(id)
    return [loadingStart, doneLoading]
}