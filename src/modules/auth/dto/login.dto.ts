import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'E-mail é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'Senha é obrigatória.' })
  password: string;
}
