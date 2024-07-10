import { Module } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticacaoController } from './autenticacao.controller';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.registerAsync({
      useFactory:(configService: ConfigService) => {
        return{
          secret: configService.get<string>('SECREDO_JWT'),
          signOptions: { expiresIn: '72h' },
        }
      },
      inject:[ConfigService],
      global: true,
    }),
  ],
  controllers: [AutenticacaoController],
  providers: [AutenticacaoService]
})
export class AutenticacaoModule {}
