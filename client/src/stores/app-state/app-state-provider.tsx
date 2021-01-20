import { createContext, FunctionComponent, useContext, useReducer } from 'react'
import { AppAction, IAppState, reducer } from '.'

const AppStateContext = createContext<{ state: IAppState, dispatch: React.Dispatch<AppAction> } | undefined>(undefined)

export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (!context) throw new Error(`Attempted to use AppStateContext before it's provider.`)
    return context
}

export const AppStateProvider: FunctionComponent = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {})

    return <AppStateContext.Provider value={{ state, dispatch }} children={children} />
} 
