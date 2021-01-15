import { ThemeProvider as ThemeProviderOC } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { FunctionComponent } from 'react';

const theme = createMuiTheme({
    typography: {
        button: {
            textTransform: 'none'
        },
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1270,
            xl: 1920,
        }
    }
})



export const ThemeProvider: FunctionComponent = ({ children }) => {
    return (
        <ThemeProviderOC theme={theme}>
            {children}
        </ThemeProviderOC>
    )
}