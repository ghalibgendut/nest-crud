import { Controller, Post, HttpStatus } from '@nestjs/common';
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    // Send Email
    @Post('email')
    async sendEmail() {
        try {
            const send = await this.mailService.mailing 
            return {
                statusCode: HttpStatus.OK,
                message: "email sent",
                data: send
            }
        } catch (err) {
            return {
                statusCode: HttpStatus.GATEWAY_TIMEOUT,
                message: err.message
            }
        }
        
    }
}
