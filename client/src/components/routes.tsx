import { ReactNode } from 'react'
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom'
import { useAppState } from '../hooks'
import { Login } from './login'
import { Signup } from './signup'
import { Admin } from './admin/admin'
import { ForgotPassword } from './forgot-password'
import { ResetPassword } from './reset-password'

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <RedirectIfAuthed path='/login' children={<Login />} />
        <RedirectIfAuthed path='/signup' children={<Signup />} />
        <RedirectIfAuthed path='/forgot-password' children={<ForgotPassword />} />
        <RedirectIfAuthed path='/reset-password' children={<ResetPassword />} />

        <PrivateRoute path='/' children={<Admin />} />
      </Switch>
    </BrowserRouter>
  )
}

const RedirectIfAuthed = ({ children, ...rest }: { children?: ReactNode, path: string }) => {
  const { state } = useAppState()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.authed ?
          <Redirect to={{ pathname: '/', state: { from: location } }} />
          :
          children
      }
    />
  )
}


const PrivateRoute = ({ children, ...rest }: { children?: ReactNode, path: string }) => {
  const { state } = useAppState()

  return (
    <Route
      {...rest}
      render={({ location }) =>
        state.authed ?
          children
          :
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
      }
    />
  )
}