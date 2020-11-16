import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'
import { GenerateTokenDto } from "./dto/jwt.generateToken.dto";
import { LoginDto } from "./dto/jwt.generateToken.dto";
import { UsersService } from "../users/users.service";
import { plainToClass } from 'class-transformer';
@Injectable()
export class AuthService {
    private key
    private expired
    constructor(    
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        private readonly jwt: JwtService,
    ) { this.key = "thisIsAkey", this.expired = "12h" }

    generateToken(body: GenerateTokenDto) {
        const accessToken = this.jwt.sign({ body }, { expiresIn: this.expired })
        const refreshToken = this.jwt.sign({}, { expiresIn: this.expired })
        return [{accessToken: accessToken, refreshToken: refreshToken}]
    }

    async login(body: LoginDto) {
        let genToken = {}
        Object.assign(genToken, {username: body.username})
        const user = await this.userService.findByQuery(genToken)
        Object.assign(genToken, {
            id: user._id,
            username: user.username,
            email: user.email
        })
        
        const schemaGenToken = plainToClass(GenerateTokenDto, genToken)
        const [accessToken, refreshToken] = await this.generateToken(schemaGenToken)
        return [accessToken, refreshToken]
    }
}
