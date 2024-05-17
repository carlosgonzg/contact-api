import { ApiProperty } from "@nestjs/swagger";

export class Contact {
    @ApiProperty({ description: 'Contact Id' })
    id: string;

    @ApiProperty({ description: 'Contact FirstName' })
    firstName: string;

    @ApiProperty({ description: 'Contact LastName' })
    lastName: string;

    @ApiProperty({ description: 'Contact Email' })
    email: string;
    
    @ApiProperty({ description: 'Contact Phone' })
    phone: string;

    @ApiProperty({ description: 'Contact Company' })
    company: string;
}