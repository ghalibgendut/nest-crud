import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Book } from "./books.model";

@Injectable()
export class BooksService {
    constructor(@InjectModel('Book') private readonly bookModel: Model <Book>){}

    async addBook(title: string, desc: string, price: number){
        const newBook = new this.bookModel({
            title,
            description: desc,
            price
        })
        const result = await newBook.save()
        return result
    }

    async findAllBooks(){
        const books = await this.bookModel.find().exec()
        return books.map(book => ({
            id: book.id,
            title: book.title,
            description: book.description,
            price: book.price
        }))
    }

    async fineOneBook(id: string){
        const book = await this.findBook(id)
        return {
            id: book.id,
            title: book.title,
            description: book.description,
            price: book.price
        }
    }

    async update (id: string, title: string, desc: string, price: number){
        const updateBook = await this.findBook(id)
        if (title) {
            updateBook.title = title
        }
        if (desc) {
            updateBook.description = desc
        }
        if (price) {
            updateBook.price = price
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
        } catch (err) {
            throw new NotFoundException('Could not find book.')
        }
        if(!book) {
            throw new NotFoundException('Could not find book.')
        }

        return book
    }
}
