import mongoose from 'mongoose';

import Users from '../seeders/users.seeder';

const uri = `mongodb://${credential.user}:${credential.password}@${credential.host}/${credential.db}?authSource=admin`;
const mongoURL = process.env.MONGO_URL || uri;

/**
 * Seeders List
 * order is important
 * @type {Object}
 */
export const seedersList = {
  Users
};
/**
 * Connect to mongodb implementation
 * @return {Promise}
 */
export const connect = async () =>
  await mongoose.connect(mongoURL, {  useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
/**
 * Drop/Clear the database implementation
 * @return {Promise}
 */
export const dropdb = async () => mongoose.connection.db.dropDatabase();
