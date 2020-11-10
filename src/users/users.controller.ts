import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from "./users.service";

@Controller('users')
export class UsersController {
    constructor (private readonly userService: UsersService) {}

    @Post('register')
    async registerUser (
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('name') name: string
    ){
        const user = await this.userService.registerUser(
            username,
            email,
            password,
            name
        )
        return {
            statusCode: HttpStatus.OK,
            message: 'Register successful',
            data: user
        }
    }

    @Get('allUser')
    async getAllUser() {
       const users = await this.userService.findAllUsers()
       return {
           statusCode: HttpStatus.OK,
           message: 'All users data retrived',
           data: users
       }
    }

    @Get('userById/:id')
    async getOneUser(@Param('id') id: string){
        return this.userService.findOneUser(id)
    }

    @Patch(`updateUser/:id`)
    async updateUser (
        @Param(`id`) id: string,
        @Body(`username`) username: string,
        @Body(`email`) email: string,
        @Body(`password`) password: string,
        @Body(`name`) name: string
    ){
        const user = await this.userService.updateUser(
            id,
            username,
            email,
            password,
            name
        )
        return {
            statusCode: HttpStatus.OK,
            message: `Update successfully`,
            data: user
        }
    }

    @Delete(`deleteUser/:id`)
    async deleteUser(@Param(`id`) id: string){
        const isDeleted = await this. userService.deleteUser(id)
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: `User Deleted`,
                data: isDeleted
            }
        }
    }
}
