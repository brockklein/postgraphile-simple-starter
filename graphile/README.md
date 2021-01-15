# Notes

Haven't been able to get scripts working within package.json to set up and start DB migration stuff, so gotta do it manually for now...

# Setup

Libraries to install globally:

`npm i -g postgraphile @graphile-contrib/pg-many-to-many @graphile-contrib/pg-simplify-inflector graphile-migrate`

Full docs available [here](https://github.com/graphile/migrate).

**Make sure to check your Postgres connection strings match your local user, port, and database name.**

Postgraphle startup command:

`postgraphile --connection postgres://app_postgraphile:zqDHRFx5fEYMbkq@localhost:5433/eventcast --schema app_public --cors --export-schema-graphql schema.graphql --default-role app_anonymous --jwt-secret development --jwt-token-identifier app_public.jwt_token --subscriptions --watch --owner-connection postgres://postgres:postgres@localhost/postgres --dynamic-json --no-setof-functions-contain-nulls --no-ignore-rbac --no-ignore-indexes --show-error-stack=json --extended-errors hint,detail,errcode --append-plugins @graphile-contrib/pg-simplify-inflector --append-plugins @graphile-contrib/pg-many-to-many --export-schema-graphql schema.graphql --graphiql "/" --enhance-graphiql --allow-explain --enable-query-batching --legacy-relations omit`

**OR**

`npm run graphile-migrate-watch`

and

`npm run postgraphile`
