import { ThemeProvider as ThemeProviderOC } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { FunctionComponent } from 'react'

const theme = createMuiTheme({
    typography: {
        button: {
            textTransform: 'none',
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
    },
    props: {
        MuiTypography: {
            variantMapping: {
                h1: 'h2',
                h2: 'h2',
                h3: 'h2',
                h4: 'h2',
                h5: 'h2',
                h6: 'h2',
                subtitle1: 'h2',
                subtitle2: 'h2',
                body1: 'div',
                body2: 'span',
            }
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