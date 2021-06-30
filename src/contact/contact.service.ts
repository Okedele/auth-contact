import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './contact.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDTO: CreateContactDto): Promise<Contact> {
    const contact = await this.contactRepository.create(createContactDTO);
    return this.contactRepository.save(contact);
  }

  async findAll(): Promise<Contact[]> {
    return this.contactRepository.find({});
  }

  async findOne(id: number): Promise<Contact> {
    const contact = await this.contactRepository.findOne({ id });
    if (!contact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    return contact;
  }

  async editContact(contactDTO: CreateContactDto, id: number): Promise<Contact> {
    let contact = await this.contactRepository.findOne({ id });
    if (!contact) {
      throw new HttpException('Contact not found', HttpStatus.NOT_FOUND);
    }
    contact.name = contactDTO.name;
    contact.address = contactDTO.address;
    contact.email = contactDTO.email;
    contact.phone = contactDTO.phone;
    return await this.contactRepository.save(contact);
  }

  async deleteContact(id: number) {
    return this.contactRepository.delete({ id });
  }
}
