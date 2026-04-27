import { Component, OnInit } from '@angular/core';
import { Menubar, MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { InputText } from 'primeng/inputtext';
import { Avatar } from 'primeng/avatar';

@Component({
  selector: 'app-menu',
  imports: [Menubar, InputText, Avatar],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu implements OnInit {
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Vendas',
        icon: 'pi pi-shop',
        routerLink: '/vendas',
      }
    ];
  }
}
