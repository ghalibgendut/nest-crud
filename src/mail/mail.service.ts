import { Injectable } from '@nestjs/common';
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class MailService {
    constructor (private readonly mailerService: MailerService) {}

    public mailing(): void {
        this
            .mailerService
            .sendMail({
                to: `ghalibsasmito@gmail.com`,
                from: 'putrinining89@gmail.com',
                subject: 'Testing Nest Mailer',
                text: 'Testing',
                html: '<h1>WELCOME</h1>'
            })
            .then((result)=>{
                console.log(result);
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}
