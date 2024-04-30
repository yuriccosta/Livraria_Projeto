import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  name: string;

  @IsString({ message: 'E-mail deve ser uma string.' })
  @IsEmail({}, { message: 'E-mail deve ser um e-mail.' })
  @IsNotEmpty({ message: 'E-mail é obrigatório.' })
  email: string;

  @IsNumber({}, { message: 'Dinheiro deve ser um número.' })
  @IsPositive({ message: 'Dinheiro deve ser um número > 0' })
  @IsNotEmpty({ message: 'Dinheiro é obrigatório.' })
  @Transform(({ value }) => parseInt(value, 10))
  cash: number;

  @IsString({ message: 'Senha deve ser uma string.' })
  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  @IsStrongPassword(
    {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    },
    { message: 'Senha deve ser forte.' },
  )
  password: string;
}
