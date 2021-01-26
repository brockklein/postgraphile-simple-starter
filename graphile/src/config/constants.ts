// General
export const ENVIRONMENT: 'development' | 'production' = process.env.NODE_ENV === 'production' ? 'production' : 'development'
export const PORT = process.env.PORT || 5000
export const ROOT_URL = process.env.ROOT_URL || 'http://localhost:3000'

// Postgraphile
export const PUBLIC_PG_SCHEMA_NAME = process.env.PUBLIC_PG_SCHEMA_NAME
export const POSTGRAPHILE_DATABASEURL = process.env.POSTGRAPHILE_DATABASEURL
export const POSTGRAPHILE_OWNER_DATABASEURL = process.env.POSTGRAPHILE_OWNER_DATABASEURL
export const JWT_SECRET = process.env.JWT_SECRET

// Email
export let ETHEREAL_EMAIL_USERNAME = process.env.ETHEREAL_EMAIL_USERNAME
export let ETHEREAL_EMAIL_PASSWORD = process.env.ETHEREAL_EMAIL_PASSWORD