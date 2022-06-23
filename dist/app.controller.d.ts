import { AuthService } from './auth/auth.service';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto, LoginDto } from './users/Users';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDto): Promise<{
        access_token: string;
    }>;
    loginGoogle(body: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    adicionar(body: CadastroDto): Promise<void>;
    cadastroGoogle(body: CadastroGoogleDto): Promise<void>;
    cadastroDadosRestantesGoogle(data: DadosRestantesGoogleDto): Promise<void>;
    NomeUser(data: any): Promise<void>;
}
