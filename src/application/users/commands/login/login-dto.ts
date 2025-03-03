import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

class LoginDto {
  
    @ApiProperty()
    @IsEmail({}, { message: 'O email é uma informação obrigatória e deve ser válido.' })
    email: string;
  
    @ApiProperty()
    @IsNotEmpty({ message: 'A senha é uma informação obrigatória.' })
    password: string;
}

export { LoginDto }