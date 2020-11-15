import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";
import * as bcrypt from 'bcrypt'
import { AuthService } from '../auth/auth.service';
import { query } from 'express';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService
    ) { } //--> ini digunakan ketika menggunakan cara ke-2
    // constructor(@InjectModel('User') private readonly userModel: Model <UserDocument>) {}

    async loginUser(body) {
        const query = {}
        Object.assign(query, {username: body.username})
        const user = await this.findByQuery(query)
        if(!user) throw new BadRequestException("tidak ditemukan user")
        const [accessToken, refreshToken] = await this.authService.login(body)
        return [accessToken, refreshToken, user]
    }

    async comparePassword(user: any, password: string): Promise<boolean> {
        const res = await user.comparePassword(password);
        if (!res) throw new BadRequestException('Kata sandi salah');
        return res;
    }

    async registerUser(body) {
        const newUser = new this.userModel(body)
        const result = await newUser.save()
        return result
    }

    async findAllUsers() {
        const users = await this.userModel.find().exec()
        return users
    }

    // list user
    async list(
        skip?: number,
        limit?: number,
        sort?: string[],
        filter?: string,
    ): Promise<[User[], number, number, number, string]> {
        let query = {};
        let cursor = this.userModel.find(query);
        if (skip) cursor.skip(skip);
        if (limit) cursor.limit(limit);
        if (sort) cursor.sort({ [sort[0]]: sort[1] });
        const merchants = await cursor.exec();
        const count = await this.userModel.countDocuments(query);

        return [merchants, skip, limit, count, filter];
    }

    async findOneUser(id: string) {
        const user = await this.userModel.findById(id).exec()
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            password: user.password,
            name: user.name
        }
    }

    async findByQuery(query){
        const user = await this.userModel.findOne(query).exec()
        return user
    }

    async updateUser(id: string, username: string, email: string, name: string) {
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
        const updateData2 = await this.userModel.findByIdAndUpdate(id, {
            $set: {
                username,
                email,
                name
            }
        }, { new: true })

        console.log(updateData2)
        // // await this.userModel.findByIdAndUpdate({_id: id}, data)
        return updateData
    }

    async deleteUser(id: string) {
        const result = await this.userModel.deleteOne({ _id: id }).exec()
        if (result.n === 0) {
            throw new NotFoundException(`Could not find user.`)
        }
        return true
    }
}
