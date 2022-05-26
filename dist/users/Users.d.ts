export declare class UsersDto {
    email: string;
    senha: string;
}
export declare class CadastroDto {
    nome: string;
    cpf: string;
    estado: string;
    cidade: string;
    rua: string;
    bairro: string;
    cep: string;
    numero_endereco: string;
    email: string;
    senha: string;
    data: any;
}
export declare class LoginDto {
    email: string;
    senha: string;
    [0]: any;
    body: any;
}
export declare class CadastroGoogleDto {
    name: string;
    email: string;
    googleId: string;
    profileObj: any;
    response: any;
}
export declare class DadosRestantesGoogleDto {
    cpf: string;
    estado: string;
    cidade: string;
    rua: string;
    bairro: string;
    cep: string;
    numero: string;
    data: any;
}
export declare class LoginGoogleDto {
    body: any;
    profileObj: any;
    googleId: string;
}
