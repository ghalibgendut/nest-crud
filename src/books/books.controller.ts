import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { BooksService } from "./books.service";

@Controller('books')
export class BooksController {
    constructor (private readonly booksService: BooksService) {}
    
    @Post('add')
    async addBook (
        @Body('title') bookTitle: string,
        @Body('description') bookDesc: string,
        @Body('price') bookPrice: number
    ){
        const book = await this.booksService.addBook(
            bookTitle,
            bookDesc,
            bookPrice
        )

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
    async updateBook(
        @Param('id') id: string,
        @Body('title') bookTitle: string,
        @Body('description') bookDesc: string,
        @Body('price') bookPrice: number
    ){
        const book = await this.booksService.update(
            id,
            bookTitle,
            bookDesc,
            bookPrice
        )
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
