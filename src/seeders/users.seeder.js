import { Seeder } from 'mongoose-data-seed';
import { User } from '../model';
import fs from 'fs';

// Read JSON files
const data = JSON.parse(
  fs.readFileSync(`${__dirname}/json/users.json`, "utf-8")
);

class UsersSeeder extends Seeder {

  async shouldRun() {
    return User.countDocuments().exec().then(count => count === 0);
  }

  async run() {
    return User.create(data);
  }
}

export default UsersSeeder;
