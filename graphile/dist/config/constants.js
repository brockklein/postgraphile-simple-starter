"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.POSTGRAPHILE_OWNER_DATABASEURL = exports.POSTGRAPHILE_DATABASEURL = exports.PUBLIC_PG_SCHEMA_NAME = exports.PORT = exports.ENVIRONMENT = void 0;
exports.ENVIRONMENT = process.env.NODE_ENV === 'production' ? 'production' : 'development';
// Postgraphile
exports.PORT = process.env.PORT || 5000;
exports.PUBLIC_PG_SCHEMA_NAME = process.env.PUBLIC_PG_SCHEMA_NAME;
exports.POSTGRAPHILE_DATABASEURL = process.env.POSTGRAPHILE_DATABASEURL;
exports.POSTGRAPHILE_OWNER_DATABASEURL = process.env.POSTGRAPHILE_OWNER_DATABASEURL;
exports.JWT_SECRET = process.env.JWT_SECRET;
