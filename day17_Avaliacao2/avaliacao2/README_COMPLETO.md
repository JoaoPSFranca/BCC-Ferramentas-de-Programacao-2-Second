# Guia Completo: Criando um Projeto Angular do Zero

## Apêndice: Comandos Rápidos

```bash
# Instalação da CLI Angular
npm install -g @angular/cli

# Criar novo projeto
ng new <nome-projeto> --skip-tests --skip-git

# Criar componente
ng g c componentes/<nome-componente> --skip-tests

# Criar serviço
ng g s services/<nome-servico> --skip-tests

# Criar interceptador
ng g interceptor interceptors/<nome-interceptor> --skip-tests

# Criar guard
ng g guard guards/<nome-guard> --skip-tests

# Iniciar servidor de desenvolvimento
ng serve

# Instalar dependências
npm install
npm i
```

### Comandos para Gerar o Primeng

```bash 
# Crie o projeto como SCSS
# Passo 1: Instalar dependências (linha a linha)
npm install primeng
npm install @primeng/themes @primeuix/themes
npm install primeicons
npm install @tailwindcss/postcss tailwindcss tailwindcss-primeui

# Passo 2: Criar modelos
ng g i models/venda.model
ng g i models/item-venda.model

# Passo 3: Criar serviço
ng g s services/venda.service --skip-tests

# Passo 4: Criar componente menu
ng g c componentes/menu --skip-tests

# Passo 5: Criar página de listagem
ng g c pages/venda-list --skip-tests

# Passo 6: Adicione um arquivo vendas.json manualmente 
# (Contém users e vendas, localizado em src/vendas.json)

# Passo 7: Instalar json-server com autenticação (versões específicas)
npm install -D json-server@0.17.4 json-server-auth@1.2.1

# Passo 8: Executar json-server
npx json-server src/vendas.json -m ./node_modules/json-server-auth

# Passo 9: Executar aplicação (em outro terminal)
ng serve
```

---

## Índice

