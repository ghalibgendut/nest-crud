// import { Document } from 'mongoose'
// import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from 'mongoose' //--> digunakan untuk cara ke-2
import * as bcrypt from 'bcrypt'
import { BadRequestException } from "@nestjs/common";
// export type UserDocument = User & Document

// // Cara pertama
// @Schema()
// export class User {
//     @Prop({required: true})
//     username: string

//     @Prop({required: true})
//     email : string

//     @Prop({required: true})
//     password: string

//     @Prop({required: true})
//     name: string
// }

// export const UserSchema = SchemaFactory.createForClass(User)




// Cara ke-2

const UserSchema = new mongoose.Schema({
    username: {
        type: String, unique: true
    },
    email: {
        type: String, unique: true
    },
    password: {
        type: String
    },
    name: {
        type: String
    }
})

const hidden = ['password', '__v']
UserSchema.pre('save', function (next) {
    let user: any = this
    if (!user.isModified('password')) return next();
    if (!user.password) return next()

    const lowerCase = new RegExp("^(?=.*[a-z])")
    const upperCase = new RegExp("(?=.*[A-Z])")
    const numeric = new RegExp("(?=.*[0-9])")
    const symbol = new RegExp("(?=.*[!@#\$%\^&\*])")    

    if (lowerCase.test(user.password) === false) throw new BadRequestException('Mohon masukkan kata sandi dengan minimal 1 huruf kecil')
    if (upperCase.test(user.password) === false) throw new  BadRequestException('Mohon masukkan kata sandi dengan minimal 1 huruf besar')
    if (numeric.test(user.password) === false) throw new BadRequestException( 'Mohon masukkan kata sandi dengan minimal 1 angka')
    if (symbol.test(user.password) === false) throw new BadRequestException('Mohon masukkan kata sandi dengan minimal 1 simbol')

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err)
        
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)
            
            user.password = hash
            next()
        })
    })
})

UserSchema.methods.comparePassword = function (password: string) {
    if(!this.password) return false
    return bcrypt.compare(password, this.password)
}


UserSchema.methods.toJSON = function() {
    var obj = this.toObject();
    for (var i = hidden.length - 1; i >= 0; i--) {
        delete obj[hidden[i]];
    }
    return obj;
}

export interface User extends mongoose.Document{
    id: String,
    username: String,
    email: String,
    password: String,
    name: String
}

export { UserSchema }