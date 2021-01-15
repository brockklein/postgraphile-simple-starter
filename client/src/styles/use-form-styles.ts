import { makeStyles, createStyles } from "@material-ui/core";

export const useFormStyles = makeStyles((theme) =>
    createStyles({
        root: {
            flex: 1,
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);