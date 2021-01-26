import { makeStyles, createStyles } from "@material-ui/core"

export const useCommonStyles = makeStyles((theme) =>
    createStyles({
        borders: {
            [ theme.breakpoints.up('sm') ]: {
                width: '100%',
                padding: theme.spacing(4),
                border: '1px solid',
                borderColor: theme.palette.grey[ 300 ],
                borderRadius: theme.shape.borderRadius,
            }
        },
        backgroundInvalid: {
            backgroundColor: theme.palette.error.light,
            color: 'white',
            padding: theme.spacing(2),
            border: '1px solid',
            borderColor: theme.palette.error.light,
            borderRadius: theme.shape.borderRadius,
        },
        rootTypography: {
            ...theme.typography.body1
        }
    })
)