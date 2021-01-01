import React, { useState, useContext, createContext } from 'react'
import { v4 as uuid } from 'uuid'

type AntAlertTypes = 'success' | 'info' | 'warning' | 'error'
interface IAlert {
    type: AntAlertTypes
    title: string
    body?: string
    banner?: boolean
    closable?: boolean
    hideIcon?: boolean
    persist?: boolean
    afterClose?: () => void
}

export interface IAlertWithKey extends IAlert {
    key: string
}

const useProvideAlerts = (): IAlertContext => {

    const [alerts, setAlerts] = useState<IAlertWithKey[]>([])

    const removeAlert = (alert: IAlertWithKey) => setAlerts([...alerts.filter(o => o.key === alert.key)])

    const addAlert = (alert: IAlert) => {
        // Add a key
        const newAlert = { ...alert, key: uuid() }

        // Remove the alert from state after it's closed
        const afterClose = () => {
            if (newAlert.afterClose) newAlert.afterClose()
            removeAlert(newAlert)
        }
        newAlert.afterClose = afterClose

        // If not explicitly set to be persistent, close after 1500ms
        if (!alert.persist) {
            setTimeout(() => {
                removeAlert(newAlert)
            }, 1500);
        }

        // Add the new alert to state
        setAlerts([...alerts, newAlert])

        // Return the new alert to the caller (mainly for use with updateAlert())
        return newAlert
    }

    const updateAlert = (alert: IAlertWithKey) => {
        throw new Error('NOT IMPLEMENtED')
    }

    return {
        alerts,
        addAlert,
        updateAlert
    }
}

interface IAlertContext {
    alerts: IAlert[]
    addAlert: (alert: IAlert) => IAlertWithKey
    updateAlert: (alert: IAlertWithKey) => void
}
const AlertContext = createContext<IAlertContext | null>(null)

export const AlertsProvider: React.FC = ({ children }) => {
    const alertControls = useProvideAlerts()

    return (
        <AlertContext.Provider value={alertControls}>
            {alertControls.alerts.map(alert => (
                <></>
                // <Alert {...alert} message={alert.title} description={alert.body} showIcon={!alert.hideIcon} />
            ))}
            {children}
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
