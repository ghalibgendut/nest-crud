import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Book } from "./books.model";

@Injectable()
export class BooksService {
    constructor(@InjectModel('Book') private readonly bookModel: Model <Book>){}

    async addBook(body){
        const newBook = new this.bookModel(body)
        const result = await newBook.save()
        return result
    }

    async findAllBooks(){
        const books = await this.bookModel.find()
        return books
    }

    async fineOneBook(id: string){
        const book = await this.findBook(id)
        return book
    }

    async update (id: string, body){
        const updateBook = await this.findBook(id)
        if (body.title) {
            updateBook.title = body.title
        }
        if (body.desc) {
            updateBook.description = body.desc
        }
        if (body.price) {
            updateBook.price = body.price
        }
        updateBook.save()
        return updateBook
    }

    async deleteBook (id: string){
        const result = await this.bookModel.deleteOne({_id: id}).exec()
        if (result.n === 0) {
            throw new NotFoundException(`Could not find book.`)
        }

        return true;
    }

    private async findBook(id: string): Promise<Book>{
        let book;
        try {
            book = await this.bookModel.findById(id).exec()
            if(!book) {
                throw new NotFoundException('Could not find book.')
            }
        } catch (err) {
            throw new NotFoundException('Could not find book.')
        }

        return book
    }
}