1. [Estrutura Base do Projeto](#estrutura-base-do-projeto)
2. [Instalação e Configuração Inicial](#instalação-e-configuração-inicial)
3. [Componentes](#componentes)
4. [Serviços e Injeção de Dependência](#serviços-e-injeção-de-dependência)
5. [Rotas e Lazy Loading](#rotas-e-lazy-loading)
6. [Formulários](#formulários)
7. [Signals e Reatividade](#signals-e-reatividade)
8. [Guards e Autenticação](#guards-e-autenticação)
9. [HTTP Client e Interceptadores](#http-client-e-interceptadores)
10. [PrimeNG e Estilo](#primeng-e-estilo)
11. [Exemplos Adicionais](#exemplos-adicionais)
12. [Passo a Passo: Recriando o Projeto Primeng (Listagem, CRUD e Estrutura Base)](#passo-a-passo-recriando-o-projeto-primeng-listagem-crud-e-estrutura-base)

---

## Estrutura Base do Projeto

A estrutura recomendada segue o padrão de organização por funcionalidade:

```
src/
├── app/
│   ├── components/        # Componentes reutilizáveis
│   │   └── menu/
│   ├── pages/              # Componentes de página (rotas)
│   │   └── home/
│   ├── services/           # Serviços (lógica de negócio)
│   │   └── user.service.ts
│   ├── interceptors/       # Interceptadores HTTP
│   │   └── auth.interceptor.ts
│   ├── models/            # Interfaces e Classes
│   │   └── user.model.ts
│   ├── app.ts              # Componente raiz
│   ├── app.routes.ts       # Definição de rotas
│   ├── app.config.ts       # Configuração da aplicação
│   ├── app.html            # Template raiz
│   └── app.scss            # Estilos globais
├── environments/           # Configurações por ambiente
│   ├── environment.development.ts
│   └── environment.ts
├── main.ts                 # Ponto de entrada
├── index.html              # HTML principal
└── styles.scss             # Estilos globais
```

---

## Instalação e Configuração Inicial

### Passo 1: Criar um Novo Projeto

```bash
# Selecione SCSS no estilo
ng new meu-projeto --skip-git --skip-tests
cd meu-projeto
```

### Passo 2: Instalar Dependências Principais

```bash
# PrimeNG e dependências
npm install primeng @primeng/themes @primeuix/themes primeicons

# TailwindCSS
npm install -D tailwindcss postcss autoprefixer
npm install @tailwindcss/postcss tailwindcss-primeui

# RxJS (já incluso, mas confirme a versão)
npm install rxjs
```

### Passo 3: Configurar TailwindCSS

Crie o arquivo `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/@primeng/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  important: true,
};
```

Crie `.postcssrc.json`:

```json
{
  "plugins": {
    "tailwindcss": {},
    "autoprefixer": {}
  }
}
```

### Passo 4: Configurar styles.scss

Adicione ao início de `src/styles.scss`:

```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Bootstrap da Aplicação

Arquivo `src/main.ts`:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

---

## Componentes

### Criar um Componente

Comando para gerar:

```bash
ng g c componentes/botao --skip-tests
```

Arquivo `componentes/botao/botao.ts`:

```typescript
import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-botao',
  standalone: true,
  imports: [],
  templateUrl: './botao.html',
  styleUrl: './botao.scss'
})
export class BotaoComponent {
  // @Input clássico
  @Input() titulo: string = 'Clique aqui';
  
  // Input moderno (signal - recomendado)
  public corFundo = input('blue');
}
```

Arquivo `componentes/botao/botao.html`:

```html
<button [style.background-color]="corFundo()">
  {{ titulo }}
</button>
```

### Usar o Componente em Outro

```typescript
import { Component } from '@angular/core';
import { BotaoComponent } from './componentes/botao/botao';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BotaoComponent],
  templateUrl: './app.html'
})
export class App {}
```

Template `app.html`:

```html
<app-botao titulo="Enviar" [corFundo]="'green'"></app-botao>
```

---

## Serviços e Injeção de Dependência

### Criar um Serviço

Comando:

```bash
ng g s services/usuario --skip-tests
```

Arquivo `services/usuario.service.ts`:

```typescript
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.api}/usuarios`;

  public obterTodos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  public obterPorId(id: number) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  public criar(usuario: any) {
    return this.http.post<any>(this.apiUrl, usuario);
  }

  public atualizar(id: number, usuario: any) {
    return this.http.put<any>(`${this.apiUrl}/${id}`, usuario);
  }

  public deletar(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
```

### Injetar em um Componente

```typescript
import { Component, inject } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  templateUrl: './usuarios.html'
})
export class UsuariosComponent {
  private usuarioService = inject(UsuarioService);

  constructor() {
    this.usuarioService.obterTodos().subscribe(
      (dados) => console.log(dados)
    );
  }
}
```

---

## Rotas e Lazy Loading

### Definir Rotas

Arquivo `app.routes.ts`:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.HomePage),
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios-list').then(m => m.UsuariosListPage),
  },
  {
    path: 'usuario/:id',
    loadComponent: () => import('./pages/usuario/usuario-detail').then(m => m.UsuarioDetailPage),
  },
];
```

### Usar Rotas no Template

```html
<a routerLink="/home">Home</a>
<a routerLink="/usuarios">Usuários</a>
<a [routerLink]="['/usuario', usuario.id]">Detalhes</a>
```

### Navegar pelo código

```typescript
import { Router } from '@angular/router';

export class MyComponent {
  private router = inject(Router);

  irParaHome() {
    this.router.navigate(['/home']);
  }

  irParaUsuario(id: number) {
    this.router.navigate(['/usuario', id]);
  }

  irComQueryParams() {
    this.router.navigate(['/usuarios'], {
      queryParams: { page: 1, filtro: 'ativo' }
    });
  }

  irComState() {
    const dados = { nome: 'João' };
    this.router.navigate(['/usuario-detail'], { state: dados });
  }
}
```

### Receber Parâmetros

```typescript
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usuario-detail',
  standalone: true,
  templateUrl: './usuario-detail.html'
})
export class UsuarioDetailPage {
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit() {
    // Route parameter (/usuario/123)
    const id = this.route.snapshot.params['id'];
    console.log('ID:', id);

    // Query parameter (?page=1&filtro=ativo)
    const page = this.route.snapshot.queryParamMap.get('page');
    const filtro = this.route.snapshot.queryParams['filtro'];
    console.log('Page:', page, 'Filtro:', filtro);

    // Dynamic state
    const estado = this.router.getCurrentNavigation()?.extras.state;
    console.log('Estado:', estado);
  }
}
```

---

## Formulários

### Template-driven Forms

Para formulários simples e rápidos.

Comando:

```bash
ng g c componentes/template-form --skip-tests
```

Arquivo `componentes/template-form/template-form.html`:

```html
<form #form="ngForm" (ngSubmit)="salvar(form)">
  <div>
    <label>Nome:</label>
    <input 
      type="text" 
      [(ngModel)]="usuario.nome" 
      name="nome" 
      #nomeInput="ngModel"
      required 
      minlength="3"
    />
    @if (nomeInput.errors?.['required'] && nomeInput.touched) {
      <p class="error">Nome é obrigatório</p>
    }
    @if (nomeInput.errors?.['minlength'] && nomeInput.touched) {
      <p class="error">Mínimo 3 caracteres</p>
    }
  </div>

  <div>
    <label>Email:</label>
    <input 
      type="email" 
      [(ngModel)]="usuario.email" 
      name="email" 
      #emailInput="ngModel"
      required
    />
    @if (emailInput.errors?.['required'] && emailInput.touched) {
      <p class="error">Email é obrigatório</p>
    }
  </div>

  <button type="submit" [disabled]="form.invalid">Salvar</button>
</form>
```

Arquivo `componentes/template-form/template-form.ts`:

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-template-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './template-form.html',
  styleUrl: './template-form.scss'
})
export class TemplateFormComponent {
  private usuarioService = inject(UsuarioService);

  protected usuario = { nome: '', email: '' };

  protected salvar(form: NgForm) {
    if (form.invalid) return;

    this.usuarioService.criar(this.usuario).subscribe(() => {
      console.log('Usuário criado!');
      form.reset();
    });
  }
}
```

### Reactive Forms

Para formulários complexos com validações customizadas.

Comando:

```bash
ng g c componentes/reactive-form --skip-tests
```

Arquivo `componentes/reactive-form/reactive-form.ts`:

```typescript
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.html',
  styleUrl: './reactive-form.scss'
})
export class ReactiveFormComponent {
  private fb = inject(FormBuilder);

  protected form = this.fb.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected salvar() {
    if (this.form.invalid) return;

    console.log(this.form.value);
    this.form.reset();
  }

  protected preencherFormulario() {
    this.form.patchValue({
      nome: 'João Silva',
      email: 'joao@example.com'
    });
  }
}
```

Arquivo `componentes/reactive-form/reactive-form.html`:

```html
<form [formGroup]="form" (ngSubmit)="salvar()">
  <div>
    <label>Nome:</label>
    <input formControlName="nome" type="text" />
    @if (form.get('nome')?.errors?.['required']) {
      <p class="error">Nome é obrigatório</p>
    }
  </div>

  <div>
    <label>Email:</label>
    <input formControlName="email" type="email" />
    @if (form.get('email')?.errors?.['email']) {
      <p class="error">Email inválido</p>
    }
  </div>

  <div>
    <label>Senha:</label>
    <input formControlName="senha" type="password" />
  </div>

  <button type="submit" [disabled]="form.invalid">Salvar</button>
</form>
```

---

## Signals e Reatividade

### Criando Signals

```typescript
import { Component, signal, computed, effect, Injector, inject } from '@angular/core';

@Component({
  selector: 'app-signals',
  standalone: true,
  templateUrl: './signals.html'
})
export class SignalsComponent {
  // Signal simples
  protected contador = signal(0);

  // Signal com objeto
  protected usuario = signal({
    nome: 'João',
    email: 'joao@example.com'
  });

  // Computed (derivado de outro signal)
  protected contadorDobrado = computed(() => this.contador() * 2);

  // Effect (reação a mudanças)
  constructor() {
    effect(() => {
      console.log(`Contador mudou para: ${this.contador()}`);
    });
  }

  // Métodos para atualizar
  protected incrementar() {
    this.contador.update(v => v + 1);
  }

  protected atualizar() {
    this.contador.set(10);
  }

  protected mudarUsuario() {
    this.usuario.update(u => ({
      ...u,
      nome: 'Maria'
    }));
  }
}
```

### Usando no Template

```html
<p>Contador: {{ contador() }}</p>
<p>Dobrado: {{ contadorDobrado() }}</p>
<p>Usuário: {{ usuario().nome }}</p>

<button (click)="incrementar()">Incrementar</button>
```

---

## Guards e Autenticação

### Criar um Guard

Comando:

```bash
ng g guard guards/auth --skip-tests
```

Arquivo `guards/auth.guard.ts`:

```typescript
import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, GuardResult, MaybeAsync } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {
    if (this.usuarioService.isLogged()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
```

### Usar Guard nas Rotas

```typescript
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.LoginPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.DashboardPage),
    canActivate: [AuthGuard]
  }
];
```

### Serviço de Autenticação

Arquivo `services/usuario.service.ts` (adicionar ao existente):

```typescript
@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private http = inject(HttpClient);
  private logged = false;
  private token: string | null = null;

  public async login(email: string, password: string) {
    const response = await firstValueFrom(
      this.http.post<any>(`${environment.api}/login`, { email, password })
    );

    if (response && response.accessToken) {
      this.token = response.accessToken;
      localStorage.setItem('token', this.token);
      this.logged = true;
    }
  }

  public logout() {
    this.token = null;
    this.logged = false;
    localStorage.removeItem('token');
  }

  public isLogged(): boolean {
    return this.logged || !!localStorage.getItem('token');
  }

  public getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }
}
```

---

## HTTP Client e Interceptadores

### Interceptador de Autenticação

Comando:

```bash
ng g interceptor interceptors/auth --skip-tests
```

Arquivo `interceptors/auth.interceptor.ts`:

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const usuarioService = inject(UsuarioService);
  const token = usuarioService.getToken();

  if (token) {
    const novaRequisicao = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(novaRequisicao);
  }

  return next(req);
};
```

### Registrar Interceptador

Arquivo `app.config.ts` (atualizado):

```typescript
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
  ],
};
```

### Usar HttpClient com Observables

```typescript
import { firstValueFrom } from 'rxjs';
import { take } from 'rxjs/operators';

export class MinhaComponent {
  private http = inject(HttpClient);

  // Com Observable
  obterDados() {
    this.http.get('/api/dados').pipe(take(1)).subscribe({
      next: (dados) => console.log(dados),
      error: (erro) => console.error(erro)
    });
  }

  // Com async/await
  async buscarDados() {
    try {
      const dados = await firstValueFrom(this.http.get('/api/dados'));
      console.log(dados);
    } catch (erro) {
      console.error(erro);
    }
  }
}
```

---

## PrimeNG e Estilo

### Configurar PrimeNG no app.config.ts

```typescript
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch()),
  ],
};
```

### Usar Componentes PrimeNG

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule, CardModule, TableModule],
  templateUrl: './dashboard.html'
})
export class DashboardComponent {}
```

Template:

```html
<p-card title="Dashboard">
  <p-button label="Novo" icon="pi pi-plus"></p-button>

  <p-table [value]="dados">
    <p-column field="nome" header="Nome"></p-column>
    <p-column field="email" header="Email"></p-column>
  </p-table>
</p-card>
```

### Estilos com TailwindCSS

```html
<div class="flex gap-4 p-8 bg-blue-50 rounded-lg shadow">
  <h1 class="text-2xl font-bold text-blue-900">Bem-vindo!</h1>
  <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
    Clique aqui
  </button>
</div>
```

