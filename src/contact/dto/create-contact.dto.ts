import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateContactDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;
}