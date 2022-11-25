import { Seeder } from 'mongoose-data-seed';
import { Model } from '../model';

const data = [{

}];

class LoanSeeder extends Seeder {
  async shouldRun() {
    const count = await Model.countDocuments().exec();

    return count === 0;
  }

  async run() {
    return Model.create(data);
  }
}

export default LoanSeeder;