---

## Configuração do Arquivo de Ambiente

Arquivo `src/environments/environment.development.ts`:

```typescript
export const environment = {
  api: 'http://localhost:3000',
  production: false
};
```

Arquivo `src/environments/environment.ts`:

```typescript
export const environment = {
  api: 'https://api.seu-dominio.com',
  production: true
};
```

### Usar em um Serviço

```typescript
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class DadosService {
  private apiUrl = `${environment.api}/dados`;
  
  constructor(private http: HttpClient) {}
}
```

---

## JSON Server (Desenvolvimento)

Para simular uma API durante o desenvolvimento.

### Instalação

```bash
npm install -D json-server@0.17.4 json-server-auth@1.2.1
```

### Criar arquivo vendas.json

```json
{
  "users": [
    {
      "email": "teste@example.com",
      "password": "$2a$10$...",
      "id": 1
    }
  ],
  "vendas": [
    {
      "codigo": 1,
      "data": "2026-01-02",
      "cliente": "Cliente Exemplo",
      "itens": [
        {
          "codigo_produto": 1,
          "nome_produto": "Produto",
          "preco": 100.00,
          "quantidade": 1
        }
      ]
    }
  ]
}
```

### Executar

```bash
npx json-server src/vendas.json -m ./node_modules/json-server-auth
```

A API rodará em `http://localhost:3000`

---

## Rodando a Aplicação

### Desenvolvimento

```bash
ng serve
```

Acesse em `http://localhost:4200`

### Build para Produção

```bash
ng build --configuration production
```

---

## Exemplos Adicionais

### Componente com Menu PrimeNG

Arquivo `componentes/menu/menu.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './menu.html',
})
export class Menu implements OnInit {
  protected items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: ['/']
      },
      {
        label: 'Usuários',
        icon: 'pi pi-users',
        routerLink: ['/usuarios']
      },
      {
        label: 'Configurações',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-user'
          },
          {
            label: 'Sair',
            icon: 'pi pi-sign-out'
          }
        ]
      }
    ];
  }
}
```

Arquivo `componentes/menu/menu.html`:

```html
<p-menubar [model]="items"></p-menubar>
```

### Usar Menu no Componente Raiz

Arquivo `app.ts`:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './componentes/menu/menu';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Menu],
  templateUrl: './app.html'
})
export class App {}
```

Arquivo `app.html`:

```html
<app-menu></app-menu>
<router-outlet></router-outlet>
```

### Exemplo com Effect e Cleanup

```typescript
import { Component, inject, Injector, OnInit, signal, effect } from '@angular/core';

@Component({
  selector: 'app-exemplo',
  standalone: true,
  template: '<p>{{ contador() }}</p>'
})
export class ExemploComponent implements OnInit {
  protected contador = signal(0);
  private injector = inject(Injector);

  ngOnInit() {
    effect(
      () => {
        console.log(`Contador: ${this.contador()}`);
      },
      { injector: this.injector }
    );
  }
}
```

### Exemplo com Input Moderno

Componente filho:

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div>
      <h2>{{ titulo() }}</h2>
      <p>{{ descricao() }}</p>
      <button (click)="clicado.emit()">Clique</button>
    </div>
  `
})
export class CardComponent {
  titulo = input('');
  descricao = input('');
  clicado = output();
}
```

Componente pai:

```typescript
<app-card 
  [titulo]="Meu Título" 
  [descricao]="Descrição aqui"
  (clicado)="aoClicar()"
></app-card>
```

### Validação Customizada em Reactive Form

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmarSenha(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const senha = group.get('senha')?.value;
    const confirmar = group.get('confirmar')?.value;

    if (!senha || !confirmar) return null;
    
    return senha === confirmar ? null : { senhasNaoConfirmam: true };
  };
}

// Usar no FormGroup
protected form = this.fb.group({
  senha: ['', [Validators.required, Validators.minLength(6)]],
  confirmar: ['', [Validators.required]]
}, { validators: [confirmarSenha()] });
```

### Tratar Erros HTTP

```typescript
import { HttpErrorResponse } from '@angular/common/http';

private carregarDados() {
  this.service.obterDados().subscribe({
    next: (dados) => {
      console.log('Sucesso:', dados);
    },
    error: (erro: HttpErrorResponse) => {
      if (erro.status === 401) {
        console.error('Não autorizado');
        this.router.navigate(['/login']);
      } else if (erro.status === 404) {
        console.error('Recurso não encontrado');
      } else if (erro.status === 500) {
        console.error('Erro no servidor');
      } else {
        console.error('Erro:', erro.message);
      }
    },
    complete: () => {
      console.log('Requisição completa');
    }
  });
}
```

### Usar queryParams no Navigate

```typescript
protected buscar(termo: string) {
  this.router.navigate(['/usuarios'], {
    queryParams: {
      busca: termo,
      pagina: 1,
      limite: 10
    }
  });
}

// Na página receptora
protected ngOnInit() {
  const busca = this.route.snapshot.queryParamMap.get('busca');
  const pagina = this.route.snapshot.queryParamMap.get('pagina');
  
  console.log('Busca:', busca, 'Página:', pagina);
}
```

---

## Passo a Passo: Recriando o Projeto Primeng (Listagem, CRUD e Estrutura Base)

Nesta seção, vamos recriar do zero o projeto `primeng` que utiliza PrimeNG com uma estrutura completa de listagem de vendas, componentes reutilizáveis, serviços com HttpClient e integração com json-server.

### Requisitos Iniciais

Certifique-se de ter instalado:
- **Node.js** (versão 18.x ou superior)
- **npm** (versão 10.x ou superior)
- **Angular CLI** versão 21.2.2
- **json-server** para simular API (opcional)

### Passo 0: Criar Novo Projeto Angular

Você pode criar um novo projeto Angular de duas formas:

**Opção 1: Com flags (mais rápido)**

```bash
ng new primeng --routing --style=scss --skip-git
cd primeng
```

**Opção 2: Interativo (recomendado para aprender)**

```bash
ng new primeng
cd primeng
```

Quando executar o comando interativo, você será perguntado:

```
✔ Which routing would you like to add? (Use arrow keys)
  None
❯ Yes (recomendado - escolha esta)

✔ Which stylesheet format would you like to use? (Use arrow keys)
  CSS
  SCSS (recomendado - escolha esta)
  SASS
  LESS
```

**Por que:** Este comando cria a estrutura base do Angular com roteamento habilitado e SCSS como pré-processador de CSS. SCSS é mais poderoso que CSS padrão, permitindo variáveis, mixins e aninhamento.

---

### Passo 1: Instalar Dependências Principais

Instale cada pacote em uma linha separada para evitar confusões:

```bash
npm install primeng
```

```bash
npm install @primeng/themes @primeuix/themes
```

```bash
npm install primeicons
```

```bash
npm install @tailwindcss/postcss tailwindcss tailwindcss-primeui
```

**Explicação:**
- **primeng**: Biblioteca de componentes UI prontos
- **@primeng/themes e @primeuix/themes**: Temas modernos (Aura, Lara, etc.)
- **primeicons**: Ícones utilizados nos componentes PrimeNG
- **tailwindcss**: Framework CSS utilitário para estilos rápidos
- **@tailwindcss/postcss**: PostCSS plugin para TailwindCSS v4
- **tailwindcss-primeui**: Plugin que integra TailwindCSS com PrimeNG

---

### Passo 2: Configurar PostCSS

Crie o arquivo `.postcssrc.json` na raiz do projeto:

```bash
# Comando (não necessário se criar manualmente)
# Apenas crie o arquivo abaixo
```

Arquivo: `.postcssrc.json`

```json
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```

**Por que:** O PostCSS processa os estilos do TailwindCSS e os injeta no projeto. Este arquivo configuration diz ao PostCSS para usar o plugin do TailwindCSS.

---

### Passo 3: Configurar Estilos Globais (SCSS)

