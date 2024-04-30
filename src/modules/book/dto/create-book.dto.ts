import {
  IsDateString,
  IsEmpty,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';
import { Status } from 'src/common/enum/status.enum';

export class CreateBookDto {
  @IsInt({ message: 'Usuário deve ser um número inteiro.' })
  @IsPositive({ message: 'Usuário deve ser um número inteiro positivo.' })
  @IsNotEmpty({ message: 'Usuário é obrigatório.' })
  userId: number;

  @IsEmpty({ message: 'nameDB não deve ser preenchido' })
  nameDB: string;

  @IsString({ message: 'Nome deve ser uma string.' })
  @IsNotEmpty({ message: 'Nome é obrigatório.' })
  name: string;

  @IsString({ message: 'Autor deve ser uma string.' })
  @IsNotEmpty({ message: 'Autor é obrigatório.' })
  author: string;

  @IsNumber({}, { message: 'Preço deve ser um número real.' })
  @IsPositive({ message: 'Preço deve ser um número real > 0.' })
  @IsNotEmpty({ message: 'Preço é obrigatório.' })
  price: number;

  @IsInt({ message: 'Quantidade de exemplares deve ser um número inteiro.' })
  @IsNotEmpty({ message: 'Quantidade de exemplares é obrigatória.' })
  amount: number;

  @IsEmpty({ message: 'Status não deve ser preenchido' })
  status: Status;

  @IsInt({ message: 'Quantidade de páginas deve ser um número inteiro.' })
  @IsPositive({
    message: 'Quantidade de páginas deve ser um número inteiro > 0.',
  })
  @IsNotEmpty({ message: 'Quantidade de páginas é obrigatória.' })
  pages: number;

  @IsString({ message: 'Categoria deve ser uma string.' })
  @IsNotEmpty({ message: 'Categoria é obrigatória.' })
  category: string;

  @IsString({ message: 'Editora deve ser uma string.' })
  @IsNotEmpty({ message: 'Editora é obrigatória.' })
  publishingCompany: string;

  @IsDateString({}, { message: 'Data da publicação deve ser uma data válida.' })
  @IsNotEmpty({ message: 'Data da publicação é obrigatória.' })
  publication: Date;

  @IsString({ message: 'Descrição deve ser uma string.' })
  @IsNotEmpty({ message: 'Descrição é obrigatória.' })
  description: string;

  @IsUrl({}, { message: 'URL deve ser uma URL' })
  @IsNotEmpty({ message: 'URL é obrigatória.' })
  url: string;
}
