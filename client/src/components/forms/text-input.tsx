import { useField } from 'formik'
import { IField } from './interfaces'
import { TextField, FormControl } from '@material-ui/core'
import { MATERIAL_FIELD_VARIANT } from './constants'
import { useFormStyles } from '../../styles/use-form-styles'
import clsx from "clsx"

export const TextInput = ({ fieldProps }: { fieldProps: IField }) => {
    const classes = useFormStyles()

    const [field, meta] = useField(fieldProps)

    return (
        <FormControl className={clsx(classes.margin, classes.root)} variant='outlined'>
            <TextField
                variant={MATERIAL_FIELD_VARIANT}
                {...field}
                label={fieldProps.label}
                helperText={meta.error || fieldProps.helperText || ' '}
                error={(meta.touched && !!meta.error) || !!meta.initialError}
            />
        </FormControl>
    )
}