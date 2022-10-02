import { faker } from '@faker-js/faker';
import { User } from '../../src/types/userTypes';

function userFactory(): Omit<User, 'id'> {
  return {
    username: faker.internet.userName(),
    displayname: faker.name.fullName(),
    password: faker.internet.password()
  };
}

export default userFactory;