import * as mongoose from 'mongoose'

export const BooksSchema = new mongoose.Schema({
    title : {
        type: String, required: true
    },
    description : {
        type: String, required: true
    },
    price: {
        type: String, required: true
    }
})

export interface Book extends mongoose.Document {
    id: String,
    title: String,
    description: String,
    price: number
}