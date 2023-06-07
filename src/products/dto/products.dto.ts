import { PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString({
    message:
      'Msg. personalizado E.J:Tiene que ser un nombre en strings no seas pelotudo',
  })
  readonly name: string;
  @IsNotEmpty()
  @IsString()
  readonly description: string;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly stock: number;
  @IsNotEmpty()
  @IsUrl()
  readonly image: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {
  readonly name: string;
  readonly description: string;
  readonly price: number;
  readonly stock: number;
  readonly image: string;
}
