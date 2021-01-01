# Setup

Libraries to install globally:
`npm i -g postgraphile @graphile-contrib/pg-many-to-many @graphile-contrib/pg-simplify-inflector`

Postgraphle startup command:

`postgraphile --connection postgres://app_postgraphile:zqDHRFx5fEYMbkq@localhost/eventcast --schema app_public --cors --export-schema-graphql schema.graphql --default-role app_anonymous --jwt-secret development --jwt-token-identifier app_public.jwt_token --subscriptions --watch --owner-connection postgres://postgres:postgres@localhost/postgres --dynamic-json --no-setof-functions-contain-nulls --no-ignore-rbac --no-ignore-indexes --show-error-stack=json --extended-errors hint,detail,errcode --append-plugins @graphile-contrib/pg-simplify-inflector --append-plugins @graphile-contrib/pg-many-to-many --export-schema-graphql schema.graphql --graphiql "/" --enhance-graphiql --allow-explain --enable-query-batching --legacy-relations omit`
