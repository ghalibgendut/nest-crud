import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { BooksService } from "./books.service";
import { AddBooksDto } from "./booksDto/books.addBooksDto";
import { UpdateBookDto } from "./booksDto/books.updateBookDto";

@Controller('books')
export class BooksController {
    constructor (private readonly booksService: BooksService) {}
    
    @Post('add')
    async addBook (@Body() body: AddBooksDto){
        const book = await this.booksService.addBook(body)
        return {
            statusCode: HttpStatus.OK,
            message: 'Book added',
            data: book
        }
    }

    @Get()
    async getAllBooks() {
        const books = await this.booksService.findAllBooks()
        return books
    }

    @Get(':id')
    async getBook(@Param('id') id: string){
        return this.booksService.fineOneBook(id)
    }

    @Patch(`:id`)
    async updateBook(@Param('id') id: string, @Body() body: UpdateBookDto){
        const book = await this.booksService.update(id, body)
        return {
            statusCode: HttpStatus.OK,
            message: `Book Updated`,
            book: book
        }
    }

    @Delete(`:id`)
    async removeBook(@Param(`id`) id: string){
        const isDeleted = await this.booksService.deleteBook(id)
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: `Book Deleted`
            }
        }
    }


}