Edite o arquivo `src/styles.scss`:

```scss
/* You can add global styles to this file, and also import other style files */
@use "primeicons/primeicons.css";
@use "tailwindcss";
@plugin 'tailwindcss-primeui';
@layer tailwind, primeng;
```

**Explicação de cada linha:**
- `@use "primeicons/primeicons.css"`: Importa os ícones do PrimeNG
- `@use "tailwindcss"`: Importa o framework TailwindCSS
- `@plugin 'tailwindcss-primeui'`: Registra o plugin que integra TailwindCSS com PrimeNG
- `@layer tailwind, primeng`: Define a ordem das camadas de estilo para evitar conflitos

---

### Passo 4: Criar Estrutura de Pastas

O Angular cria as pastas automaticamente quando você gera componentes e serviços. Não use `mkdir`, use os comandos `ng g` que vêm a seguir.

**Por que:** Quando você usar `ng g c componentes/menu`, o Angular cria automaticamente a pasta `src/app/componentes/` se não existir. Dessa forma mantemos consistência com as convenções do Angular CLI.

---

### Passo 5: Criar Modelos (Interfaces)

Comando para gerar:

```bash
ng g i modelos/venda
ng g i modelos/item-venda
```

**Arquivo:** `src/app/modelos/venda.model.ts`

```typescript
import { ItemVenda } from './item-venda.model';

export interface Venda {
  codigo: number;
  data: string;
  cliente: string;
  itens: ItemVenda[];
}
```

**Explicação:**
- `interface Venda`: Define a estrutura de uma venda
- `codigo`: Identificador único da venda (número)
- `data`: Data da venda (string no formato ISO ou outro)
- `cliente`: Nome do cliente que fez a compra (string)
- `itens`: Array de itens vendidos (referencia a ItemVenda)

**Arquivo:** `src/app/modelos/item-venda.model.ts`

```typescript
export interface ItemVenda {
  codigo_produto: number;
  nome_produto: string;
  preco: number;
  quantidade: number;
}
```

**Explicação:**
- `interface ItemVenda`: Define a estrutura de cada produto vendido
- `codigo_produto`: Identificador único do produto (número)
- `nome_produto`: Nome do produto (string)
- `preco`: Preço unitário (number)
- `quantidade`: Quantidade vendida (number)

---

### Passo 6: Configurar Ambientes

Os arquivos de environment já foram criados pelo `ng new`, mas você pode regenerá-los com:

```bash
ng g environments
```

Edite `src/environments/environment.development.ts`:

```typescript
export const environment = {
  api: 'http://localhost:3000',
};
```

**Por que:** Define a URL da API para o ambiente de desenvolvimento. Quando usar json-server, ele roda na porta 3000.

Edite `src/environments/environment.ts` (deixar totalmente vazio por instrução):

```typescript
export const environment = {};
```

**Observação:** Seguindo as instruções do professor, o arquivo `environment.ts` não deve conter configurações. Em um projeto real, você colocaria a URL da API de produção aqui, mas neste momento mantemos vazio.

---

### Passo 7: Criar Serviço de Vendas

Comando para gerar:

```bash
ng g s services/venda --skip-tests
```

**Arquivo:** `src/app/services/venda.service.ts`

```typescript
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Venda } from '../modelos/venda.model';

@Injectable({
  providedIn: 'root',
})
export class VendaService {
  private url = `${environment.api}/vendas`;
  private http = inject(HttpClient);

  public obterTodas() {
    return this.http.get<Venda[]>(`${this.url}`);
  }

  public obterPorId(id: number) {
    return this.http.get<Venda>(`${this.url}/${id}`);
  }

  public criar(venda: Venda) {
    return this.http.post<Venda>(`${this.url}`, venda);
  }

  public atualizar(id: number, venda: Venda) {
    return this.http.put<Venda>(`${this.url}/${id}`, venda);
  }

  public remover(id: number) {
    return this.http.delete<Venda>(`${this.url}/${id}`);
  }
}
```

**Explicação:**
- `@Injectable({ providedIn: 'root' })`: Torna o serviço injetável globalmente
- `private http = inject(HttpClient)`: Injeta o cliente HTTP para fazer requisições
- `private url`: URL base da API de vendas
- `obterTodas()`: Busca todas as vendas via GET
- `obterPorId()`: Busca uma venda específica
- `criar()`: Cria uma nova venda via POST
- `atualizar()`: Atualiza uma venda existente via PUT
- `remover()`: Remove uma venda via DELETE

---

### Passo 8: Criar Componente Menu

Comando para gerar:

```bash
ng g c componentes/menu --skip-tests
```

**Arquivo:** `src/app/componentes/menu/menu.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, AvatarModule, BadgeModule, MenubarModule, InputTextModule, RippleModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  protected items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => {
          console.log("Clicou no Home.");
        }
      },
      {
        label: 'Features',
        icon: 'pi pi-star',
      },
      {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
          {
            label: 'Components',
            icon: 'pi pi-bolt',
          },
          {
            label: 'Blocks',
            icon: 'pi pi-server',
          },
          {
            label: 'UI Kit',
            icon: 'pi pi-pencil',
          },
          {
            label: 'Templates',
            icon: 'pi pi-palette',
          },
        ],
      },
    ];
  }
}
```

**Explicação:**
- `implements OnInit`: Implementa a interface para usar ngOnInit
- `MenuItem[] | undefined`: Array de itens do menu (pode ser indefinido inicialmente)
- `ngOnInit()`: Método executado quando o componente é inicializado
- `items`: Array de objetos MenuItem que define a estrutura do menu
- `command`: Callback que executa quando o item é clicado
- Módulos importados: AvatarModule (avatar), MenubarModule (barra de menu), BadgeModule (badges), InputTextModule (input), RippleModule (efeito ripple)

**Arquivo:** `src/app/componentes/menu/menu.html`

```html
<p-menubar [model]="items" breakpoint="810px">
  <ng-template #start>
    Logo da Empresa
  </ng-template>

  <ng-template #end>
    <div class="flex items-center gap-2">
      <input type="text" pInputText placeholder="Search" class="w-36" />
      <p-avatar
        image="https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  </ng-template>
</p-menubar>
```

**Explicação:**
- `<p-menubar>`: Componente PrimeNG de barra de menu
- `[model]="items"`: Vincula os itens do menu
- `breakpoint="810px"`: Define o ponto de ruptura para menu responsivo
- `<ng-template #start>`: Template para o lado esquerdo (logo)
- `<ng-template #end>`: Template para o lado direito (search + avatar)
- `pInputText`: Diretiva PrimeNG para input com estilo
- `<p-avatar>`: Avatar com imagem em forma circular
- Classes `flex`, `items-center`, `gap-2`, `w-36`: Classes TailwindCSS para layout

**Arquivo:** `src/app/componentes/menu/menu.scss` (deixar vazio ou adicionar estilos específicos)

```scss
// Estilos específicos do menu (se necessário)
```

---

### Passo 9: Criar Página de Listagem de Vendas

Comando para gerar:

```bash
ng g c pages/venda-list --skip-tests
```

**Arquivo:** `src/app/pages/venda-list/venda-list.ts`

```typescript
import { Component, inject } from '@angular/core';
import { VendaService } from '../../services/venda.service';
import { Venda } from '../../modelos/venda.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TableModule } from 'primeng/table';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-venda-list',
  imports: [AsyncPipe, TableModule, IconField, InputIcon, InputText, Button, FormsModule],
  templateUrl: './venda-list.html',
  styleUrl: './venda-list.scss',
})
export class VendaList {
  private vendasService = inject(VendaService);
  protected vendas$: Observable<Venda[] | null> = this.vendasService.obterTodas();
  protected selecionado!: Venda;
  protected botaoAtivo: boolean = false;
  protected expandedRows: any = {};
  protected expanderDisabledRows: any = [];

  ativarBotao() {
    this.botaoAtivo = true;
  }

  desativarBotao() {
    this.botaoAtivo = false;
  }

  onRowExpand(event: any) {
    console.log('Linha expandida:', event.data);
  }

  onRowCollapse(event: any) {
    console.log('Linha recolhida:', event.data);
  }

  onExcluir(venda: Venda) {
    this.vendasService.remover(venda.codigo).subscribe({
      next: () => {
        this.vendas$ = this.vendasService.obterTodas();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
```

