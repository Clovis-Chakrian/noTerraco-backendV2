import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

class NewUserDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome é uma informação obrigatória.' })
  fullname: string;

  @ApiProperty()
  @IsEmail({}, { message: 'O email é uma informação obrigatória e deve ser válido.' })
  email: string;

  @ApiProperty()
  @Length(8, 200, { message: 'A senha é obrigatória e deve conter no mínimo 8 caratecteres e no máximo 200.' })
  password: string;
}

export { NewUserDto };