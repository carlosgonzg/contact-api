import { Injectable } from '@nestjs/common';
import { Contact } from '../models/contact.model';
import { v4 as uuidv4 } from 'uuid';
import { ContactDTO } from './dto/contactDTO';
import { ContactNotFoundError } from '../utils/contactNotFoundError';

@Injectable()
export class ContactsService {
  contacts: Contact[] = []; 
  /**
   * Get Contacts.
   *
   * @returns List of Contacts.
   */
  getContacts(): Contact[] {
    return this.contacts;
  }

  /**
   * Find Contact by Id.
   *
   * @returns Contact.
   */
  getContactById(id: string): Contact {
    const index = this.contacts.findIndex(el => el.id === id);
    if(index === -1){
      throw new ContactNotFoundError();
    }
    console.log(this.contacts[index])
    return this.contacts[index];
  }

  /**
   * Create Contact.
   *
   * @returns Contact.
   */
  insertContact(contact: ContactDTO): Contact {
    const newContact : Contact = {
      ...contact,
      id: uuidv4()
    }
    this.contacts.push(newContact);
    return newContact;
  }

  /**
   * Updates Contact.
   *
   * @returns Contact.
   */
  updateContact(id: string, contact: ContactDTO): Contact {
    const index = this.contacts.findIndex(el => el.id === id);
    if(index === -1){
      throw new ContactNotFoundError();
    }
    this.contacts[index] = {
      ...this.contacts[index],
      ...contact
    };
    return this.contacts[index];
  }

  /**
   * Deletes Contact.
   *
   * @returns void.
   */
  deleteContact(id: string): void {
    const index = this.contacts.findIndex(el => el.id === id);
    if(index === -1){
      throw new ContactNotFoundError();
    }
    this.contacts.splice(index, 1);
    return;
  }
}
