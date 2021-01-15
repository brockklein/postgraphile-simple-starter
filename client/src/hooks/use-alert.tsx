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

interface IAlertContext {
    addAlert: (alert: INewAlert) => IAlert
    updateAlert: (alert: IAlert) => void
}
const AlertContext = createContext<IAlertContext | null>(null)

export const AlertsProvider: React.FC = ({ children }) => {
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

    const titleId = uuid()
    const descriptionId = uuid()

    const [currentAlert, setCurrentAlert] = useState<IAlert>()
    const [open, setOpen] = useState(false)

    // Advance which alert is being shown in the dialog. Close the alert dialog if currently showing the last alert.
    const nextAlert = () => {
        const _alerts = [...alerts]
        let nextAlert: IAlert | undefined = _alerts.pop()
        if (currentAlert && currentAlert.afterClose) currentAlert.afterClose()

        /* 
            We only set the current alert if there is a next alert. 
            
            If there isn't a next alert, the modal's 'onExited' callback handles clearing the 'currentAlert', that way the modal's insides don't 'collapse' because the current alert content is removed before the modal finishes exiting.
        */
        if (nextAlert) setCurrentAlert(nextAlert)

        setOpen(!!nextAlert)
        setAlerts(_alerts)
    }

    useEffect(() => {
        if (!currentAlert && alerts.length > 0) nextAlert()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [alerts])

    return (
        <AlertContext.Provider value={{ addAlert, updateAlert }}>
            <Fragment>
                <Dialog
                    open={open}
                    aria-labelledby={titleId}
                    aria-describedby={descriptionId}
                    onExited={() => {
                        setCurrentAlert(undefined)
                    }}
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
