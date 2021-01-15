import { makeStyles, createStyles } from "@material-ui/core";

export const usePaddedBorderStyles = makeStyles((theme) =>
    createStyles({
        borders: {
            [theme.breakpoints.up('sm')]: {
                width: '100%',
                padding: theme.spacing(4),
                border: '1px solid',
                borderColor: theme.palette.grey[300],
                borderRadius: 5,
            }
        }
    })
)