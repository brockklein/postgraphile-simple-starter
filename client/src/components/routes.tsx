import React, { Fragment, useEffect } from "react";
import { Switch, Route, useHistory, BrowserRouter } from "react-router-dom";
import { useAppState } from "../hooks";
import { Login } from "./login";
import { Signup } from "./signup";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login"><Login /></Route>

        <Route path="/signup"><Signup /></Route>

        <IsAuthenticated>
          <Route path='/dashboard'>
            Dashboard
          </Route>
        </IsAuthenticated>
      </Switch>
    </BrowserRouter>
  )
}

const IsAuthenticated: React.FC = ({ children }) => {
  const { state } = useAppState()
  const history = useHistory()

  useEffect(() => {
    console.log('this be the user', state.user)

    if (!state.user?.currentUser) {
      history.push('/login')
    } else {
      history.push('/dashboard')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user])

  if (!state.user?.currentUser) return null

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}