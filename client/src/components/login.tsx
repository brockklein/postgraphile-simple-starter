import { Button, Grid, Box, Typography, } from '@material-ui/core'
import { useSnackbar } from 'notistack'
import { useLoadingOverlay } from '../hooks'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PasswordField, TextInput } from './forms'
import clsx from 'clsx'
import logo from '../images/logo.svg'
import { useAuthenticateMutation } from '../graphql/autogenerate/hooks'
import { useEffect } from 'react'
import { usePaddedBorderStyles } from '../styles'
import { Link } from 'react-router-dom'

export const Login = () => {

    const classes = usePaddedBorderStyles()

    const { enqueueSnackbar } = useSnackbar()

    const [authenticate, { data, loading, error }] = useAuthenticateMutation()
    useLoadingOverlay(loading)

    useEffect(() => {
        /* 
            A null jwtToken means the authentication failed for any reason (wrong password, account doesn't exist)
        */
        if (data && data.authenticate?.jwtToken === null) {
            enqueueSnackbar(<div>Login failed. <span>Email and password do not match, or an account does not exist with the provided email address.</span></div>, { variant: 'error', preventDuplicate: false })
        }
    }, [data])

    useEffect(() => {
        if (error) enqueueSnackbar(error.message, { variant: 'error', preventDuplicate: false })
    }, [error])

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={Yup.object({
                email: Yup.string().required('Required'),
                password: Yup.string().required('Required')
            })}
            onSubmit={(values) => {
                authenticate({ variables: values })
            }}
        >
            <Grid justify='center' container>
                <Grid className={clsx(classes.borders)} container item xs={12} sm={10} md={8} lg={5} justify='center'>
                    <Form style={{ width: '100%' }}>
                        <Grid item container justify='center' alignContent='center' direction='column'>
                            <Box marginBottom={2}>
                                <Link to='/signup'><img src={logo} alt='Legit Apps logo' style={{ maxWidth: 75 }} /></Link>
                            </Box>
                            <Box marginBottom={4}>
                                <Typography variant='h5' align='center'>Sign in</Typography>
                            </Box>
                        </Grid>
                        <Grid item container>
                            <TextInput fieldProps={{ name: 'email', label: 'Email', helperText: 'Email address' }} />
                        </Grid>
                        <Grid item container>
                            <PasswordField fieldProps={{ name: 'password', label: 'Password', labelWidth: 70 }} />
                        </Grid>
                        <Grid item>
                            <Box marginX={1} marginY={2} display='flex' justifyContent='space-between'>
                                <Button href='https://www.google.com/' target='_blank' variant='text' color='primary' disableElevation>
                                    Forgot password
                                </Button>
                                <Button type='submit' style={{ minWidth: 100 }} variant='contained' color='primary' disableElevation>
                                    Login
                                </Button>
                            </Box>
                        </Grid>
                    </Form>
                </Grid>
            </Grid>
        </Formik>
    )
}