export const setting = {
  program: 'api',
  mode: 'dev',
  port: process.env.NODE_PORT || 5001,
  version: '1.0.0',
  host: process.env.NODE_HOST || 'localhost',
  socket: false,
  db: {
    host: process.env.NODE_DB_HOST || 'cluster0.flpezxf.mongodb.net',
    user: process.env.NODE_DB_USER || 'akash5792bts',
    password: process.env.NODE_DB_PASSWORD || 'ydPCbuP5poz961cV',
    db: process.env.NODE_DB_NAME || 'app'
  },
  saltWorkFactor: 10,
  accessTokenTtl: '180m',
  refreshTokenTtl: '1y',
  privateKey: `samplePrivateKey`
};
