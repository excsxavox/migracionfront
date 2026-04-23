/**
 * Verificación estática de artefactos **#4** no cubiertos por Karma (HTML/CSS en disco).
 *
 * Trazabilidad: openspec/changes/migracion-react-a-angular/specs/frontend-shell/spec.md
 * — Requirement: Documento HTML y estilos globales (**#4**)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function read(rel) {
  return fs.readFileSync(path.join(root, rel), 'utf-8');
}

let failed = false;

function assert(cond, msg) {
  if (!cond) {
    console.error(`FAIL: ${msg}`);
    failed = true;
  }
}

const html = read('src/index.html');
assert(/<html[^>]*lang="es-MX"/.test(html), 'index.html SHALL declare html lang="es-MX"');
assert(html.includes('<app-root>'), 'index.html SHALL contain <app-root>');
assert(html.includes('<base href="/">'), 'index.html SHALL set base href="/"');

const css = read('src/styles.css');
assert(css.includes('--app-color-primary'), 'styles.css SHALL define --app-color-primary');
assert(css.includes('--app-font-sans'), 'styles.css SHALL define --app-font-sans');
assert(css.includes(':focus-visible'), 'styles.css SHOULD define :focus-visible for keyboard users');

assert(fs.existsSync(path.join(root, 'public')), 'public/ directory SHALL exist for angular assets');

if (failed) {
  process.exit(1);
}
console.log('verify-bootstrap: OK (#4 static HTML/CSS/public)');
