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
    it('should return a contact', () => {
      const contact = contactsController.insertContact({
        firstName: 'Carlos',
        lastName: 'Gonzalez',
        email: 'carltronik@gmail.com',
        phone: '1231231234',
        company: 'abc company'
      })
      const c = contactsController.getContactById(contact.id);
      expect(c.id).toBe(contact.id);
    });
    it('should create a contact', () => {
      const contact = contactsController.insertContact({
        firstName: 'Carlos',
        lastName: 'Gonzalez',
        email: 'carltronik@gmail.com',
        phone: '1231231234',
        company: 'abc company'
      })
      expect(contact.id).toBeDefined();
    });
    it('should update a contact', () => {
      let contact = contactsController.insertContact({
        firstName: 'Carlos',
        lastName: 'Gonzalez',
        email: 'carltronik@gmail.com',
        phone: '1231231234',
        company: 'abc company'
      })
      contact = contactsController.updateContact(contact.id, {
        firstName: 'Carlos 1',
        lastName: 'Gonzalez',
        email: 'carltronik@gmail.com',
        phone: '1231231234',
        company: 'abc company'
      })
      expect(contact.firstName).toBe('Carlos 1');
    });
    it('should delete a contact', () => {
      let contact = contactsController.insertContact({
        firstName: 'Carlos',
        lastName: 'Gonzalez',
        email: 'carltronik@gmail.com',
        phone: '1231231234',
        company: 'abc company'
      })
      contactsController.deleteContact(contact.id);
      const list = contactsController.getContacts();
      expect(list.length).toBe(0);
    });
  });
});