**Explicação:**
- `private vendasService = inject(VendaService)`: Injeta o serviço de vendas
- `vendas$: Observable`: Observable que contém as vendas (o $ por convenção indica Observable)
- `selecionado`: Armazena a venda selecionada na tabela
- `botaoAtivo`: Flag para ativar/desativar botões (ex: botão de exclusão só ativa se houver seleção)
- `ativarBotao()`: Ativa o botão quando uma linha é selecionada
- `desativarBotao()`: Desativa quando deseleciona
- `onExcluir()`: Deleta a venda e recarrega a lista
- `subscribe()`: Escuta o Observable retornado pela requisição DELETE

**Arquivo:** `src/app/pages/venda-list/venda-list.html`

**Exemplo do Cesar, com item venda expandido em sub-tabela**
```html
<div class="card">
  <p-table #dt2 [value]="(vendas$ | async)!"
           [paginator]="true" [rows]="3"
           [tableStyle]="{ 'min-width': '50rem' }"
           [showCurrentPageReport]="true"
           currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} entradas"
           sortMode="multiple"
           [multiSortMeta]="[{field:'id', order:1}]"
           [globalFilterFields] = "['cliente', 'id', 'data', 'itens']"
           selectionMode="single"
           [(selection)]="selecionado"
           [metaKeySelection]="true"
           dataKey="id"
           stripedRows
           (onRowSelect)="ativarBotao()"
           (onRowUnselect)="desativarBotao()"
  >
    <ng-template #caption>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold">Lista de vendas</span>
        <p-icon-field>
          <p-inputicon>
            <i class="pi pi-search"></i>
          </p-inputicon>
          <input pInputText type="text"
                 (input)="dt2.filterGlobal($event.target?.value ?? '', 'contains')"
                 placeholder="Pesquisa">
        </p-icon-field>

      </div>

    </ng-template>

    <ng-template #header>
      <tr>
        <th pSortableColumn="id">
          Código
          <p-sortIcon field="id"/>
        </th>
        <th pSortableColumn="cliente">
          Cliente
          <p-sortIcon field="cliente"/>
        </th>
        <th pSortableColumn="data">
          Data
          <p-sortIcon field="data"/>
        </th>
        <th pSortableColumn="itens">
          Itens
          <p-sortIcon field="itens"/>
        </th>
      </tr>
      <tr>
        <th><p-columnFilter type="text"
                            field="id"
                            placeholder="Buscar código"
                            filterOn="input">
        </p-columnFilter></th>
        <th><p-columnFilter type="text" field="cliente"
                            placeholder="Buscar cliente"
                            filterOn="input">
        </p-columnFilter></th>
        <th><p-columnFilter type="date"
                            field="data"
                            placeholder="Selecione a data"
                            dateFormat="yy-mm-dd"
                            filterOn="input"
        >
        </p-columnFilter></th>
        <th></th>
      </tr>
    </ng-template>
    <ng-template #body let-venda>
      <tr [pSelectableRow]="venda">
        <td>{{ venda.id }}</td>
        <td>{{ venda.cliente }}</td>
        <td>{{ venda.data }}</td>
        <td>
          <p-table [value]="venda.itens" [tableStyle]="{ 'width': '100%' }">
            <ng-template #header>
              <tr>
                <th pSortableColumn="produto">
                  Produto
                  <p-sortIcon field="produto"/>
                </th>
                <th pSortableColumn="quantidade">
                  Quantidade
                  <p-sortIcon field="quantidade"/>
                </th>
                <th pSortableColumn="preco">
                  Preço
                  <p-sortIcon field="preco"/>
                </th>
              </tr>
            </ng-template>
            <ng-template #body let-item>
              <tr>
                <td>{{ item.nome_produto }}</td>
                <td>{{ item.quantidade }}</td>
                <td>{{ item.preco }}</td>
              </tr>
            </ng-template>
          </p-table>
        </td>
      </tr>
    </ng-template>
  </p-table>
</div>

<p-button [disabled]="!botaoAtivo"
          (onClick)="onExcluir(selecionado)"> Excluir </p-button>
```



**Com coluna com icone para remover**
```html
<div class="card">
  <p-table
    #dt2 
    [value]="(vendas$ | async)!"
    [paginator]="true" 
    [rows]="3"
    [tableStyle]="{ 'min-width': '50rem' }"
    [showCurrentPageReport]="true"
    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} entradas"
    sortMode="multiple"
    [multiSortMeta]="[{field:'codigo', order:1}]"
    [globalFilterFields]="['cliente', 'codigo', 'data']"
    selectionMode="single"
    [(selection)]="selecionado"
    [metaKeySelection]="true"
    dataKey="codigo"
    stripedRows
    [expandedRows]="expandedRows"
    [rowExpanderDisabledRows]="expanderDisabledRows"
    (onRowExpand)="onRowExpand($event)"
    (onRowCollapse)="onRowCollapse($event)"
    (onRowSelect)="ativarBotao()"
    (onRowUnselect)="desativarBotao()">
    
    <ng-template #caption>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold">Lista de Vendas</span>
        <p-icon-field>
          <p-inputicon>
            <i class="pi pi-search"></i>
          </p-inputicon>
          <input pInputText 
                 type="text"
                 (input)="dt2.filterGlobal($event.target?.value ?? '', 'contains')"
                 placeholder="Pesquisar...">
        </p-icon-field>
      </div>
    </ng-template>

    <ng-template #header>
      <tr>
        <th style="width: 3rem">
          <p-tableHeaderCheckbox></p-tableHeaderCheckbox>
        </th>
        <th pSortableColumn="codigo">
          Código
          <p-sortIcon field="codigo"/>
        </th>
        <th pSortableColumn="cliente">
          Cliente
          <p-sortIcon field="cliente"/>
        </th>
        <th pSortableColumn="data">
          Data
          <p-sortIcon field="data"/>
        </th>
        <th>
          Itens
        </th>
        <th>
          Ações
        </th>
      </tr>
    </ng-template>

    <ng-template #body let-venda let-expanded="expanded">
      <tr>
        <td>
          <p-tableCheckbox [value]="venda"></p-tableCheckbox>
        </td>
        <td>{{ venda.codigo }}</td>
        <td>{{ venda.cliente }}</td>
        <td>{{ venda.data }}</td>
        <td>{{ venda.itens.length }}</td>
        <td>
          <p-button 
            icon="pi pi-trash" 
            severity="danger"
            [disabled]="!botaoAtivo"
            (click)="onExcluir(venda)">
          </p-button>
        </td>
      </tr>
    </ng-template>

    <ng-template #expandedRow let-venda>
      <tr>
        <td colspan="6">
          <div class="p-4">
            <h5>Itens da Venda #{{ venda.codigo }}</h5>
            <p-table [value]="venda.itens" [tableStyle]="{ 'min-width': '50rem' }">
              <ng-template #header>
                <tr>
                  <th>Produto</th>
                  <th>Preço Unitário</th>
                  <th>Quantidade</th>
                  <th>Subtotal</th>
                </tr>
              </ng-template>
              <ng-template #body let-item>
                <tr>
                  <td>{{ item.nome_produto }}</td>
                  <td>R$ {{ item.preco | number: '1.2-2' }}</td>
                  <td>{{ item.quantidade }}</td>
                  <td>R$ {{ (item.preco * item.quantidade) | number: '1.2-2' }}</td>
                </tr>
              </ng-template>
            </p-table>
          </div>
        </td>
      </tr>
    </ng-template>
  </p-table>
</div>
```

