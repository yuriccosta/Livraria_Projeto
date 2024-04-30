import { UserService } from '../user/user.service';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { Repository } from 'typeorm';
import { Status } from 'src/common/enum/status.enum';
import { decode } from 'jsonwebtoken';
import { Request } from 'express';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    private readonly userService: UserService,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const nameDB = createBookDto.name.trim();
    createBookDto.nameDB = nameDB;
    //await this.bookExists(createBookDto.nameDB);

    if (createBookDto.amount <= 0) {
      createBookDto.amount = 0;
      createBookDto.status = Status.ProdutoIndisponivel;
    } else {
      createBookDto.status = Status.ProdutoDisponivel;
    }

    await this.userService.findOne(createBookDto.userId);

    const book = await this.bookRepository.save(createBookDto);
    delete book.nameDB;
    return book;
  }

  async findAll() {
    return await this.bookRepository.find();
  }

  async findOne(id: number) {
    try {
      return await this.bookRepository.findOneByOrFail({ id });
    } catch (error) {
      throw new NotFoundException('Livro não foi encontrado.');
    }
  }

  async update(
    id: number,
    updateBookDto: UpdateBookDto,
    req: Request,
    compra: boolean,
  ) {
    if (compra) {
      await this.findOne(id);
    } else {
      await this.findOneValidate(id, req);
    }

    if (updateBookDto.userId) {
      await this.userService.findOne(updateBookDto.userId);
    }

    if (updateBookDto.amount <= 0) {
      updateBookDto.amount = 0;
      updateBookDto.status = Status.ProdutoIndisponivel;
    } else {
      updateBookDto.status = Status.ProdutoDisponivel;
    }

    return await this.bookRepository.update(id, updateBookDto);
  }

  async compra(id: number, req: Request) {
    // Pega o livro que iremos comprar
    const book = await this.findOne(id);
    console.log(book);

    // Verifica se está disponivel
    if (book.status == Status.ProdutoDisponivel) {
      const sub = await this.getIdToken(req);
      console.log(sub);

      // Pega o usuario comprador e verifica se tem dinheiro
      const comprador = await this.userService.findOne(sub);

      if (comprador.cash >= book.price) {
        console.log(book.userId);

        // Pega o usuario vendedor e depois faz os saques e depositos
        const vendedor = await this.userService.findOne(book.userId);
        vendedor.cash += book.price;
        comprador.cash -= book.price;

        // Retira o email e o email para poder fazer o update no banco de dados
        delete comprador.email;
        delete vendedor.email;
        delete comprador.id;
        delete vendedor.id;
        await this.userService.update(sub, comprador);
        await this.userService.update(book.id, vendedor);

        // Cria um livro a partir do livro ja existente
        const sellBook = { ...book };
        delete sellBook.id;
        sellBook.userId = sub;
        if (
          await this.bookRepository.find({
            where: { userId: sub, name: sellBook.name },
          })
        ) {
          console.log(await this.bookRepository.find({
            where: { userId: sub, name: sellBook.name },
          }));
          sellBook.amount++;
          await this.update(sub, sellBook, req, true);
        } else {
          sellBook.amount = 1;
          await this.create(sellBook);
        }
        console.log(sellBook);

        book.amount--;

        console.log('erro1');
        console.log(book);
        await this.update(book.id, book, req, true);
        console.log('erro2');

        return sellBook;
      } else {
        throw new UnauthorizedException('Saldo insuficiente.');
      }
    } else {
      throw new BadRequestException('Produto indisponivel.');
    }
  }

  async remove(id: number, req: Request) {
    await this.findOneValidate(id, req);
    return await this.bookRepository.delete(id);
  }

  /*async bookExists(nameDB: string) {
    const book = await this.bookRepository.findOne({ where: { nameDB } });
    if (book) {
      throw new BadRequestException('Livro já existe');
    }
  }*/

  async getIdToken(req: Request) {
    const [type, token] = req.headers['authorization']?.split(' ') ?? [];
    const jwtToken = type === 'Bearer' ? token : undefined;
    const sub = Number(decode(jwtToken)['sub']);
    return sub;
  }

  // Busca o usuário e verifica se o id do livro é igual ao id referente ao usuário
  async findOneValidate(id: number, req: Request) {
    const sub = await this.getIdToken(req);

    const book = await this.findOne(id);
    if (book.userId == sub) {
      return book;
    } else {
      throw new UnauthorizedException('Não tem autorização necessária');
    }
  }

  async findMyBooks(req: Request) {
    const sub = await this.getIdToken(req);
    return await this.bookRepository.find({ where: { userId: sub } });
  }

  async findBooksByAuthors(author: string) {
    return await this.bookRepository.find({ where: { author } });
  }
}
