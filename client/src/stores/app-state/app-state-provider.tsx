import { createContext, FunctionComponent, useContext, useReducer } from 'react'
import { useLocalStorage } from 'react-use'
import { AppAction, IAppState, reducer } from '.'

const AppStateContext = createContext<{ state: IAppState, dispatch: React.Dispatch<AppAction> } | undefined>(undefined)

export const useAppState = () => {
    const context = useContext(AppStateContext)
    if (!context) throw new Error(`Attempted to use AppStateContext before it's provider.`)
    return context
}

export const AppStateProvider: FunctionComponent = ({ children }) => {
    const [jwt] = useLocalStorage<string>('jwt', undefined, { raw: true })

    const [state, dispatch] = useReducer(reducer, { jwt })

    return <AppStateContext.Provider value={{ state, dispatch }} children={children} />
} 
