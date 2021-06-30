import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ContactService } from './contact.service';
import { Contact } from './contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ContactController } from './contact.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contact])],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ContactService,
  ],
  controllers: [ContactController],
})
export class ContactModule {}
