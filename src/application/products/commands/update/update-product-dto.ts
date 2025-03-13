import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UUID } from 'crypto';

class UpdateProductDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'O nome do produto não pode ser vazio.' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'A descrição do produto não pode ser vazio.' })
  description: string;

  // TODO: trocar para upload de imagens (e posteriormente video) multiplos mas nao de forma obrigatória.
  @ApiProperty()
  @IsNotEmpty({ message: 'O preço do produto não pode ser vazio.' })
  image: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'O preço do produto não pode ser vazio.' })
  price: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'A categoria do produto não pode ser vazio.' })
  categoryId: UUID;
}

export { UpdateProductDto };