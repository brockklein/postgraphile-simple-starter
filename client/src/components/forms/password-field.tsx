import { IField } from "./interfaces"
import { InputAdornment, OutlinedInput, IconButton, FormHelperText } from '@material-ui/core'
import { useField } from "formik"
import { useState } from "react"
import { Visibility, VisibilityOff } from '@material-ui/icons'
import { FieldWrapper } from "./field-wrapper"

interface IPasswordField extends IField {
    labelWidth?: number
}

export const PasswordField = ({ fieldProps }: { fieldProps: IPasswordField }) => {
    const [field, meta] = useField(fieldProps)

    const [showPassword, setShowPassword] = useState(true)

    return (
        <FieldWrapper {...fieldProps} error={meta.error}>
            <OutlinedInput
                {...field}
                error={(meta.touched && !!meta.error) || !!meta.initialError}
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label='toggle password visibility'
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                        >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>
                }
                labelWidth={fieldProps.labelWidth}
            />
        </FieldWrapper>
    )
}