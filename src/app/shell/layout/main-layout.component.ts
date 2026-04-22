import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <a class="skip-link" href="#main-content">Saltar al contenido</a>
    <header class="app-header" role="banner">
      <div class="app-header__inner">
        <a routerLink="/cotizaciones" class="app-brand">Cotizaciones</a>
        <nav class="app-nav" aria-label="Principal">
          <a
            routerLink="/cotizaciones"
            routerLinkActive="is-active"
            [routerLinkActiveOptions]="{ exact: true }"
            >Inicio</a
          >
        </nav>
      </div>
    </header>
    <main id="main-content" class="app-main" tabindex="-1">
      <router-outlet />
    </main>
  `,
  styles: `
    :host {
      display: flex;
      min-height: 100vh;
      flex-direction: column;
    }
    .skip-link {
      position: absolute;
      left: -999px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    .skip-link:focus {
      position: fixed;
      left: 0.75rem;
      top: 0.75rem;
      width: auto;
      height: auto;
      z-index: 1000;
      padding: 0.5rem 0.75rem;
      background: #0f172a;
      color: #f8fafc;
      border-radius: 0.375rem;
      outline: 2px solid #38bdf8;
      outline-offset: 2px;
    }
    .app-header {
      border-bottom: 1px solid #e2e8f0;
      background: #ffffff;
    }
    .app-header__inner {
      max-width: 960px;
      margin: 0 auto;
      padding: 0.75rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }
    .app-brand {
      font-weight: 600;
      color: #0f172a;
      text-decoration: none;
    }
    .app-brand:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
      border-radius: 0.25rem;
    }
    .app-nav {
      display: flex;
      gap: 0.75rem;
    }
    .app-nav a {
      color: #334155;
      text-decoration: none;
      padding: 0.35rem 0.5rem;
      border-radius: 0.25rem;
    }
    .app-nav a:focus-visible {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
    .app-nav a.is-active {
      color: #1d4ed8;
      font-weight: 600;
      background: #eff6ff;
    }
    .app-main {
      flex: 1;
      max-width: 960px;
      width: 100%;
      margin: 0 auto;
      padding: 1.25rem 1rem 2rem;
    }
  `
})
export class MainLayoutComponent {}
