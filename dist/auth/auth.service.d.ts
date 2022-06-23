import { JwtService } from '@nestjs/jwt';
import { CriptoService } from 'src/cripto/cripto.service';
import { DatabaseService } from 'src/database/api-database.service copy';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto, LoginDto, LoginGoogleDto } from 'src/users/Users';
export declare class AuthService {
    private DatabaseService;
    private readonly cripto;
    private jwtService;
    constructor(DatabaseService: DatabaseService, cripto: CriptoService, jwtService: JwtService);
    validateUser(body: LoginDto): Promise<any>;
    LoginGoogle(body: LoginGoogleDto): Promise<any>;
    cadastrar(body: CadastroDto): Promise<void>;
    CadastroGoogle(body: CadastroGoogleDto): Promise<void>;
    CadastroDadosRestantesGoogle(data: DadosRestantesGoogleDto): Promise<void>;
    NomeUser(data: any): Promise<void>;
}
