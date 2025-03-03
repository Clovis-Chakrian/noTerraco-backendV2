import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

class NewCategoryDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome da categoria não pode ser vazio.' })
  name: string;
}

export { NewCategoryDto };
