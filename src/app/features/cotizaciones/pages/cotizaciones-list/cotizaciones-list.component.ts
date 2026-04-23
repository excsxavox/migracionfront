import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';

import { CotizacionVm } from '../../../../core/models/cotizacion.vm';
import { COTIZACIONES_PORT } from '../../../../core/ports/cotizaciones.port';
import { mapHttpErrorToMessage } from '../../../../infrastructure/http/http-error.mapper';

@Component({
  selector: 'app-cotizaciones-list',
  standalone: true,
  imports: [],
  templateUrl: './cotizaciones-list.component.html',
  styleUrl: './cotizaciones-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
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
        this.errorMessage.set(mapHttpErrorToMessage(err));
        this.loading.set(false);
      }
    });
  }
}
