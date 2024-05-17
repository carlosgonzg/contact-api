import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class ContactDTO {
    @IsString()
    @ApiProperty({ description: 'Contact FirstName' })
    firstName: string;

    @IsString()
    @ApiProperty({ description: 'Contact LastName' })
    lastName: string;

    @IsEmail()
    @ApiProperty({ description: 'Contact Email' })
    email: string;

    @IsPhoneNumber()
    @ApiProperty({ description: 'Contact Phone' })
    phone: string;
    
    @IsString()
    @ApiProperty({ description: 'Contact Company' })
    company: string;
}