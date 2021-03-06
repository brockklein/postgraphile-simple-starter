import { Button, Grid, Box, Typography, } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PasswordField, TextInput } from './forms'
import clsx from 'clsx'
import logo from '../images/logo.svg'
import { usePaddedBorderStyles } from '../styles'
import { useAuth } from '../hooks'
import { Link } from 'react-router-dom'

export const Signup = () => {
    const classes = usePaddedBorderStyles()

    const { signup } = useAuth()

    return (
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
            }}
            validationSchema={Yup.object({
                firstName: Yup.string().required('Required'),
                lastName: Yup.string().required('Required'),
                email: Yup.string().required('Required'),
                password: Yup.string()
                    .min(12, 'Must be at least 12 characters - chain some common words together! Your password is stronger if it is long and you can remember it, not if it contains numbers, random capitalization, or special characters. 😊')
                    .required('Required'),
                confirmPassword: Yup.string()
                    .test(
                        'confirmPassword',
                        'Passwords do not match',
                        function (value) {
                            return this.parent.password === value
                        }
                    ),
            })}
            onSubmit={signup}
        >
            <Grid justify='center' container>
                <Grid className={clsx(classes.borders)} container item xs={12} sm={10} md={8} lg={5} justify='center'>
                    <Form style={{ width: '100%' }}>
                        <Grid item container justify='center' alignContent='center' direction='column'>
                            <Box marginY={2} display='flex' justifyContent='center'>
                                <Link to='/'><img src={logo} alt='Legit Apps logo' style={{ maxWidth: 75 }} /></Link>
                            </Box>
                            <Box marginBottom={4}>
                                <Typography variant='h5' align='center'>Create account</Typography>
                            </Box>
                        </Grid>
                        <Grid item container>
                            <Grid item xs container>
                                <TextInput fieldProps={{ name: 'firstName', label: 'First Name' }} />
                            </Grid>
                            <Grid item xs container>
                                <TextInput fieldProps={{ name: 'lastName', label: 'Last Name' }} />
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <TextInput fieldProps={{ name: 'email', label: 'Email' }} />
                        </Grid>
                        <Grid item container>
                            <Grid item container>
                                <PasswordField fieldProps={{ name: 'password', label: 'Password', labelWidth: 70 }} />
                            </Grid>
                            <Grid item container>
                                <PasswordField fieldProps={{ name: 'confirmPassword', label: 'Confirm Password', labelWidth: 140 }} />
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Box marginX={1} marginY={2} display='flex' justifyContent='space-between'>
                                <Link to='/login'>
                                    <Button variant='text' color='primary' disableElevation>
                                        Already have an account?
                                    </Button>
                                </Link>

                                <Button type='submit' style={{ minWidth: 100 }} variant='contained' color='primary' disableElevation>
                                    Next
                                </Button>
                            </Box>
                        </Grid>
                    </Form>
                </Grid>
            </Grid>
        </Formik>
    )
}