require('dotenv').config()
import './worker/worker'
import express from 'express'
import { postgraphile } from 'postgraphile'
import { PORT, POSTGRAPHILE_DATABASEURL, PUBLIC_PG_SCHEMA_NAME } from './config/constants'
import { postgraphileConfigOptions } from './config/postgraphile-config'

const app = express()

app.use(
    postgraphile(
        POSTGRAPHILE_DATABASEURL,
        PUBLIC_PG_SCHEMA_NAME,
        postgraphileConfigOptions
    )
)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})