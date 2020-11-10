import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model <User>) {}

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

    async updateUser (id: string, username: string, email: string, password: string, name: string){
        const update = await this.userModel.findById(id).exec()
        if (username) {
            update.username = username
        }
        if (email) {
            update.email = email
        }
        if (password) {
            update.password = password
        }
        if (name) {
            update.name = name
        }
        update.save()
        return update
    }

    async deleteUser(id: string){
        const result = await this.userModel.deleteOne({_id: id}).exec()
        if (result.n === 0) {
            throw new NotFoundException(`Could not find user.`)
        }
        return true
    }
}
