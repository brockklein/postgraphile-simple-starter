import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import { useState, useContext, createContext, Fragment, ReactNode, useEffect } from 'react'
import { v4 as uuid } from 'uuid'

type AlertType = 'success' | 'info' | 'warning' | 'error'
interface INewAlert {
    type?: AlertType
    title: string
    body: ReactNode
    closable?: boolean
    afterClose?: () => void
}

export interface IAlert extends INewAlert {
    type: AlertType
    key: string
}

const useProvideAlerts = (): IAlertContext => {

    const [alerts, setAlerts] = useState<IAlert[]>([])

    const removeAlert = (alert: IAlert) => setAlerts([...alerts.filter(o => o.key === alert.key)])

    const addAlert = (alert: INewAlert) => {
        // Add a key
        const newAlert: IAlert = { ...alert, key: uuid(), type: alert.type || 'info' }

        // Remove the alert from state after it's closed
        const afterClose = () => {
            // if (newAlert.afterClose) newAlert.afterClose()
            removeAlert(newAlert)
        }
        newAlert.afterClose = afterClose

        // Add the new alert to state
        setAlerts([...alerts, newAlert])

        // Return the new alert to the caller (mainly for use with updateAlert())
        return newAlert
    }

    const updateAlert = (alert: IAlert) => {
        throw new Error('NOT IMPLEMENtED')
    }

    return {
        alerts,
        addAlert,
        updateAlert,
        removeAlert
    }
}

interface IAlertContext {
    alerts: IAlert[]
    addAlert: (alert: INewAlert) => IAlert
    updateAlert: (alert: IAlert) => void
    removeAlert: (alert: IAlert) => void
}
const AlertContext = createContext<IAlertContext | null>(null)

export const AlertsProvider: React.FC = ({ children }) => {
    const alertControls = useProvideAlerts()
    const { alerts, removeAlert } = alertControls

    const titleId = uuid()
    const descriptionId = uuid()

    const [currentAlert, setCurrentAlert] = useState<IAlert>()

    const getNextAlert = () => alerts.length > 0 ? alerts[0] : undefined

    // Advance which alert is being shown in the dialog. Close the alert dialog if currently showing the last alert.
    const nextAlert = () => {
        if (currentAlert) {
            if (currentAlert.afterClose) currentAlert.afterClose()
            removeAlert(currentAlert)
        }
        const asdlkfj = getNextAlert()
        console.log('the next alert!', asdlkfj)
        setCurrentAlert(asdlkfj)
    }

    useEffect(() => {
        console.log('alerts', alerts)
        if (!currentAlert && alerts.length > 0) nextAlert()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts])

    return (
        <AlertContext.Provider value={alertControls}>
            <Fragment>
                {currentAlert?.title}
                <Dialog
                    open={!!currentAlert}
                    aria-labelledby={titleId}
                    aria-describedby={descriptionId}
                    disableBackdropClick={!!getNextAlert() || !currentAlert?.closable}
                >
                    <DialogTitle id={titleId}>{currentAlert?.title}</DialogTitle>
                    <DialogContent dividers>
                        <DialogContentText id={descriptionId}>
                            {currentAlert?.body}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => nextAlert()} color='primary' autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                {children}
            </Fragment>
        </AlertContext.Provider>
    )
}

/**  
    __useAlert__

    Access controls for app-wide alerts.

    @example
    const { addAlert, updateAlert } = useAlert()

    const newAlert = addAlert({
        type: 'info',
        title: 'File uploading...',
        banner: true,
        closable: false
    })

    updateAlert({
        ...newAlert,
        type: 'success',
        title: 'Upload successful!',
        closable: true,
    })
**/
export const useAlert = () => {
    const alertControls = useContext(AlertContext)!

    return {
        addAlert: alertControls.addAlert,
        updateAlert: alertControls.updateAlert,
    }
}
