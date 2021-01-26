import { Grid, Box, Typography, Button } from '@material-ui/core'
import clsx from 'clsx'
import { Formik, Form } from 'formik'
import { Link } from 'react-router-dom'
import { useAuth, useUrlQuery } from '../hooks'
import { usePaddedBorderStyles } from '../styles'
import { TextInput } from './forms'
import * as Yup from 'yup'
import logo from '../images/logo.svg'

export const ForgotPassword = () => {

    const query = useUrlQuery()

    const classes = usePaddedBorderStyles()

    const { forgotPassword } = useAuth()

    return (
        <Formik
            initialValues={{
                email: query.get('email') || '',
            }}
            validationSchema={Yup.object({
                email: Yup.string().required('Required').email('Must be a valid email address.'),
            })}
            onSubmit={forgotPassword}
        >
            <Grid justify='center' container>
                <Grid className={clsx(classes.borders)} container item xs={12} sm={10} md={8} lg={5} justify='center'>
                    <Form style={{ width: '100%' }}>
                        <Grid item container justify='center' alignContent='center' direction='column'>
                            <Box marginBottom={2} display='flex' justifyContent='center' >
                                <Link to='/'><img src={logo} alt='Legit Apps logo' style={{ maxWidth: 75 }} /></Link>
                            </Box>
                            <Box marginBottom={4}>
                                <Typography variant='h5' align='center'>Forgot Password</Typography>
                            </Box>
                        </Grid>
                        <Grid item container>
                            <TextInput fieldProps={{ name: 'email', label: 'Email' }} />
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