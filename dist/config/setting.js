"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setting = void 0;
exports.setting = {
    program: "api",
    mode: "dev",
    port: 5001,
    version: "1.0.0",
    host: "localhost",
    socket: true,
    db: {
        host: "194.195.116.219",
        user: "admin",
        password: "passw0rd1",
        db: "app"
    },
    saltWorkFactor: 10,
    accessTokenTtl: "180m",
    refreshTokenTtl: "1y",
    privateKey: `samplePrivateKey`,
};
