import { Controller, Get, Post, Body, Param, Patch, Delete, HttpStatus } from '@nestjs/common';
import { UsersService } from "./users.service";
import { UserRegisterDto } from "./userDto/user.registerDto";
import { LoginDto } from "./userDto/user.loginDto";
import { UserUpdateDTO } from "./userDto/user.updateUserDto";
import { UserChangePassDto } from "./userDto/user.changepassDto";

@Controller('users')
export class UsersController {
    constructor (private readonly userService: UsersService) {}

    @Post('register')
    async registerUser (@Body() body: UserRegisterDto){
        const user = await this.userService.registerUser(body)
        return {
            statusCode: HttpStatus.OK,
            message: 'Register successful',
            data: user
        }
    }

    @Post('userLogin')
    async login(@Body() body: LoginDto) {
        const users = await this.userService.loginUser(body)
        return users
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
    async updateUser (@Param(`id`) id: string, @Body() body: UserUpdateDTO){
        const user = await this.userService.updateUser(id, body)
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

    // ChangePassword
    @Post('changePass/:id')
    async changePassword(@Param(`id`) id: string, @Body() body:UserChangePassDto){
        const user = await this.userService.updatePass(id, body)
        return {
            statusCode: HttpStatus.OK,
            message: `Password Changed`,
            data: user
        }
    }
}
