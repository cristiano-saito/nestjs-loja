import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { PayloadInterface } from './interfaces/payload.interface';

export interface RequisicaoComUsuario extends Request {
  usuario: PayloadInterface
}

@Injectable()
export class AutenticacaoGuard implements CanActivate {

  constructor(private jwtService: JwtService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>   {
    const requisicao = context.switchToHttp().getRequest<RequisicaoComUsuario>()
    const token = this.extrairToken(requisicao)

    if (!token) {
      throw new UnauthorizedException("Erro de autenticacao");
    }

    try {
      const payload: PayloadInterface = await this.jwtService.verifyAsync(token);
 
      requisicao.usuario = payload;
    } catch {
      throw new UnauthorizedException("Erro de autenticacao");
    }
    return true;
  }


  private extrairToken(requisicao:Request): string | undefined{
    const [tipo, token] = requisicao.headers.authorization?.split(' ') ?? []
    return tipo === 'Bearer'? token: undefined
  }
}
