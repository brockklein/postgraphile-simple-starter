import { makeStyles } from '@material-ui/core';

export const useBackdropStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: theme.palette.primary.main,
    },
    transparentBackground: {
        backgroundColor: '#00000000'
    }
}))