import { HttpErrorResponse } from '@angular/common/http';

import { mapHttpErrorToMessage } from './http-error.mapper';

describe('mapHttpErrorToMessage', () => {
  it('returns friendly message for HTML error body', () => {
    const html = '<!DOCTYPE html><html><body>Error 500</body></html>';
    const err = new HttpErrorResponse({ status: 500, error: html });
    expect(mapHttpErrorToMessage(err)).toContain('página de error');
    expect(mapHttpErrorToMessage(err)).not.toContain('<html');
  });

  it('strips simple tags from fragment and keeps text', () => {
    const err = new HttpErrorResponse({
      status: 400,
      error: '<div>Cliente no válido</div>'
    });
    expect(mapHttpErrorToMessage(err)).toContain('Cliente no válido');
    expect(mapHttpErrorToMessage(err)).not.toContain('<div>');
  });

  it('handles status 0', () => {
    const err = new HttpErrorResponse({ status: 0, error: null });
    expect(mapHttpErrorToMessage(err)).toContain('conectar');
  });
});
