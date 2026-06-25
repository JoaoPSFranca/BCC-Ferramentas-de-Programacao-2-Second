import { OsService } from '../../services/os.service';
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-so-list',
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    TableModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule,
    DatePipe,
  ],
  templateUrl: './so-list.page.html',
  styleUrl: './so-list.page.scss',
})
export class SoListPage {
  protected osService = inject(OsService);
  private router = inject(Router);

  ngOnInit() {
    this.osService.getOrders();
  }

  protected openForm() {
    this.router.navigate(['/os-form']);
  }

  protected inspecionar(osSelecionada: any) {
    this.router.navigate(['/os-form'], { state: osSelecionada });
  }

  protected save(os: any) {
    this.osService.updateStatus(os.id, 'COMPLETED').subscribe(() => {
      this.osService.getOrders();
    });
  }
}
