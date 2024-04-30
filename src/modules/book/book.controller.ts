import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { Request } from 'express';

@Controller('/api')
@UseGuards(AuthGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post('/book')
  async create(@Body() createBookDto: CreateBookDto) {
    return await this.bookService.create(createBookDto);
  }

  @Get('/books')
  async findAll() {
    return await this.bookService.findAll();
  }

  @Get('/book/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.bookService.findOne(+id);
  }

  @Get('/books/mine')
  async findMyBooks(@Req() req: Request) {
    return await this.bookService.findMyBooks(req);
  }

  @Get('/books/:authors')
  async findBooksByAuthors(@Param('authors') authors: string) {
    return await this.bookService.findBooksByAuthors(authors);
  }



  @Patch('/book/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBookDto: UpdateBookDto,
    @Req() req: Request,
  ) {
    return await this.bookService.update(+id, updateBookDto, req, false);
  }

  @Patch('/book/compra/:id')
  async compra(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return await this.bookService.compra(+id, req);
  }

  @Delete('/book/:id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    return await this.bookService.remove(+id, req);
  }
}
