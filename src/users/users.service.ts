import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./users.model";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    // constructor(@InjectModel('User') private readonly userModel: Model <User>) {} --> ini digunakan ketika menggunakan cara ke-2
    constructor(@InjectModel('User') private readonly userModel: Model <UserDocument>) {}

    async registerUser(username: string, email: string, password: string, name: string){
        let pass = await bcrypt.hash(password, 10)
        
        const newUser = new this.userModel({
            username,
            email,
            password: pass,
            name
        })        
        const result = await newUser.save()
        return result
    }

    async findAllUsers(){
        const users = await this.userModel.find().exec()
        return users.map(user => ({
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            name: user.name
        }))
    }

    async findOneUser(id: string){
        const user = await this.userModel.findById(id).exec()
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            name: user.name
        }
    }

    async updateUser (id: string, username: string, email: string, name: string){
        const updateData = await this.userModel.findById(id).exec()

        if (username) {
            updateData.username = username
        }
        if (email) {
            updateData.email = email
        }
        if (name) {
            updateData.name = name
        }
        // await updateData.save()
        const updateData2 = await this.userModel.findByIdAndUpdate(id, {$set : {
            username,
            email,
            name
        }},{new : true})

        console.log(updateData2)
        // // await this.userModel.findByIdAndUpdate({_id: id}, data)
        return updateData
    }

    async deleteUser(id: string){
        const result = await this.userModel.deleteOne({_id: id}).exec()
        if (result.n === 0) {
            throw new NotFoundException(`Could not find user.`)
        }
        return true
    }
}
