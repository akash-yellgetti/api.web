"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conversationRequest = exports.groupRequest = exports.authRequest = void 0;
var auth_schema_1 = require("./auth.schema");
Object.defineProperty(exports, "authRequest", { enumerable: true, get: function () { return auth_schema_1.auth; } });
var group_schema_1 = require("./group.schema");
Object.defineProperty(exports, "groupRequest", { enumerable: true, get: function () { return group_schema_1.group; } });
var converstation_schema_1 = require("./converstation.schema");
Object.defineProperty(exports, "conversationRequest", { enumerable: true, get: function () { return converstation_schema_1.converstation; } });