**Explicação:**
- `<p-table>`: Componente PrimeNG para tabela avançada
- `[value]="(vendas$ | async)!"`: Vincula os dados (o pipe async se inscreve e desinscreve automaticamente)
- `[paginator]="true"`: Habilita paginação
- `[rows]="3"`: Mostra 3 linhas por página
- `sortMode="multiple"`: Permite ordenação por múltiplas colunas
- `[globalFilterFields]`: Campos disponíveis para filtro global
- `selectionMode="single"`: Permite selecionar uma linha
- `[(selection)]="selecionado"`: Two-way binding da linha selecionada
- `dataKey="codigo"`: Chave que identifica cada linha (ajustado para "codigo" conforme arquivo vendas.json)
- `stripedRows`: Alterna cores das linhas
- `[expandedRows]` e `onRowExpand`: Permite expandir linhas para ver detalhes
- `<ng-template #caption>`: Cabeçalho da tabela (título + busca)
- `<ng-template #header>`: Define as colunas principais
- `<ng-template #body>`: Define o template de cada linha
- `<ng-template #expandedRow>`: Subtabela que mostra os itens da venda quando expandida
- `pSortableColumn`: Torna a coluna ordenável
- `(input)="dt2.filterGlobal(...)"`: Aplica filtro global em tempo real
- `<p-button>`: Botão PrimeNG com ícone e evento de clique

**Arquivo:** `src/app/pages/venda-list/venda-list.scss` (deixar vazio ou adicionar estilos)

```scss
// Estilos específicos da listagem (se necessário)
```

---

### Passo 10: Configurar Rotas

Edite `src/app/app.routes.ts`:

```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'vendas',
    pathMatch: 'full',
  },
  {
    path: 'vendas',
    loadComponent: () => import("./pages/venda-list/venda-list").then(m => m.VendaList),
  }
];
```

**Explicação:**
- Rota vazia (raiz) redireciona para 'vendas'
- `pathMatch: 'full'`: Match exato (evita conflitos)
- Rota 'vendas' com lazy loading da página VendaList
- `loadComponent()`: Carrega o componente sob demanda (melhora performance)

---

### Passo 11: Configurar app.config.ts

Edite `src/app/app.config.ts`:

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withFetch())
  ],
};
```

**Explicação:**
- `providePrimeNG()`: Configura PrimeNG globalmente
- `theme: { preset: Aura }`: Define o tema visual (Aura é um tema moderno)
- `provideBrowserGlobalErrorListeners()`: Escuta erros globais do navegador
- `provideRouter(routes)`: Configura o sistema de rotas
- `provideHttpClient(withFetch())`: Habilita HttpClient usando Fetch API

---

### Passo 12: Criar Componente Raiz (App)

Edite `src/app/app.ts`:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Menu } from './componentes/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, Menu],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('primeng');
}
```

**Explicação:**
- `selector: 'app-root'`: Nome do seletor HTML
- `imports`: Módulos/componentes usados neste componente
- `RouterOutlet`: Placeholder onde as páginas das rotas serão renderizadas
- `Menu`: Componente de menu (será exibido em todas as páginas)
- `title = signal()`: Estado reativo usando Signal

**Arquivo:** `src/app/app.html`

```html
<app-menu />
<router-outlet />
```

**Explicação:**
- `<app-menu>`: Renderiza o componente de menu
- `<router-outlet>`: Renderiza o componente da rota ativa (VendaList quando ir para /vendas)

---

### Passo 13: Configurar main.ts

O arquivo `src/main.ts` já vem correto, mas confirme:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
```

**Explicação:**
- `bootstrapApplication()`: Inicializa a aplicação Angular
- Primeiro argumento: Componente raiz (App)
- Segundo argumento: Configuração da aplicação (appConfig)

---

### Passo 14: Criar Arquivo vendas.json para json-server

Na raiz do projeto, crie `src/vendas.json` com dados de exemplo:

```json
{
  "users": [
    {
      "email": "olivier@mail.com",
      "password": "$2a$10$VE6BTnOmLVKlat1v9miPbuFpKuDpY4lnhM9a92q31LPtnRtXaozsK",
      "id": 1
    }
  ],
  "vendas": [
    {
      "codigo": 1,
      "data": "2026-01-02",
      "cliente": "Igor Carvalho",
      "itens": [
        {
          "codigo_produto": 203,
          "nome_produto": "Teclado",
          "preco": 299.90,
          "quantidade": 2
        },
        {
          "codigo_produto": 206,
          "nome_produto": "Cadeira Gamer",
          "preco": 1500.00,
          "quantidade": 1
        }
      ]
    },
    {
      "codigo": 2,
      "data": "2026-01-03",
      "cliente": "Ana Souza",
      "itens": [
        {
          "codigo_produto": 202,
          "nome_produto": "Mouse",
          "preco": 89.90,
          "quantidade": 3
        },
        {
          "codigo_produto": 204,
          "nome_produto": "Monitor 24",
          "preco": 1200.00,
          "quantidade": 1
        }
      ]
    }
  ]
}
```

**Por que:** Este arquivo simula uma API RESTful completa. Quando usar json-server, ele automaticamente cria endpoints GET, POST, PUT, DELETE para vendas e users. O arquivo fica em `src/vendas.json` seguindo o padrão do professor.

---

### Passo 15: Instalar json-server com Autenticação

Instale as versões específicas do professor:

```bash
npm install -D json-server@0.17.4 json-server-auth@1.2.1
```

**Por que:** Usamos versões específicas que foram testadas durante as aulas e funcionam bem com Angular 21.

---

### Passo 16: Executar o Projeto

Abra dois terminais:

**Terminal 1 - Iniciar json-server com autenticação:**

```bash
npx json-server src/vendas.json -m ./node_modules/json-server-auth
```

A API rodará em `http://localhost:3000`

**Terminal 2 - Iniciar aplicação Angular:**

```bash
ng serve
```

Acesse em `http://localhost:4200`

---

## Seção 2: Passo a Passo - Implementando Autenticação

Agora vamos adicionar um sistema de login com proteção de rotas usando json-server-auth.

---

### Passo 17: Criar Modelo de Usuário

Comando para gerar:

```bash
ng g interface modelos/user --skip-tests
```

**Arquivo:** `src/app/modelos/user.model.ts`

```typescript
export interface User {
  email: string;
  password: string;
  id?: number;
}
```

**Explicação:**
- Interface simples que define a estrutura de um usuário
- `email`: Campo obrigatório
- `password`: Campo obrigatório
- `id?`: Campo opcional (retornado pela API após login)

---

### Passo 18: Criar Serviço de Autenticação

Comando para gerar:

```bash
ng g s services/user --skip-tests
```

**Arquivo:** `src/app/services/user.service.ts`

```typescript
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { firstValueFrom } from 'rxjs/internal/firstValueFrom';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private logged = false;
  private token: null | string = null;
  private url = `${environment.api}`;
  private http = inject(HttpClient);

  public async login(user: {email: string, password: string}) {
    this.token = null;
    try {
      const resposta = await firstValueFrom(
        this.http.post<any>(`${environment.api}/login`, user)
      );
      if (resposta && resposta.accessToken) {
        this.token = resposta.accessToken;
      }
      return true;
    }catch (error) {
      console.log(error);
      return false;
    }
  }

  public setToken(token: string) {
    this.token = token;
  }

  public getToken() {
    return this.token;
  }

  public isLogged(){
    const token = this.getToken();
    return !!token;
  }
}
```

**Explicação:**
- `@Injectable({ providedIn: 'root' })`: Serviço singleton injetável em toda a aplicação
- `private logged`: Flag que rastreia se está autenticado (pode ser substituído por verificação de token)
- `private token`: Armazena o token em memória
- `private url`: Url base da API do environment
- `private http`: Injeta HttpClient para requisições HTTP
- `login()`: Faz POST para `/login`, recebe accessToken, armazena em memória e localStorage
- `firstValueFrom()`: Converte Observable para Promise (await-compatible)
- `logout()`: Limpa token da memória e do localStorage
- `getToken()`: Retorna token de memória ou localStorage (persistência entre abas)
- `isLogged()`: Verifica se há token válido (boolean para guards)

