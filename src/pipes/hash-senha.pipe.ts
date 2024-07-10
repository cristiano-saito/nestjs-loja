import { Injectable, PipeTransform } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class HashSenhaPipe implements PipeTransform{

    constructor(private configService:ConfigService){}
    async transform(senha: string) {
      
        const salt = await bcrypt.genSalt(+this.configService.get('SALT'))

        const hash = await bcrypt.hash(senha, salt);

        return hash
    }
    
}