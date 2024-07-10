import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { RequisicaoComUsuario } from 'src/autenticacao/autenticacao.guard';
import { Request, Response} from 'express'

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {

  constructor(private logger: ConsoleLogger){}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextoHttp = context.switchToHttp()
    const resposta = contextoHttp.getResponse<Response>()

    const requisicao = contextoHttp.getRequest<Request | RequisicaoComUsuario>()

    const {path, method} = requisicao
    const {statusCode} = resposta

    this.logger.log(`${path} ${method}`)

    const instatePreControlador = Date.now()

    return next.handle().pipe(
      tap(()=>{
        if ('usuario' in requisicao) {
          this.logger.log(`Rota acessada pelo usuário ${requisicao.usuario.sub}`)
        }
        const tempoDeExecucaoDaRota = Date.now() - instatePreControlador
        this.logger.log(`Resposta: status ${statusCode} - ${tempoDeExecucaoDaRota} ms`)
      })
    );
  }
}
