import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
// import * as mongoose from 'mongoose' --> digunakan untuk cara ke-2

export type UserDocument = User & Document

// Cara pertama
@Schema()
export class User {
    @Prop({required: true})
    username: string

    @Prop({required: true})
    email : string

    @Prop({required: true})
    password: string

    @Prop({required: true})
    name: string
}

export const UserSchema = SchemaFactory.createForClass(User)




// Cara ke-2

// export const UserSchema = new mongoose.Schema({
//     username: {
//         type: String, required:true
//     },
//     email: {
//         type: String, required: true
//     },
//     password: {
//         type: String, required: true
//     },
//     name: {
//         type: String, required: true
//     }
// })

// export interface User extends mongoose.Document{
//     id: String,
//     username: String,
//     email: String,
//     password: String,
//     name: String
// }