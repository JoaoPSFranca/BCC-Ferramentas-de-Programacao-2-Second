# Guia Completo: Criando um Projeto Angular do Zero

## Apêndice: Comandos Rápidos

```bash
# Instalação da CLI Angular
npm install -g @angular/cli

# Criar novo projeto
ng new <nome-projeto> --skip-tests --skip-git

# Criar componente
ng g c componentes/<nome-componente> --skip-tests

# Criar environments
ng g environments

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

# Em uma Linha:
npm install primeng && npm install @primeng/themes @primeuix/themes && npm install primeicons && npm install @tailwindcss/postcss tailwindcss tailwindcss-primeui

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

**Última atualização:** 8 de maio de 2026
**Versão:** Angular 21.2.0 | PrimeNG 21.1.6 | TailwindCSS 4.2.4
