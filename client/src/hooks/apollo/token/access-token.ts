
import { LOCAL_STORAGE_JWT_KEY } from "../../../constants"

export const setAccessToken = (token?: string | null) => token ? localStorage.setItem(LOCAL_STORAGE_JWT_KEY, token) : localStorage.removeItem(LOCAL_STORAGE_JWT_KEY)

export const getAccessToken = () => localStorage.getItem(LOCAL_STORAGE_JWT_KEY)