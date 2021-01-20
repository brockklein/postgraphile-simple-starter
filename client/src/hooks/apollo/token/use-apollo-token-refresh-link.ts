import { useMemo } from "react"
import { getAccessToken, setAccessToken } from "./access-token"
import { TokenRefreshLink } from "./token-refresh-link"
import jwtDecode from 'jwt-decode'
import { useHistory } from "react-router-dom"
import { useSnackbar } from "notistack"

interface IJwt {
    role: string
    user_id: string
    exp: number
}

export const useApolloTokenRefreshLink = () => {
    const history = useHistory()
    const { enqueueSnackbar } = useSnackbar()

    return useMemo(() => {
        return new TokenRefreshLink({
            isTokenValidOrUndefined: () => {
                const token = getAccessToken()

                if (!token) return true

                try {
                    const { exp } = jwtDecode<IJwt>(token)
                    if (Date.now() >= exp * 1000) {
                        return false
                    } else {
                        return true
                    }
                } catch (err) {
                    return false
                }
            },
            fetchAccessToken: () => {
                return fetch('http://localhost:5000/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        query: `
                            query {
                                refreshToken {
                                    jwtToken
                                }
                            }`,
                    }),
                })
            },
            handleFetch: (access_token) => {
                setAccessToken(access_token)
            },
            handleError: (err) => {
                console.warn('Your refresh token is invalid. Please try re-logging in.')
                console.error(err)
                enqueueSnackbar('Your session has expired. Please login to continue.', { variant: 'warning' })
                history.push('/login')
            },
        })
    }, [])
}