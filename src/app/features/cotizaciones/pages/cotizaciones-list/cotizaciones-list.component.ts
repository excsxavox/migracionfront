import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';

import { CotizacionVm } from '../../../../core/models/cotizacion.vm';
import { COTIZACIONES_PORT } from '../../../../core/ports/cotizaciones.port';

@Component({
  selector: 'app-cotizaciones-list',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './cotizaciones-list.component.html',
  styleUrl: './cotizaciones-list.component.css'
})
export class CotizacionesListComponent implements OnInit {
  private readonly cotizaciones = inject(COTIZACIONES_PORT);

  readonly loading = signal(true);
  readonly errorMessage = signal<string | null>(null);
  readonly items = signal<CotizacionVm[]>([]);

  ngOnInit(): void {
    this.load();
  }

  retry(): void {
    this.load();
  }

  private load(): void {
    this.loading.set(true);
    this.errorMessage.set(null);
    this.cotizaciones.listar().subscribe({
      next: (list) => {
        this.items.set(list);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        const message = err instanceof Error ? err.message : 'Error desconocido.';
        this.errorMessage.set(message);
        this.loading.set(false);
      }
    });
  }
}
