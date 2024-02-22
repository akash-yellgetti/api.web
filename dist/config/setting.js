"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setting = void 0;
exports.setting = {
    program: 'api',
    mode: 'dev',
    port: process.env.NODE_PORT || 5001,
    version: '1.0.0',
    host: process.env.NODE_HOST || 'localhost',
    socket: true,
    db: {
        host: process.env.NODE_DB_HOST || 'localhost',
        user: process.env.NODE_DB_USER || '',
        password: process.env.NODE_DB_PASSWORD || '',
        db: process.env.NODE_DB_NAME || 'app'
    },
    saltWorkFactor: 10,
    accessTokenTtl: '180m',
    refreshTokenTtl: '1y',
    privateKey: `samplePrivateKey`
};
