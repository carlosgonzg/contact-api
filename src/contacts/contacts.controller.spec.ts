import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

describe('ContactsController', () => {
  let contactsController: ContactsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [ContactsController],
      providers: [ContactsService],
    }).compile();

    contactsController = app.get<ContactsController>(ContactsController);
  });

  describe('root', () => {
    it('should return an empty list of contacts', () => {
      const list = contactsController.getContacts();
      expect(list.length).toBe(0);
    });
    it('should return a list of contacts', () => {
      contactsController.insertContact({
        firstName: 'Carlos',
        lastName: 'Gonzalez',
        email: 'carltronik@gmail.com',
        phone: '1231231234',
        company: 'abc company'
      })
      const list = contactsController.getContacts();
      expect(list.length).toBe(1);
    });
  });
});
