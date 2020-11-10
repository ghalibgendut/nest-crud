import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel: Model <User>) {}

    async registerUser(username: string, email: string, password: string, name: string){
        const newUser = new this.userModel({
            username,
            email,
            password,
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
}
