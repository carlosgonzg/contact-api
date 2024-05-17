import { Injectable } from '@nestjs/common';
import { Contact } from 'src/models/contact.model';
import { v4 as uuidv4 } from 'uuid';
import { ContactDTO } from './dto/contactDTO';
import { ContactNotFoundError } from 'src/utils/contactNotFoundError';

@Injectable()
export class ContactsService {
  contacts: Contact[] = []; 
  getContacts(): Contact[] {
    return this.contacts;
  }
  getContactById(id: string): Contact {
    const index = this.contacts.findIndex(el => el.id === id);
    if(index === -1){
      throw new ContactNotFoundError();
    }
    console.log(this.contacts[index])
    return this.contacts[index];
  }
  insertContact(contact: ContactDTO): Contact {
    const newContact : Contact = {
      ...contact,
      id: uuidv4()
    }
    this.contacts.push(newContact);
    return newContact;
  }
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
  deleteContact(id: string): void {
    const index = this.contacts.findIndex(el => el.id === id);
    if(index === -1){
      throw new ContactNotFoundError();
    }
    this.contacts.splice(index, 1);
    return;
  }
}
