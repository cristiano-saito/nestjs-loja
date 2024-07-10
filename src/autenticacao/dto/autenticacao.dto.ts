import { IsEmail, IsNotEmpty } from "class-validator";

export class AutenticacaoDto {
    @IsEmail(undefined, {message: "o email informado é inválido"})
    email: string;

    @IsNotEmpty({message: "A senha não pode estar vazia"})
    senha: string;
}
