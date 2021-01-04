import { useEffect } from 'react'
import { useAlert } from '../hooks/use-alert'
import { useLoading } from '../hooks/use-loading'

export const Login = () => {

    const { addAlert } = useAlert()

    useEffect(() => {
        addAlert({
            title: 'New Alert!',
            body: 'With a body message!',
        })
    }, [])

    return (
        <div>

        </div>
    )
}