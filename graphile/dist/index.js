"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const postgraphile_1 = require("postgraphile");
const constants_1 = require("./config/constants");
const postgraphile_config_1 = require("./config/postgraphile-config");
const app = express_1.default();
app.use(postgraphile_1.postgraphile(constants_1.POSTGRAPHILE_DATABASEURL, constants_1.PUBLIC_PG_SCHEMA_NAME, postgraphile_config_1.postgraphileConfigOptions));
app.listen(constants_1.PORT, () => {
    console.log(`Server is listening on port ${constants_1.PORT}`);
});
