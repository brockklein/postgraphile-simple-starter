import { PostGraphileOptions, Plugin } from "postgraphile"
import { ENVIRONMENT, JWT_SECRET, POSTGRAPHILE_OWNER_DATABASEURL } from "./constants"

const postgraphilePlugins: Plugin[] = [
    require("@graphile-contrib/pg-simplify-inflector"),
    require('@graphile-contrib/pg-many-to-many')
]

export const postgraphileConfigOptions: PostGraphileOptions = (() => {
    if (ENVIRONMENT === 'development') {
        const devConfig: PostGraphileOptions = {
            enableCors: true,
            subscriptions: true,
            watchPg: true,
            dynamicJson: true,
            setofFunctionsContainNulls: false,
            ignoreRBAC: false,
            ignoreIndexes: false,
            showErrorStack: "json",
            extendedErrors: ["hint", "detail", "errcode"],
            appendPlugins: postgraphilePlugins,
            exportGqlSchemaPath: "./schema.graphql",
            graphiql: true,
            enhanceGraphiql: true,
            enableQueryBatching: true,
            legacyRelations: "omit",
            pgDefaultRole: 'app_anonymous',
            jwtSecret: JWT_SECRET,
            jwtPgTypeIdentifier: 'app_public.jwt_token',
            ownerConnectionString: POSTGRAPHILE_OWNER_DATABASEURL,
            allowExplain: true,

        }

        return devConfig
    } else {
        const productionConfig: PostGraphileOptions = {
            subscriptions: true,
            retryOnInitFail: true,
            dynamicJson: true,
            setofFunctionsContainNulls: false,
            ignoreRBAC: false,
            ignoreIndexes: false,
            extendedErrors: ["errcode"],
            appendPlugins: postgraphilePlugins,
            graphiql: false,
            enableQueryBatching: true,
            disableQueryLog: true, // our default logging has performance issues, but do make sure you have a logging system in place!
            legacyRelations: "omit",
        }

        return productionConfig
    }
})()