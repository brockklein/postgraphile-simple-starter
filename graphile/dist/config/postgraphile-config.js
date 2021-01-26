"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgraphileConfigOptions = void 0;
const constants_1 = require("./constants");
const postgraphilePlugins = [
    require("@graphile-contrib/pg-simplify-inflector"),
    require('@graphile-contrib/pg-many-to-many')
];
exports.postgraphileConfigOptions = (() => {
    if (constants_1.ENVIRONMENT === 'development') {
        const devConfig = {
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
            exportGqlSchemaPath: "../schema.graphql",
            graphiql: true,
            enhanceGraphiql: true,
            enableQueryBatching: true,
            legacyRelations: "omit",
            pgDefaultRole: 'app_anonymous',
            jwtSecret: constants_1.JWT_SECRET,
            jwtPgTypeIdentifier: 'app_public.jwt_token',
            ownerConnectionString: constants_1.POSTGRAPHILE_OWNER_DATABASEURL,
            allowExplain: true,
        };
        return devConfig;
    }
    else {
        const productionConfig = {
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
            disableQueryLog: true,
            legacyRelations: "omit",
        };
        return productionConfig;
    }
})();
