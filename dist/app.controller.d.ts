import { AuthService } from './auth/auth.service';
import { CadastroDto, CadastroGoogleDto, DadosRestantesGoogleDto } from './users/Users';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(body: any): Promise<any>;
    loginGoogle(body: any): Promise<any>;
    getProfile(req: any): any;
    adicionar(body: CadastroDto): Promise<void>;
    cadastroGoogle(body: CadastroGoogleDto): Promise<void>;
    cadastroDadosRestantesGoogle(data: DadosRestantesGoogleDto): Promise<void>;
    NomeUser(data: any): Promise<void>;
}
