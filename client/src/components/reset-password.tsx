import clsx from 'clsx'
import { useAuth, useUrlQuery } from '../hooks'
import { useCommonStyles, usePaddedBorderStyles } from '../styles'
import * as Yup from 'yup'
import { Grid, Box, Typography, Button } from '@material-ui/core'
import { Formik, Form } from 'formik'
import { Link, useHistory } from 'react-router-dom'
import { PasswordField } from './forms'
import logo from '../images/logo.svg'
import { TextLink } from './text-link'

export const ResetPassword = () => {
    const classes = usePaddedBorderStyles()
    const commonStyles = useCommonStyles()

    const { resetPassword } = useAuth()
    const token = useUrlQuery().get('token')
    const userId = useUrlQuery().get('userId')
    const history = useHistory()

    if (!token || !userId) return (
        <Grid className={clsx(classes.borders)} container item xs={12} sm={10} md={8} lg={5} justify='center' direction='column' alignItems='center'>
            <Grid item container justify='center' alignContent='center' direction='column'>
                <Box marginY={2} display='flex' justifyContent='center'>
                    <Link to='/'><img src={logo} alt='Legit Apps logo' style={{ maxWidth: 75 }} /></Link>
                </Box>
                <Box>
                    <Typography variant='h5' align='center'>Reset Password</Typography>
                </Box>
            </Grid>
            <Grid item>
                <Box marginY={4} className={clsx(commonStyles.backgroundInvalid)} textAlign='center'>
                    Invalid password reset link.
                </Box>

                <TextLink to='/forgot-password'>
                    Request another password reset link
                </TextLink>
            </Grid>
        </Grid>
    )

    return (
        <Formik
            initialValues={{
                password: '',
                confirmPassword: '',
            }}
            validationSchema={Yup.object({
                password: Yup.string()
                    .min(12, 'Must be at least 12 characters - chain some uncommon words together! Your password is stronger if it is long and you can remember it, not if it contains numbers, random capitalization, or special characters. 😊')
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
            onSubmit={async (values) => {
                await resetPassword({ token, password: values.password, userId })
                history.push('/login')
            }}
        >
            <Grid justify='center' container>
                <Grid className={clsx(classes.borders)} container item xs={12} sm={10} md={8} lg={5} justify='center'>
                    <Form style={{ width: '100%' }}>
                        <Grid item container justify='center' alignContent='center' direction='column'>
                            <Box marginY={2} display='flex' justifyContent='center'>
                                <Link to='/login'><img src={logo} alt='Legit Apps logo' style={{ maxWidth: 75 }} /></Link>
                            </Box>
                            <Box marginBottom={4}>
                                <Typography variant='h5' align='center'>Reset Password</Typography>
                            </Box>
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
                                        Sign in
                                    </Button>
                                </Link>

                                <Button type='submit' style={{ minWidth: 100 }} variant='contained' color='primary' disableElevation>
                                    Submit
                                </Button>
                            </Box>
                        </Grid>
                    </Form>
                </Grid>
            </Grid>
        </Formik>
    )
}