---

### Passo 19: Criar Guarda de Autenticação

Comando para gerar:

```bash
ng g guard guards/auth --skip-tests
```

**Ao executar**, o Angular CLI **perguntará qual tipo de guard** você deseja criar. Selecione `CanActivate`:

```
? Which interfaces would you like to implement? (Press <space> to select, <Enter> to submit)
❯◉ CanActivate
 ◯ CanActivateFn
 ◯ CanDeactivate
 ◯ CanDeactivateFn
 ◯ CanMatch
 ◯ CanMatchFn
```

**Por quê `CanActivate`?**
- **CanActivate**: Protege a rota de ser ACESSADA (ideal para login e autenticação)
- **CanDeactivate**: Protege para não SAIR de uma rota sem confirmação (ex: formulário não salvo)
- **CanMatch**: Determina se a rota existe ou não baseado em condições
- **CanLoad**: Protege lazy loading (carregamento sob demanda de módulos)
- **Fn** (function): Versões funcionais (novo padrão em versões muito atualizadas do Angular)

**Nota para Angular versões mais atualizadas (22+):**
Caso o Angular esteja em versão muito nova e gere um guard em forma de função, use a flag `--no-functional` para forçar a geração como classe:
```bash
ng g guard guards/auth --no-functional --skip-tests
```

**Arquivo:** `src/app/guards/auth.guard.ts`

```typescript
import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router = inject(Router);
  private userService = inject(UserService);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): MaybeAsync<GuardResult> {

    if (this.userService.isLogged()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
```

**Explicação:**
- `implements CanActivate`: Implementa a interface de guarda de rota
- `canActivate()`: Método chamado antes de ativar uma rota
- `isLogged()`: Se verdadeiro, permite acesso; se falso, redireciona para login
- `this.router.navigate(['/login'])`: Redireciona para página de login
- `return true/false`: Controla se a rota pode ser ativada

---

### Passo 20: Criar Componente de Login

Comando para gerar:

```bash
ng g c pages/login --skip-tests
```

**Arquivo:** `src/app/pages/login/login.ts`

```typescript
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private userService = inject(UserService);
  private router = inject(Router);

  async login(loginForm: NgForm) {
    if (loginForm.valid) {
      const user = {
        email: loginForm.value.email,
        password: loginForm.value.password,
      };

      try {
        const resposta = await this.userService.login(user);

        if (resposta) {
          console.log('Login realizado com sucesso');
          this.router.navigate(['/vendas']);
        }else{
          alert("Email ou senha inválidos!")
        }

      } catch (err) {
        console.log(err);
        alert('Ocorreu um erro inesperado');
      }
    }
  }
}
```

**Explicação:**
- `standalone: true`: Componente standalone (sem NgModule)
- `imports: [FormsModule]`: Permite uso de `ngForm` e `ngModel` no template
- `async login()`: Método assíncrono que processa o login
- `loginForm.valid`: Verifica se o formulário está válido antes de enviar
- `await this.userService.login()`: Aguarda a resposta do servidor
- `this.router.navigate(['/vendas'])`: Redireciona para listagem após sucesso
- `try/catch`: Captura erros de autenticação

**Arquivo:** `src/app/pages/login/login.html`

```html
<div class="login-container">
    <h2>Acesso ao Sistema</h2>

    <form #loginForm="ngForm" (ngSubmit)="login(loginForm)">
        
        <div class="form-group">
            <label for="email">E-mail</label>
            <input
                type="email"
                id="email"
                name="email"
                ngModel
                required
                email
                placeholder="Digite seu e-mail"
            />
            
            @if (loginForm.controls['email']?.invalid && loginForm.controls['email']?.touched) {
                <small class="error-text">Por favor, insira um e-mail válido.</small>
            }
        </div>

        <div class="form-group">
            <label for="password">Senha</label>
            <input
                type="password"
                id="password"
                name="password"
                ngModel
                required
                minlength="3"
                placeholder="Digite sua senha"
            />
            
            @if (loginForm.controls['password']?.invalid && loginForm.controls['password']?.touched) {
                <small class="error-text">A senha deve ter no mínimo 3 caracteres.</small>
            }
        </div>

        <button type="submit" [disabled]="loginForm.invalid">Entrar</button>
    </form>
</div>
```

**Explicação:**
- `#loginForm="ngForm"`: Cria referência ao formulário
- `(ngSubmit)="login(loginForm)"`: Chama método login ao enviar
- `ngModel`: Two-way binding dos campos com a classe
- `required`: Valida que o campo não está vazio
- `email`: Valida formato de email
- `minlength="3"`: Valida comprimento mínimo
- `@if`: Control flow do Angular (mostra erro se campo inválido e touched)
- `[disabled]="loginForm.invalid"`: Desabilita botão se formulário inválido

**Arquivo:** `src/app/pages/login/login.scss` (deixar vazio ou adicionar estilos)

```scss
// Estilos específicos do login (opcional)

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button:hover:not(:disabled) {
  background-color: #2563eb;
}

button:disabled {
  background-color: #cbd5e1;
  cursor: not-allowed;
}

.error-text {
  display: block;
  color: #dc2626;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}
```

---

### Passo 21: Atualizar Rotas com Autenticação

Edite `src/app/app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
  },
  {
    path: 'vendas',
    loadComponent: () => import('./pages/venda-list/venda-list').then(m => m.VendaList),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
```

**Explicação:**
- Rota `/login`: Carrega o componente Login (sem guard, acessível para não-autenticados)
- Rota `/vendas`: Carrega VendaList COM `canActivate: [AuthGuard]` (protegida)
- Rota `/`: Redireciona para `/login` (primeiro acesso vai para login)
- `pathMatch: 'full'`: Match exato para evitar conflitos

---

### Passo 22: Adicionar Interceptor de Autenticação (Opcional)

Se desejar adicionar o Bearer token automaticamente em todas as requisições:

Comando para gerar:

```bash
ng g interceptor interceptors/auth --skip-tests
```

**Arquivo:** `src/app/interceptors/auth.interceptor.ts`

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.getToken();

  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedRequest);
  }

  return next(req);
};
```

**Explicação:**
- `HttpInterceptorFn`: Função interceptora de HTTP (novo padrão no Angular)
- `inject(UserService)`: Injeta o serviço para acessar token
- `req.clone()`: Cria cópia da requisição sem modificar original
- `setHeaders`: Adiciona header Authorization com Bearer token
- Interceptor executa em TODA requisição HTTP automaticamente

Se usar o interceptor, atualize `app.config.ts`:

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
  ],
};
```

---

### Passo 23: Testar o Fluxo de Login

1. **Inicie json-server** (Terminal 1):
   ```bash
   npx json-server src/vendas.json -m ./node_modules/json-server-auth
   ```

2. **Inicie Angular** (Terminal 2):
   ```bash
   ng serve
   ```

3. **Acesse a aplicação:**
- Abra `http://localhost:4200`
- Será redirecionado automaticamente para `/login`

4. **Use as credenciais do arquivo vendas.json:**
- **E-mail:** olivier@mail.com
- **Senha:** 123456 (ou a senha usada ao criar o usuário)

5. **Após login bem-sucedido:**
- Será redirecionado para `/vendas`
- O token estará armazenado em localStorage
- Atualizar a página mantém você autenticado
- Fazer logout apaga o token (será necessário fazer login novamente)

---

### Fluxo de Autenticação Resumido

1. Usuário acessa `http://localhost:4200`
2. App redireciona para `/login` (rota padrão)
3. Usuário preenche email e senha
4. Component Login chama `UserService.login()`
5. UserService faz POST para `http://localhost:3000/login`
6. json-server-auth valida e retorna `accessToken`
7. Token é salvo em localStorage
8. Component redireciona para `/vendas`
9. AuthGuard valida se está autenticado
10. VendaList é exibida
11. Requisições para API incluem header `Authorization: Bearer {token}`

