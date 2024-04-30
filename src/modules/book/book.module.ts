import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { UserModule } from '../user/user.module';
import { forwardRef } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => UserModule)],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
