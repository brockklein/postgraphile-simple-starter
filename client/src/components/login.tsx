import { Button, Grid, Box, Typography, } from '@material-ui/core'
import { useAuth } from '../hooks'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PasswordField, TextInput } from './forms'
import clsx from 'clsx'
import logo from '../images/logo.svg'
import { usePaddedBorderStyles } from '../styles'
import { Link } from 'react-router-dom'

export const Login = () => {
    const classes = usePaddedBorderStyles()

    const { login } = useAuth()

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
            onSubmit={login}
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
                            <TextInput fieldProps={{ name: 'email', label: 'Email' }} />
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