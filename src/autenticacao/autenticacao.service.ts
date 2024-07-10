import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UsuarioService } from 'src/usuario/usuario.service';
import { JwtService } from '@nestjs/jwt';
import { PayloadInterface } from './interfaces/payload.interface';

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService
  ) {}

  private async checkSenha(senha: string, hash: string): Promise<boolean>{
    return await bcrypt.compare(senha, hash)
  }

  private async criaToken(payload: PayloadInterface){
    return await this.jwtService.signAsync(payload)
  }

  async login(email: string, senha: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email)

    if(!usuario){
      return new NotFoundException("Usuário não encontrado")
    }

    const checaSenha= await this.checkSenha(senha, usuario.senha)

    if(!checaSenha){
      throw new UnauthorizedException("Usuário não autenticado")
    }

    const payload: PayloadInterface = {
      sub: usuario.id,
      nomeUsuario: usuario.nome
    }

    return{
      token_acesso: await this.criaToken(payload)
    }

  }


}
