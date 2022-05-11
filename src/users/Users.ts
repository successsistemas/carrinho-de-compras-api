/* eslint-disable prettier/prettier */
export class UsersDto {
  
  email: string;
  senha: string;
}

export class CadastroDto {
  nome: string;
  cpf: string;
  estado: string;
  cidade: string;
  rua: string;
  bairro: string;
  cep:string;
  numero_endereco: string;
  email: string;
  senha: string;
  data: any;
}

export class LoginDto {
  email: string;
  senha: string;
  [0]: any
  body: any
}

export class CadastroGoogleDto {
  name: string;
  email: string;
  googleId: string;
  profileObj: any;
  response: any;
}

export class DadosRestantesGoogleDto {
  cpf: string;
  estado: string;
  cidade: string;
  rua: string;
  bairro: string;
  cep: string;
  numero: string;
  data: any
}

export class LoginGoogleDto {
  body: any;
  profileObj: any;
  googleId: string
}
