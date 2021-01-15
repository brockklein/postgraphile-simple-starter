import clsx from "clsx";
import { ReactNode } from "react";
import { useFormStyles } from "../../styles/use-form-styles";
import { FormControl, InputLabel, FormHelperText } from '@material-ui/core'

interface IFieldWrapperProps {
    name: string
    label: string
    helperText?: string
    error?: string
    children: ReactNode
}

export const FieldWrapper = ({ name, label, helperText, error, children }: IFieldWrapperProps) => {
    const classes = useFormStyles()

    return (
        <FormControl error={!!error} className={clsx(classes.margin, classes.root)} variant='outlined'>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            {children}
            <FormHelperText error={!!error}>{error || helperText}</FormHelperText>
        </FormControl>
    )
}