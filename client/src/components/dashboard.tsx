import { Button, Typography } from "@material-ui/core"
import { useAuth } from "../hooks"

export const Dashboard = () => {
    const { logout } = useAuth()

    return (
        <div>
            <Typography variant='h5' align='center'>Dashboard</Typography>
            <Button onClick={logout} style={{ minWidth: 100 }} variant='contained' color='primary' disableElevation>
                Logout
            </Button>
        </div>
    )
}