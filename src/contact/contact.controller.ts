import { IResponse } from './../interfaces/response.interface';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactService } from './contact.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { Contact } from './contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async createContact(
    @Body() createContactDTO: CreateContactDto,
  ): Promise<IResponse> {
    const contact = await this.contactService.create(createContactDTO);
    return {
      status: 'success',
      message: 'Contact created successfully',
      data: contact,
    };
  }

  @Get()
  async getContact(): Promise<IResponse> {
    const contacts = await this.contactService.findAll();
    return {
      status: 'success',
      message: 'Contacts retrieved successfully',
      data: contacts,
    };
  }

  @Get('/:id')
  async getOneContact(@Param('id') id: number): Promise<IResponse> {
    const contact = await this.contactService.findOne(id);
    return {
      status: 'success',
      message: 'Contact retrieved successfully',
      data: contact,
    };
  }

  @Put('/:id')
  async editContact(
    @Param('id') id: number,
    @Body() contactDTO: CreateContactDto,
  ): Promise<IResponse> {
    const edit_contact = await this.contactService.editContact(contactDTO, id);
    return {
      status: 'success',
      message: 'Contact edited successfully',
      data: null,
    };
  }

  @Delete('/:id')
  async deleteContact(@Param('id') id: number): Promise<IResponse> {
    await this.contactService.deleteContact(id);
    return {
      status: 'success',
      message: 'Contact deleted successfully',
      data: null,
    };
  }
}
