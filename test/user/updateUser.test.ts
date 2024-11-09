import * as chai from 'chai';

const { expect } = chai;
import { IUser } from '../../src/interfaces';
import { updateUser } from '../../src/services/user.services';

describe('Update Function', () => {
  describe('Update a User', () => {
    it('should update a new user', async () => {
      const email = 'lastName01@gmail.com';
      const user: Partial<IUser> = {
        blackListed: true,
      }
      const next = (error) => {
        console.error('Error in nextFunction:', {
          message: error.message,
        });
      };
      try {
        const data = await updateUser(email, user, next);
        expect(data).to.be.an('number');
      } catch (error) {
        expect.fail('update User should not throw an error');
      }
    });
  });
});
