# @app/graphql

This folder contains the auto-generation configuration for
[`graphql-code-generator`](https://github.com/dotansimha/graphql-code-generator),
from the GraphQL files found at the root of the project.

You can import them like:

```js
/*
 * e.g. if you have `mutation DoTheThing { ... }`, then you can import the
 * Apollo React Hook via:
 */
import { useDoTheThingMutation } from "@app/graphql";
```
