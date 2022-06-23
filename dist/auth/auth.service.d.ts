import { JwtService } from '@nestjs/jwt';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseService } from 'src/database/api-database.service copy';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto, LoginDto, LoginGoogleDto } from 'src/users/Users';
export declare class AuthService {
    private DatabaseService;
    private readonly cripto;
    private jwtService;
    constructor(DatabaseService: DatabaseService, cripto: CriptoService, jwtService: JwtService);
    login(body: LoginDto): Promise<any>;
    validateuser(body: LoginDto): Promise<{
        access_token: string;
    }>;
    loginGoogle(body: LoginGoogleDto): Promise<{
        access_token: string;
    }>;
    cadastrar(body: CadastroDto): Promise<void>;
    cadastroGoogle(body: CadastroGoogleDto): Promise<void>;
    cadastroDadosRestantesGoogle(data: DadosRestantesGoogleDto): Promise<void>;
    nomeUser(data: any): Promise<void>;
}
