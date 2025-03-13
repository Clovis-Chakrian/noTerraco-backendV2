import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class NewSubcategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome da subcategoria não pode ser vazio.' })
  name: string;
}

export { NewSubcategoryDto };
