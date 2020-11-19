import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./users.model";
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt'

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
        await this.compPassword(user, body.password)
        const [accessToken, refreshToken] = await this.authService.login(body)
        return [accessToken, refreshToken, user]
    }

    async compPassword(user: any, password: string): Promise<boolean> {
        const res = await user.comparePassword(password);
        if (!res) throw new BadRequestException('Kata sandi salah');
        return res;
    }

    // update password
    async updatePass (id: string, body) {
        const updateData = await this.userModel.findById(id)
        
        let compare = bcrypt.compareSync(body.oldPassword, updateData.password)
        
        if (!compare) throw new BadRequestException(`Kata sandi salah`)
        
        
        if (body.newPassword === body.confirmPassword) {            
            let pass = bcrypt.hashSync(body.newPassword, 10)   
            const updatePass = await this.userModel.findByIdAndUpdate(id, {
                $set: pass
            }, {new: true})
            return updatePass
        }
        
        
        
    }

    async registerUser(body) {
        const newUser = new this.userModel(body)
        const result = await newUser.save()
        return result
    }

    async findAllUsers() {
        const users = await this.userModel.find()
        const list = await this.list()
        return [users, list]
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
        const user = await this.userModel.findById(id)
        return user
    }

    async findByQuery(query){
        const user = await this.userModel.findOne(query)
        return user
    }

    async updateUser(id: string, body) {
        const updateData = await this.userModel.findById(id)

        if (body.username) {
            updateData.username = body.username
        }
        if (body.email) {
            updateData.email = body.email
        }
        if (body.name) {
            updateData.name = body.name
        }
        // await updateData.save()
        console.log(body);
        
        const updateData2 = await this.userModel.findByIdAndUpdate(id, {
            $set: body
        }, { new: true })

        console.log(updateData2)
        // // await this.userModel.findByIdAndUpdate({_id: id}, data)
        return updateData
    }

    async deleteUser(id: string) {
        const result = await this.userModel.deleteOne({ _id: id })
        if (result.n === 0) {
            throw new NotFoundException(`Could not find user.`)
        }
        return true
    }
}
