import { Link as MaterialUiLink } from '@material-ui/core'
import { FunctionComponent } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'


export const TextLink: FunctionComponent<{ to: string }> = ({ children, to }) => {
    return (
        <MaterialUiLink to={to} component={ReactRouterLink}>
            {children}
        </MaterialUiLink>
    )
}