import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoDto } from './dto/autenticacao.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  login(@Body() {email, senha}: AutenticacaoDto) {
    return this.autenticacaoService.login(email, senha);
  }

 
}
