import { Fade, CircularProgress, makeStyles, Backdrop } from '@material-ui/core'
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
        1) Write an immediately invoked anonymous function that is called passing in the current object
        2) In the arguments of the function, destructure the object into two objects, one with just the key we're removing and one with the remaining keys
        3) Return just the remaining keys out of the function
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

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.main,
    },
}))

export const LoadingProvider: FunctionComponent = ({ children }) => {
    const classes = useStyles()

    const loadingState = useProvideLoading()
    const { loading } = loadingState

    return (
        <LoadingContext.Provider value={loadingState}>
            <Fade
                in={loading}
                style={{
                    transitionDelay: loading ? '800ms' : '0ms',
                }}
                unmountOnExit
            >
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color='inherit' size={100} />
                </Backdrop>
            </Fade>
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
export const useLoadingOverlay = (loading?: boolean) => {

    const loadingState = useContext(LoadingContext)!
    const [id] = useState(uuid())
    const loadingStart = () => loadingState.addLoadingProcess(id)
    const doneLoading = () => loadingState.removeLoadingProcess(id)

    useEffect(() => {
        if (loading) loadingStart()
        if (!loading) doneLoading()
    }, [loading])

    return [loadingStart, doneLoading]
}