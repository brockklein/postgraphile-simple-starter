import React, { Fragment, useEffect } from "react";
import { Switch, Route, useHistory, BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import { Login } from "./login";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login"><Login /></Route>

        <Route path="/signup">
          signup!
        </Route>

        <IsAuthenticated>
          Private!!
        </IsAuthenticated>
      </Switch>
    </BrowserRouter>
  )
}

const IsAuthenticated: React.FC = ({ children }) => {
  const auth = useAuth()
  const history = useHistory()

  useEffect(() => {
    if (!auth.user?.currentUser) history.push('/login')

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user])

  if (!auth.user?.currentUser) return null

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}