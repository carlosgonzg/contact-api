import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactDTO } from './dto/contactDTO';
import { Contact } from '../models/contact.model';
import { ContactNotFoundError } from '../utils/contactNotFoundError';
import { ApiResponse } from '@nestjs/swagger';


/**
 * Contacts Controller
 */
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) { }

  /**
   * Get Contacts.
   *
   * @returns List of Contacts.
   */
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get Contact List',
    type: [Contact],
  })
  getContacts(): Contact[] {
    return this.contactsService.getContacts();
  }

  /**
   * Find Contact by Id.
   *
   * @returns Contact.
   */
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Find Contact',
    type: Contact,
  })
  getContactById(@Param('id') id: string): Contact {
    try {
      const data = this.contactsService.getContactById(id);
      console.log(data)
      return data;
    }
    catch (e) {
      console.log(e)
      if (e instanceof ContactNotFoundError) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  /**
   * Create Contact.
   *
   * @returns Contact.
   */
  @Post()
  @ApiResponse({
    status: 200,
    description: 'Create Contact',
    type: Contact,
  })
  insertContact(@Body() contact: ContactDTO): Contact {
    return this.contactsService.insertContact(contact);
  }

  /**
   * Updates Contact.
   *
   * @returns Contact.
   */
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'Update Contact',
    type: Contact,
  })
  updateContact(@Param('id') id: string, @Body() contact: ContactDTO): Contact {
    try {
      return this.contactsService.updateContact(id, contact);
    }
    catch (e) {
      if (e instanceof ContactNotFoundError) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  /**
   * Deletes Contact.
   *
   * @returns void.
   */
  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Delete Contact',
  })
  deleteContact(@Param('id') id: string): void {
    try {
      return this.contactsService.deleteContact(id);
    }
    catch (e) {
      if (e instanceof ContactNotFoundError) {
        throw new HttpException(e.message, HttpStatus.NOT_FOUND);
      }
    }
  }
}
