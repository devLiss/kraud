import { OnSeederInit, Seeder } from 'nestjs-sequelize-seeder';
import { faker } from '@faker-js/faker';
import { City } from './features/city/city.entity';
import { Model } from 'sequelize-typescript';

@Seeder({
  model: 'City',
  unique: ['name'],
})
export class CitySeeder implements OnSeederInit {
  run() {
    const arr = [...Array(50)].map((elem) => ({
      name: faker.address.cityName(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }));
    return arr;
  }
}
