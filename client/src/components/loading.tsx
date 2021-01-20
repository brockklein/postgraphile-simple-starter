import { useBackdropStyles } from "../styles"
import { Fade, CircularProgress, Backdrop } from '@material-ui/core'
import { useMemo } from "react"
import clsx from 'clsx'

interface ILoadingProps {
    size?: 'xs' | 's' | 'm' | 'l' | 'xl'
}
export const Loading = ({ size }: ILoadingProps) => {
    const classes = useBackdropStyles()

    const _size = useMemo(() => {
        switch (size) {
            case 'xs':
                return 10
            case 's':
                return 25
            case 'm':
                return 50
            case 'l':
                return 100
            case 'xl':
                return 200
            default:
                return 100
        }
    }, [size])

    return (
        <Fade in style={{ transitionDelay: '800ms' }} unmountOnExit>
            <Backdrop className={clsx(classes.backdrop, classes.transparentBackground)} open>
                <CircularProgress color='inherit' size={_size} />
            </Backdrop>
        </Fade>
    )
}