---

## Seção 3: Passo a Passo - Implementando HTTP Interceptors

O Interceptor é um middleware HTTP que intercepta TODAS as requisições e respostas. É perfeito para:
- Adicionar headers (como Authorization com token)
- Tratar erros globalmente
- Logs de requisições
- Transformar dados

No Angular 21, interceptors são funções (`HttpInterceptorFn`) registradas em `app.config.ts`.

---

### Passo 24: Entender HTTP Interceptors

**O que é um Interceptor?**

Um interceptor é uma função que:
1. **Intercepta requisições**: Antes de enviar ao servidor, pode modificar headers, body, etc.
2. **Continua a requisição**: Passa a requisição para o próximo handler com `next()`
3. **Intercepta respostas**: Pode processar a resposta antes de retornar ao componente
4. **Trata erros**: Pode capturar e tratar erros HTTP globalmente

**Fluxo:**
```
Componente (HttpClient.get/post/put/delete)
    ↓
Interceptor (modifica requisição)
    ↓
Servidor (recebe com modificações)
    ↓
Interceptor (processa resposta)
    ↓
Componente (recebe resposta processada)
```

---

### Passo 25: Criar o Interceptor de Autenticação

Comando para gerar:

```bash
ng g interceptor interceptors/auth --skip-tests
```

**Arquivo:** `src/app/interceptors/auth.interceptor.ts`

```typescript
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const token = userService.getToken();

  if (token) {
    const novaRequisicao = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
    return next(novaRequisicao);
  }

  return next(req);
};
```

**Explicação:**
- `HttpInterceptorFn`: Tipo de função interceptora
- `(req, next) => {}`: Recebe requisição e função para passar adiante
- `inject(UserService)`: Injeta serviço para acessar token
- `userService.getToken()`: Obtém token do localStorage/memória
- `req.clone()`: Cria cópia da requisição (imutabilidade)
- `req.headers.set()`: Adiciona/modifica header Authorization
- `Bearer ${token}`: Formato padrão OAuth 2.0
- `if (token)`: Só adiciona header se houver token
- `next(novaRequisicao)`: Passa requisição modificada adiante
- Retorna Observable que pode ser processado

---

### Passo 26: Registrar Interceptor em app.config.ts

Edite `src/app/app.config.ts`:

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
  ],
};
```

**Explicação:**
- `import { authInterceptor }`: Importa a função interceptora
- `withInterceptors([authInterceptor])`: Registra interceptor em um array
- Pode haver múltiplos interceptors: `withInterceptors([interceptor1, interceptor2])`
- Interceptors executam na ordem do array
- `provideHttpClient()`: Configura o cliente HTTP com interceptors

---

### Passo 27: Verificar que UserService tem getToken()

Confirme que `src/app/services/user.service.ts` possui o método `getToken()`:

```typescript
public getToken(): string | null {
  return this.token || localStorage.getItem('token');
}
```

**Se não tiver**, adicione este método à classe UserService.

---

### Passo 28: Testar o Interceptor

1. **Inicie json-server** (Terminal 1):
   ```bash
   npx json-server src/vendas.json -m ./node_modules/json-server-auth
   ```

2. **Inicie Angular** (Terminal 2):
   ```bash
   ng serve
   ```

3. **Abra o DevTools do Navegador:**
- Pressione `F12` ou `Ctrl+Shift+I`
- Vá para a aba **Network**

4. **Faça login:**
- Acesse `http://localhost:4200`
- Login com olivier@mail.com / 123456
- Navegue para `/vendas`

5. **Verifique o Interceptor:**
- Na aba Network, clique em uma requisição GET ou POST para `/vendas` (ou qualquer rota protegida)
- Vá para a aba **Headers**
- Procure por **Request Headers**
- Deve aparecer: `Authorization: Bearer eyJhbGc...` (seu token)

6. **Experimente sem token:**
- Abra Developer Tools → Console
- Digite: `localStorage.removeItem('token')`
- Atualiza a página: será redirecionado para `/login`
- Faça login novamente: o token reaparece

---

### Passo 29: Interceptor com Tratamento de Erros (Avançado)

Se desejar um interceptor mais robusto que trata erros globalmente:

**Arquivo:** `src/app/interceptors/auth.interceptor.ts` (versão melhorada)

```typescript
import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const token = userService.getToken();

  // Adiciona token à requisição
  if (token) {
    req = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }

  // Processa resposta e erros
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se erro 401 (Unauthorized), faz logout
      if (error.status === 401) {
        console.error('Token inválido ou expirado');
        userService.logout();
        router.navigate(['/login']);
      }

      // Se erro 403 (Forbidden), acesso negado
      if (error.status === 403) {
        console.error('Acesso negado');
      }

      // Se erro de rede
      if (error.status === 0) {
        console.error('Erro de conexão com o servidor');
      }

      // Propaga o erro para o componente tratar se necessário
      return throwError(() => error);
    })
  );
};
```

**Explicação:**
- `req = req.clone()`: Modifica a requisição (assignment direto)
- `.pipe()`: Aplica operadores RxJS à resposta
- `catchError()`: Captura erros HTTP
- `error.status === 401`: Unauthorized (token inválido/expirado)
- `error.status === 403`: Forbidden (sem permissão)
- `error.status === 0`: Erro de rede (servidor desligado)
- `userService.logout()`: Limpa token do localStorage
- `router.navigate(['/login'])`: Redireciona para login automaticamente
- `throwError()`: Re-lança o erro para componente processar se quiser

**Atualizar app.config.ts:**

```typescript
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor])
    ),
  ],
};
```

---

### Benefícios do Interceptor

| Benefício | Descrição |
|-----------|-----------|
| **Centralizado** | Não precisa adicionar token em cada `http.get()` |
| **Automático** | Token é adicionado automaticamente a TODAS as requisições |
| **Consistente** | Mesmo comportamento em toda a aplicação |
| **Manutenção** | Mudar lógica em um único lugar |
| **Tratamento de Erros** | 401/403 tratados globalmente |
| **Logs** | Registra todas as requisições em um lugar |

---

### Comparação: Com vs Sem Interceptor

**SEM Interceptor (ruim):**
```typescript
// Em cada serviço, em cada método
this.http.get(url, {
  headers: new HttpHeaders({
    'Authorization': `Bearer ${token}`
  })
});
```
Repetitivo, propenso a erros, difícil de manter.

**COM Interceptor (bom):**
```typescript
// Simples em qualquer lugar
this.http.get(url);
```
Automático, centralizado, fácil de manter.

---

### Estrutura Final do Projeto

```
primeng/
├── src/
│   ├── app/
│   │   ├── componentes/
│   │   │   └── menu/
│   │   │       ├── menu.ts
│   │   │       ├── menu.html
│   │   │       └── menu.scss
│   │   ├── pages/
│   │   │   └── venda-list/
│   │   │       ├── venda-list.ts
│   │   │       ├── venda-list.html
│   │   │       └── venda-list.scss
│   │   ├── services/
│   │   │   └── venda.service.ts
│   │   ├── modelos/
│   │   │   ├── venda.model.ts
│   │   │   └── item-venda.model.ts
│   │   ├── app.ts
│   │   ├── app.html
│   │   ├── app.scss
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   ├── main.ts
│   │   ├── index.html
│   │   ├── styles.scss
│   │   ├── vendas.json
│   │   └── app.spec.ts (pode ignorar)
│   ├── environments/
│   │   ├── environment.development.ts
│   │   └── environment.ts
├── .postcssrc.json
├── package.json
├── angular.json
├── tsconfig.json
└── README.md
```

---


**Última atualização:** 8 de maio de 2026
**Versão:** Angular 21.2.0 | PrimeNG 21.1.6 | TailwindCSS 4.2.4
