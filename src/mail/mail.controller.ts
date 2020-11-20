import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { MailService } from "./mail.service";

@Controller('mail')
export class MailController {
    constructor(private readonly mailService: MailService) {}

    // Send Email
    @Post('email')
    async sendEmail(@Body() body: string) {
        try {
            const send = await this.mailService.mailing(body)
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
