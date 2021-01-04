import { SnackbarProvider as SnackbarProviderOC } from 'notistack'
import { FunctionComponent } from 'react'

export const SnackbarProvider: FunctionComponent = ({ children }) => {
    return (
        <SnackbarProviderOC
            maxSnack={4}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
            }}
            preventDuplicate
        >
            {children}
        </SnackbarProviderOC>
    )
}